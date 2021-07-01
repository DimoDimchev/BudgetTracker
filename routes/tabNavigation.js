import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/homeScreen";
import HistoryScreen from "../screens/historyScreen";
import addSpendingScreen from "../screens/addSpendingScreen";

const Tab = createBottomTabNavigator();

// create tab navigation and customize the options(change colors and add icons)
export default function TabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            // add an icon based on the route
            if (route.name === "Home") {
              return (
                <Ionicons
                  name={focused ? "home" : "home-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "History") {
              return (
                <Ionicons
                  name={focused ? "calendar" : "calendar-outline"}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === "New Spending") {
              return (
                <Ionicons
                  name={focused ? "add" : "add-outline"}
                  size={size}
                  color={color}
                />
              );
            }
          },
        })}
        // customize icon color
        tabBarOptions={{
          activeTintColor: "#145ac4",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="New Spending" component={addSpendingScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
