import React, { useState } from 'react';
import { Text, FlatList, View, StyleSheet } from 'react-native';
import globalStyles from '../styles/global';

// base URI for the API
const baseURI = 'https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/';

// date needed to send API requests for each month
let currentMonth = new Date();
currentMonth = currentMonth.getMonth().toString();

// function to find the sum of all elements in an array
const add = (arr) => {
  return arr.reduce((a, b) => a + b);
};

// function to generate a key for each category
const generateKey = (category) => {
  let key = '';
  for (let i = 0; i < category.length; i++) {
    key += category.charCodeAt(i);
  }
  return key
}

// function to assign a background color for each category based on its index
const assignColor = (categoryIndex) => {
  if (categoryIndex % 2 === 0) {
    return '#F4AFB4'
  } return '#CAE5FF'
}

// create screen to keep track of the current month's spendings
export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [totalSpendings, setTotalSpendings] = useState(getTotalSpendings);
  const [totalCategories, setTotalCategories] = useState(getCategories);

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
              key: generateKey(key["name"]),
              totalAmountSpent: Math.round(((add(Object.keys(key["amounts"]).map(item => {
                return Number(key["amounts"][item]);
              }))) / totalSpendings) * 100) + '% of total'
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

      <View style={globalStyles.body}>
        <Text style={globalStyles.subtitle}>Total spendings this month: {totalSpendings}</Text>
        <Text style={globalStyles.subtitle}>Spendings by category:</Text>
        <FlatList
          refreshing={refreshing}
          onRefresh={getTotalSpendings}
          data={totalCategories}
          renderItem={({ item, index }) => (
            <View style={[styles.categoryCard, {backgroundColor: assignColor(index)}]}>
              <Text style={styles.categoryTitle}>{item.name}</Text>
              <Text style={styles.categoryShare}>{item.totalAmountSpent}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    borderRadius: 10,
  },
  categoryTitle: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  categoryShare: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 20,
  },
});