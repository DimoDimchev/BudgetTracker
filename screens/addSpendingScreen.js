import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

// create screen where users can create a new spending
export default function addSpendingScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Add a new spending right here!</Text>
                <Text style={styles.paragraph}>This is the New Spending screen. Here you can add a new expense, set its value and assign a category to it.</Text>
            </View>
            <View style={styles.formContainer}>
                <Text>Title:</Text>
                <TextInput
                    placeholder="Write a title here"
                    style={styles.input}
                />
                <Text>Amount spent:</Text>
                <TextInput
                    placeholder="Set an amount here"
                    keyboardType="numeric"
                    style={styles.input}
                />
                <Text>Category:</Text>
                <TextInput
                    placeholder="Set a category here:"
                    style={styles.input}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    formContainer: {
        marginHorizontal: 30,
        marginTop: 30,
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
    header: {
        backgroundColor: '#daffc9',
    },
    input: {
        borderWidth: 1,
        borderColor: '#dddddd',
        marginBottom: 30,
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
    },
});
