import React from "react";
import { StyleSheet, View } from "react-native";
import TabNavigator from "./routes/tabNavigation";

export default function App() {
  return <TabNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
