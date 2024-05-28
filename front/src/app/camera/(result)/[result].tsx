import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { parse } from 'expo-linking';

const ResultFood = () => {
    const params = useLocalSearchParams();
    // Ensure that dataJSON is always a string
    const dataJSON = Array.isArray(params.result) ? params.result[0] : params.result;

    console.log('Data JSON:', dataJSON);

    let parsedData = null;
    try {
        // Attempt to parse the JSON string
        parsedData = JSON.parse(dataJSON);
    } catch (error) {
        // Handle parsing errors
        console.error('Error parsing JSON:', error);
    }

    // Check if parsedData is not null and undefined
    if (parsedData) {
        // Your code to render the parsed data
        // Access properties like parsedData.ingredients, parsedData.nom, etc.
        console.log(parsedData); // Check the parsed data in the console
    } else {
        // Handle case where parsedData is null or undefined
        console.error('Parsed data is null or undefined.');
    }

    // Sample ingredients data
    const ingredients = parsedData.ingredients;

    // Calculate the total carbon footprint
    let totalCarbonFootprint = 0;

    const renderResult = () => {
        return (
            <ScrollView style={{ flex: 1 }}>
                <FlatList
                    data={ingredients}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.ingredientItem}>
                            <Text style={styles.ingredientText}>{item.name}</Text>
                            <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
                            <Text style={styles.carbonFootprintText}>{item.carbonFootprint} CO2e</Text>
                        </View>
                    )}
                />
                <View>
                    <Text style={styles.totalText}>
                        Total Carbon Footprint: {totalCarbonFootprint} CO2e
                    </Text>
                </View>
            </ScrollView>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Result</Text>
                <>
                    <View style={styles.ingredientsList}>

                    </View>
                    <Text style={styles.totalText}>
                        Total Carbon Footprint
                    </Text>
                </>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ingredientsList: {
        marginBottom: 20,
    },
    ingredientItem: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    ingredientText: {
        fontSize: 16,
    },
    quantityText: {
        fontSize: 16,
    },
    carbonFootprintText: {
        fontSize: 16,
        color: '#4CAF50',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ResultFood;
