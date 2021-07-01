import React from "react";
import { Text, View } from "react-native";
import globalStyles from "../styles/global";

export default function DetailsScreen({ route }) {
  const { name, allAmounts, totalAmountSpent } = route.params;
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}
