import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

const TransportationCarbonCalculator = () => {
    const [vehicle, setVehicle] = useState('');
    const [startLocation, setStartLocation] = useState('');
    const [endLocation, setEndLocation] = useState('');

    const handleVehicleChange = (value) => {
        setVehicle(value);
    };

    const handleStartLocationChange = (text) => {
        setStartLocation(text);
    };

    const handleEndLocationChange = (text) => {
        setEndLocation(text);
    };

    const calculateCarbonFootprint = () => {
        // Ajoutez ici votre logique de calcul d'empreinte carbone
        // en utilisant les données saisies
        // Cette fonction pourrait afficher le résultat ou le sauvegarder dans une base de données, etc.
        // Pour cet exemple, nous affichons simplement les données saisies.
        console.log('Véhicule:', vehicle);
        console.log('Départ:', startLocation);
        console.log('Arrivée:', endLocation);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculateur d'empreinte carbone d'un trajet</Text>
            <TextInput
                style={styles.input}
                placeholder="Point de départ"
                value={startLocation}
                onChangeText={handleStartLocationChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Point d'arrivée"
                value={endLocation}
                onChangeText={handleEndLocationChange}
            />
            <Button title="Calculer l'empreinte carbone" onPress={calculateCarbonFootprint} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '80%',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default TransportationCarbonCalculator;
