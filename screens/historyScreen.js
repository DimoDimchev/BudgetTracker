import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import globalStyles from "../styles/global";

// base URI for the API
const baseURI =
  "https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/";

// create screen where users can see their spendings from past months
export default function HistoryScreen() {
  const [months, setMonths] = useState(undefined);

  const getAllMonths = async () => {
    const response = await fetch(baseURI + ".json");
    const json = await response.json();
    const allMonths = Object.keys(json).map((key) => {
      return {
        key: key,
      };
    });
    console.log(allMonths);
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>This is the history screen!</Text>
        <Text style={globalStyles.paragraph}>
          See information about previous months on this screen
        </Text>
        <Button title={"blah"} onPress={getAllMonths} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
