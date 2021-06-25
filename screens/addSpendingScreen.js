import React from 'react';
import { Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../styles/global';

// create screen where users can create a new spending
export default function addSpendingScreen() {
    return (
        <View style={globalStyles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <View style={globalStyles.header}>
                        <Text style={globalStyles.title}>Add a new spending right here!</Text>
                        <Text style={globalStyles.paragraph}>This is the New Spending screen. Here you can add a new expense, set its value and assign a category to it.</Text>
                    </View>
                    <View style={globalStyles.formContainer}>
                        <Text style={globalStyles.subtitle}>Title:</Text>
                        <TextInput
                            placeholder="Write a title here"
                            style={globalStyles.input}
                            autoCorrect={false}
                        />
                        <Text style={globalStyles.subtitle}>Amount spent:</Text>
                        <TextInput
                            placeholder="Set an amount here"
                            keyboardType="numeric"
                            style={globalStyles.input}
                            autoCorrect={false}
                        />
                        <Text style={globalStyles.subtitle}>Category:</Text>
                        <TextInput
                            placeholder="Set a category here:"
                            style={globalStyles.input}
                            autoCorrect={false}
                        />
                        <Button 
                            color="#4D6CFA"
                            title="Add spending"
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}