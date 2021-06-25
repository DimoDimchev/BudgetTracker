import React from 'react';
import { Text, View, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import globalStyles from '../styles/global';

import { Formik } from 'formik';
import * as yup from 'yup';

// creating a review schema for the form using Yup in order to validate it
const SpendingSchema = yup.object({
    title: yup
        .string()
        .required()
        .min(4),
    amount: yup
        .string()
        .required()
        .min(1),
    category: yup
        .string()
        .required()
        .min(4),
});

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
                    <Formik
                        initialValues={{
                            title: '',
                            amount: '',
                            category: '',
                        }}
                        onSubmit={(values, actions) => {
                            actions.resetForm;
                        }}
                        validationSchema={SpendingSchema}
                    >
                        {(props) => (
                            <View style={globalStyles.formContainer}>
                                <Text style={globalStyles.subtitle}>Title:</Text>
                                <TextInput
                                    placeholder="Write a title here"
                                    style={globalStyles.input}
                                    autoCorrect={false}
                                    onChangeText={props.handleChange('title')}
                                    value={props.values.title}
                                    onBlur={props.handleBlur('title')}
                                />
                                <Text style={globalStyles.error}>{props.touched.title && props.errors.title}</Text>
                                <Text style={globalStyles.subtitle}>Amount spent:</Text>
                                <TextInput
                                    placeholder="Set an amount here"
                                    keyboardType="numeric"
                                    style={globalStyles.input}
                                    autoCorrect={false}
                                    onChangeText={props.handleChange('amount')}
                                    value={props.values.amount}
                                    onBlur={props.handleBlur('amount')}
                                />
                                <Text style={globalStyles.error}>{props.touched.amount && props.errors.amount}</Text>
                                <Text style={globalStyles.subtitle}>Category:</Text>
                                <TextInput
                                    placeholder="Set a category here:"
                                    style={globalStyles.input}
                                    autoCorrect={false}
                                    onChangeText={props.handleChange('category')}
                                    value={props.values.category}
                                    onBlur={props.handleBlur('category')}
                                />
                                <Text style={globalStyles.error}>{props.touched.category && props.errors.category}</Text>
                                <Button
                                    color="#4D6CFA"
                                    title="Add spending"
                                />
                            </View>
                        )}
                    </Formik>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}