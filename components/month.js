import React from "react";
import { Text, View, StyleSheet } from "react-native";

import assignColor from "../generalFunctions/assignColor";

// convert number to month
const monthConvert = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December",
};

export default function MonthCard({ item, index }) {
  return (
    <View style={[styles.monthCard, { backgroundColor: assignColor(index) }]}>
      <Text style={styles.monthTitle}>{monthConvert[item.month]}</Text>
      <Text style={styles.monthAmount}>{item.total} BGN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  monthCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
  },
  monthTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  monthAmount: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
