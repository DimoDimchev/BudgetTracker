import React, { useState, useEffect } from "react";
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import globalStyles from "../styles/global";

// import general functions needed for this screen
import add from "../generalFunctions/addArray";
import generateKey from "../generalFunctions/generateKey";
import assignColor from "../generalFunctions/assignColor";

// base URI for the API
const baseURI =
  "https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/";

// date needed to send API requests for each month
let currentMonth = new Date();
currentMonth = currentMonth.getMonth().toString();

// create screen to keep track of the current month's spendings
export default function HomeScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [totalSpendings, setTotalSpendings] = useState(undefined);
  const [totalCategories, setTotalCategories] = useState(undefined);

  useEffect(() => {
    getTotalSpendings();
    getCategories();
  }, []);

  // function to get the total amount of spendings from this month
  const getTotalSpendings = async () => {
    const response = await fetch(baseURI + currentMonth + "/spendings.json");
    const json = await response.json();
    if (json !== null) {
      let spendingsAmount = Object.keys(json).map((key) => {
        return Number(json[key]["amount"]);
      });
      setTotalSpendings(add(spendingsAmount));
    } else {
      setTotalSpendings(0);
    }
  };

  // function to get all of the categories for this month
  const getCategories = async () => {
    const response = await fetch(baseURI + currentMonth + "/categories.json");
    const json = await response.json();
    if (json !== null) {
      let finalCategories = [];
      let allCategories = Object.keys(json).map((key) => {
        return {
          name: key,
          amounts: json[key],
        };
      });
      allCategories.forEach((key) => {
        let currentCategory = {
          name: key["name"],
          key: generateKey(key["name"]),
          allAmounts: key["amounts"],
          totalAmountSpent:
            Math.round(
              (add(
                Object.keys(key["amounts"]).map((item) => {
                  return Number(key["amounts"][item]["amount"]);
                })
              ) /
                totalSpendings) *
                100
            ) + "% of total",
        };
        finalCategories.push(currentCategory);
      });
      setTotalCategories(finalCategories);
    }
  };

  async function onRefresh() {
    setRefreshing(true);
    await getTotalSpendings();
    await getCategories();
    setRefreshing(false);
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>
          Welcome to your favorite budget tracker!
        </Text>
        <Text style={globalStyles.paragraph}>
          This is the home screen. Here you can see information about the
          current month.
        </Text>
      </View>

      <View style={globalStyles.body}>
        <Text style={globalStyles.subtitle}>
          Total spendings this month: {totalSpendings}
        </Text>
        <Text style={globalStyles.subtitle}>Spendings by category:</Text>
        <FlatList
          onRefresh={onRefresh}
          refreshing={refreshing}
          data={totalCategories}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Details", {
                  name: item.name,
                  allAmounts: item.allAmounts,
                  totalAmountSpent: item.totalAmountSpent,
                })
              }
            >
              <View
                style={[
                  styles.categoryCard,
                  { backgroundColor: assignColor(index) },
                ]}
              >
                <Text style={styles.categoryTitle}>{item.name}</Text>
                <Text style={styles.categoryShare}>
                  {item.totalAmountSpent}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
  },
  categoryTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  categoryShare: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
