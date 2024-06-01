import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSession } from '@/context/ctx';
import Colors from '@constants/Colors';

const ResultFood = () => {
    
    const { predictionJson } = useSession();

    // Get the router
    const router = useRouter();
    // Ensure that dataJSON is always a string

    console.log('Data JSON:', predictionJson);

    // Parse the JSON data
    const dataJSON = predictionJson;
    const data = JSON.parse(dataJSON);

    // Get the ingredients
    const ingredients = data.ingredients;

    // Calculate the total carbon footprint
    let totalCarbonFootprint = data.total_carbon_footprint;

    // Save the data to the server and return to the home page (for now, just return to the home page)
    const SaveData = async () => {
        const req = {
            name: data.nom,
            description: data.description,
            activity_type: 'food',
            date: data.date,
            carbon_footprint: totalCarbonFootprint,
        }
        // Save the data to the server
        

        // Return to the home page
        router.replace('/home');
    }

    const renderResult = () => {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Résultat</Text>
                {ingredients.length <= 0 ? (<>
                    <Text style={styles.carbonFootprintText}>Pas d'ingrédients trouvés, analyse de photo échoué</Text>
                    <TouchableOpacity onPress={() => { router.replace('/manual/food'); } } style={styles.btn}>
                        <Text style={{ color: Colors.primary }}>Manual entry</Text>
                    </TouchableOpacity>
                </>) : (
                    <>
                    <Text style={[styles.totalText, { textAlign: 'left', marginBottom: 10}]}>Plat: {data.nom}</Text>
                    <FlatList
                        data={ingredients}
                        keyExtractor={(_item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.ingredientItem}>
                                <Text style={styles.ingredientText}>Nom ingrédient: {item.nom}</Text>
                                <Text style={styles.quantityText}>Quantité: {item.quantité}{item.unité}</Text>
                            </View>
                        )} /><View>
                            <Text style={styles.totalText}>
                                Empreinte carbone totale: {totalCarbonFootprint}{data.unité}
                            </Text>
                        </View>
                    </>
                )}
                <TouchableOpacity onPress={() => { router.replace('/home'); } } style={styles.btn}>
                    <Text style={{ color: Colors.primary }}>Sauvegarder et revenir à l'accueil</Text>
                </TouchableOpacity>
            </View>
        );
    };

    return renderResult();
};

const width = Dimensions.get('window').width;

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
    btn: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        marginRight: width * 0.1,
        marginLeft: width * 0.1,
        marginTop: 10,
        marginBottom: 10,
        width: width * 0.8 - 30,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ResultFood;
