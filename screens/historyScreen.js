import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from "react-native";
import globalStyles from "../styles/global";
import add from "../generalFunctions/addArray";
import MonthCard from "../components/month";
import generateKey from "../generalFunctions/generateKey";

// base URI for the API
const baseURI =
  "https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/";

// date needed to send API requests for each month
let currentMonth = new Date();
currentMonth = currentMonth.getMonth().toString();

// create screen where users can see their spendings from past months
export default function HistoryScreen() {
  const [prevMonths, setPrevMonths] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getTotalSpendings();
    console.log("Effect");
  }, [prevMonths.length]);

  const getAllMonths = async () => {
    const response = await fetch(baseURI + ".json");
    const json = await response.json();
    if (json !== null) {
      const allMonths = Object.keys(json).map((key) => {
        if (key !== currentMonth) {
          return key;
        }
      });
      if (allMonths.length > 0) {
        return allMonths;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };

  // function to get the total amount of spendings from each month
  const getTotalSpendings = async () => {
    const allMonths = await getAllMonths();
    if (allMonths !== undefined) {
      let total = 0;

      allMonths.forEach(async (month) => {
        const response = await fetch(baseURI + month + "/spendings.json");
        const json = await response.json();
        if (json !== null) {
          let spendingsAmount = Object.keys(json).map((key) => {
            return Number(json[key]["amount"]);
          });
          total = add(spendingsAmount);
        } else {
          total = 0;
        }

        setPrevMonths((previous) => {
          let present = false;
          for (let key of prevMonths) {
            if (month === key["month"]) {
              present = true;
            }
          }
          if (present !== true) {
            return [
              { month: month, total: total, key: generateKey(month) },
              ...previous,
            ];
          } else {
            return [...previous];
          }
        });
      });
    } else {
      setPrevMonths(undefined);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await getTotalSpendings();
    setRefreshing(false);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>This is the history screen!</Text>
        <Text style={globalStyles.paragraph}>
          See information about previous months on this screen
        </Text>
      </View>
      <View style={globalStyles.body}>
        {prevMonths !== undefined ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={prevMonths}
            renderItem={({ item, index }) => (
              <MonthCard item={item} index={index} />
            )}
          />
        ) : (
          <Text>"Nothing to show here"</Text>
        )}
      </View>
    </View>
  );
}
