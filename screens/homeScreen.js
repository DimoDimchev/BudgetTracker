import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Button, Text, FlatList, View } from 'react-native';

// base URI for the API
const baseURI = 'https://react-native-budget-tracker-default-rtdb.europe-west1.firebasedatabase.app/';

// create screen to keep track of the current month's spendings
export default function HomeScreen() {
  let currentMonth = new Date();
  currentMonth = currentMonth.getMonth().toString();

  // function to get the total amount of spendings from this month
  const getTotalSpendings = () => {
    fetch(baseURI + currentMonth + '.json')
      .then(res => res.json())
      .then(data => {
        let month = Object.keys(data).map(key => {
          return { key: key, total: data[key]["total"] }
        });
        if (month[0].total >= 0) {
          setTotalSpendings(month[0].total);
        } else {
          setTotalSpendings(0);
        }
      })
  };

  // function to get all of the categories for this month
  const getCategories = () => {

  };

  const [totalSpendings, setTotalSpendings] = useState(getTotalSpendings);
  // const [allCategories, setAllCategories] = useState(getCategories);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to your favorite budget tracker!</Text>
        <Text style={styles.paragraph}>This is the home screen. Here you can see information about the current month.</Text>
      </View>
      <View>
        <Text style={styles.subtitle}>Total spendings this month: {totalSpendings}</Text>
        <Text style={styles.subtitle}>Spendings by category:</Text>
        {/* TODO: add code to display all of the categories for this month */}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginTop: 80,
    paddingBottom: 20,
  },
  paragraph: {
    paddingBottom: 20,
    marginHorizontal: 20,
    fontSize: 16,
  },
  subtitle: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#daffc9',
  },
});
