import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// create screen to keep track of the current month's spendings + option to add new expense
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to your favorite budget tracker!</Text>
        <Text style={styles.paragraph}>This is the home screen. Here you can see information about the current month.</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Total spendings:</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subtitle}>Spendings by category:</Text>
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
  paragraph:{
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
  subContainer: {
    width: 250,
    borderBottomColor: '#b8b8b8',
    borderBottomWidth: 1,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20, 
  },
  header: {
    backgroundColor: '#daffc9',
  },
});
