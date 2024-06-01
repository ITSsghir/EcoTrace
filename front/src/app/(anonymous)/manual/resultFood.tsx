import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const ResultFood = () => {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [data, setData] = useState({ ingredients: [], carbonFootprints: [] });
    const [isCalculating, setIsCalculating] = useState(true);

    const calculateCarbonFootprint = (ingredient) => {
        return Math.random() * 10; // Remplacer par votre calcul réel
    };

    const handleRemoveIngredient = (id) => {
        const updatedIngredients = data.ingredients.filter(ing => ing.id !== id);
        const updatedFootprints = data.carbonFootprints.filter(footprint => footprint.id !== id);
        setData({ ingredients: updatedIngredients, carbonFootprints: updatedFootprints });
    };

    const handleValidate = () => {
        // Enregistrer les données dans l'historique (implémentation selon votre logique)
        console.log('Data validated and saved:', data);
        // Redirection vers la page d'accueil ou une autre page après validation
        router.push('/home'); // ou toute autre route
    };

    useEffect(() => {
        const processIngredients = () => {
            if (params.ingredients) {
                try {
                    let ingredients = [];
                    if (Array.isArray(params.ingredients)) {
                        ingredients = JSON.parse(params.ingredients[0]);
                    } else {
                        ingredients = JSON.parse(params.ingredients);
                    }

                    // Filtrer les ingrédients pour ne garder que ceux avec un nom
                    ingredients = ingredients.filter(ingredient => ingredient.name && ingredient.name.trim() !== '');

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

        processIngredients();
    }, [params.ingredients]);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/choice')}>
                <FontAwesome5 name="arrow-left" size={24} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.title}>Result</Text>
            {!isCalculating ? (
                <>
                    <FlatList
                        data={data.carbonFootprints}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.ingredientItem}>
                                <Text style={styles.ingredientText}>{item.name}: {item.footprint.toFixed(2)} CO2e</Text>
                                <TouchableOpacity onPress={() => handleRemoveIngredient(item.id)}>
                                    <FontAwesome5 name="times" size={24} color="#FF0000" />
                                </TouchableOpacity>
                            </View>
                        )}
                        ListFooterComponent={() => (
                            <View style={styles.footer}>
                                <Text style={styles.totalLabel}>Total Carbon Footprint:</Text>
                                <Text style={styles.totalValue}>
                                    {data.carbonFootprints.reduce((total, item) => total + item.footprint, 0).toFixed(2)}{' '}
                                    <Text style={styles.unit}>CO2e</Text>
                                </Text>
                            </View>
                        )}
                    />
                    <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
                        <Text style={styles.buttonText}>Validate</Text>
                    </TouchableOpacity>
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
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ingredientItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
    },
    ingredientText: {
        fontSize: 16,
        flex: 1,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        textAlign: 'center',
    },
    unit: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    validateButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ResultFood;
