import React from "react";
import { Text, View, StyleSheet } from "react-native";

import assignColor from "../generalFunctions/assignColor";

export default function SpendingCard({ item, index }) {
  return (
    <View
      style={[styles.spendingCard, { backgroundColor: assignColor(index) }]}
    >
      <Text style={styles.spendingTitle}>{item.title}</Text>
      <Text style={styles.spendingAmount}>{item.amount} BGN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  spendingCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    borderRadius: 10,
  },
  spendingTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  spendingAmount: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});
