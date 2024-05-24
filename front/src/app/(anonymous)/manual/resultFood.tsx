import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ResultFood = () => {
    const params = useLocalSearchParams();
    const [data, setData] = useState({ ingredients: [], carbonFootprints: [] });
    const [isCalculating, setIsCalculating] = useState(true);

    const calculateCarbonFootprint = (ingredient) => {
        return Math.random() * 10; // Remplacer par votre calcul réel
    };

    const processIngredients = () => {
        if (params.ingredients) {
            try {
                let ingredients = [];
                if (Array.isArray(params.ingredients)) {
                    ingredients = JSON.parse(params.ingredients[0]);
                } else {
                    ingredients = JSON.parse(params.ingredients);
                }

                const footprints = ingredients.map(ingredient => ({
                    ...ingredient,
                    footprint: calculateCarbonFootprint(ingredient)
                }));

                setData({ ingredients, carbonFootprints: footprints });
                setIsCalculating(false);
            } catch (error) {
                console.error("Error parsing ingredients:", error);
            }
        } else {
            console.error("No ingredients found in params");
        }
    };

    // Appeler la fonction directement pour initialiser les données
    processIngredients();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Result</Text>
            {!isCalculating ? (
                <>
                    <View style={styles.ingredientsList}>
                        {data.carbonFootprints.map((item, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text style={styles.ingredientText}>{item.name}</Text>
                                <Text style={styles.quantityText}>Quantity: {item.quantity}</Text>
                                <Text style={styles.carbonFootprintText}>{item.footprint.toFixed(2)} CO2e</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.totalText}>
                        Total Carbon Footprint: {data.carbonFootprints.reduce((total, item) => total + item.footprint, 0).toFixed(2)} CO2e
                    </Text>
                </>
            ) : (
                <Text style={styles.emptyText}>Calculating...</Text>
            )}
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
