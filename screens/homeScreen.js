import React, { useState } from 'react';
import { Text, SectionList, ScrollView, View, RefreshControl } from 'react-native';
import globalStyles from '../styles/global';

// base URI for the API
const baseURI = 'https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/';

// create screen to keep track of the current month's spendings
export default function HomeScreen() {
  // date needed to send API requests for each month
  let currentMonth = new Date();
  currentMonth = currentMonth.getMonth().toString();

  const [refreshing, setRefreshing] = useState(false);
  const [totalSpendings, setTotalSpendings] = useState(getTotalSpendings);
  const [totalCategories, setTotalCategories] = useState(getCategories);

  // function to find the sum of all elements in an array
  const add = function (arr) {
    return arr.reduce((a, b) => a + b);
  };

  // function to get the total amount of spendings from this month
  const getTotalSpendings = () => {
    setRefreshing(true);
    fetch(baseURI + currentMonth + '/spendings.json')
      .then(res => res.json())
      .then(data => {
        if (data !== null) {
          let spendingsAmount = Object.keys(data).map(key => {
            return Number(data[key]["amount"])
          });
          setTotalSpendings(add(spendingsAmount));
          getCategories();
        } else {
          setTotalSpendings(0);
        }
        setRefreshing(false);
      })
      .catch((err) => {
        console.log(err);
        setTotalSpendings(0);
        setRefreshing(false);
      });
  };

  // function to get all of the categories for this month
  const getCategories = () => {
    fetch(baseURI + currentMonth + '/categories.json')
      .then(res => res.json())
      .then(data => {
        if (data !== null) {
          let finalCategories = [];
          let allCategories = Object.keys(data).map(key => {
            return {
              name: key,
              amounts: data[key]
            }
          });
          allCategories.forEach(key => {
            let currentCategory = {
              name: key["name"],
              totalAmountSpent: add(Object.keys(key["amounts"]).map(item => {
                return Number(key["amounts"][item]);
              }))
            }
            finalCategories.push(currentCategory);
          }); 
          setTotalCategories(finalCategories);
        }
      });
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Welcome to your favorite budget tracker!</Text>
        <Text style={globalStyles.paragraph}>This is the home screen. Here you can see information about the current month.</Text>
      </View>
      <ScrollView>
        <RefreshControl
          refreshing={refreshing}
          onRefresh={getTotalSpendings}
        />
        <Text style={globalStyles.subtitle}>Total spendings this month: {totalSpendings}</Text>
        <Text style={globalStyles.subtitle}>Spendings by category:</Text>
      </ScrollView>
    </View>
  );
}