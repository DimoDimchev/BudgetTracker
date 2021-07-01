import React from "react";
import { Text, View, FlatList } from "react-native";
import globalStyles from "../styles/global";
import SpendingCard from "../components/spending";

export default function DetailsScreen({ route }) {
  const { name, allAmounts } = route.params;
  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>
          All spendings in the {name} category for this month
        </Text>
        <Text style={globalStyles.paragraph}>
          Review all of your spendings in this category for this month
        </Text>
      </View>
      <View style={globalStyles.body}>
        <FlatList
          data={allAmounts}
          renderItem={({ item, index }) => (
            <SpendingCard item={item} index={index} />
          )}
        />
      </View>
    </View>
  );
}
