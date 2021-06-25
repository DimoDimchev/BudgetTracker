import React, { useState } from 'react';
import { Text, FlatList, View } from 'react-native';
import globalStyles from '../styles/global';

// base URI for the API
const baseURI = 'https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/';

// create screen to keep track of the current month's spendings
export default function HomeScreen() {
  let currentMonth = new Date();
  currentMonth = currentMonth.getMonth().toString();

  // function to find the sum of all elements in an array
  const add = function (arr) {
    return arr.reduce((a, b) => a + b);
  };

  // function to get the total amount of spendings from this month
  const getTotalSpendings = () => {
    fetch(baseURI + currentMonth + '/spendings.json')
      .then(res => res.json())
      .then(data => {
        if (data !== null) {
          let spendingsAmount = Object.keys(data).map(key => {
            return Number(data[key]["amount"])
          })
          setTotalSpendings(add(spendingsAmount));
        } else {
          setTotalSpendings(0);
        }
      })
      .catch((err) => {
        console.log(err);
        setTotalSpendings(0);
      });
  };

  // function to get all of the categories for this month
  const getCategories = () => {

  };

  const [totalSpendings, setTotalSpendings] = useState(getTotalSpendings);
  // const [allCategories, setAllCategories] = useState(getCategories);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Welcome to your favorite budget tracker!</Text>
        <Text style={globalStyles.paragraph}>This is the home screen. Here you can see information about the current month.</Text>
      </View>
      <View>
        <Text style={globalStyles.subtitle}>Total spendings this month: {totalSpendings}</Text>
        <Text style={globalStyles.subtitle}>Spendings by category:</Text>
        {/* TODO: add code to display all of the categories for this month */}
      </View>
    </View>
  );
}