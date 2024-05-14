import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Index = () => {
    // Ingrédients de test
    const testIngredients = [
        { name: 'Carotte', quantity: '200g' },
        { name: 'Chou', quantity: '300g' }
    ];

    // Fonction pour calculer l'empreinte carbone de chaque ingrédient
    const calculateCarbonFootprint = (ingredient) => {
        // Ajoutez votre logique pour calculer l'empreinte carbone de chaque ingrédient ici
        // Ceci est juste un exemple
        return Math.random() * 10; // Remplacer par votre calcul réel
    };

    // Tableau d'état pour stocker les empreintes carboniques calculées
    const [carbonFootprints, setCarbonFootprints] = useState([]);

    useEffect(() => {
        // Fonction pour calculer les empreintes carboniques et les stocker
        const calculateAndStoreCarbonFootprints = () => {
            const footprints = testIngredients.map(ingredient => {
                return {
                    name: ingredient.name,
                    footprint: calculateCarbonFootprint(ingredient)
                };
            });
            setCarbonFootprints(footprints);
        };

        // Appel de la fonction pour calculer les empreintes carboniques
        calculateAndStoreCarbonFootprints();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Result</Text>
            {carbonFootprints.length > 0 ? (
                <>
                    <View style={styles.ingredientsList}>
                        {carbonFootprints.map((item, index) => (
                            <View key={index} style={styles.ingredientItem}>
                                <Text style={styles.ingredientText}>{item.name}</Text>
                                <Text style={styles.carbonFootprintText}>{item.footprint} CO2e</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={styles.totalText}>Total Carbon Footprint: {carbonFootprints.reduce((total, item) => total + item.footprint, 0)} CO2e</Text>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    ingredientText: {
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

export default Index;
