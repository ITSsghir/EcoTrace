import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
//import { FontAwesome5 } from '@expo/vector-icons';
import { router } from "expo-router";
import icons from '@/components/icons';

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
        const result = {
            vehicle: vehicle,
            startLocation: startLocation,
            endLocation: endLocation,
            carbonFootprint: 100
        };

        // Send a POST request to the server to calculate the carbon footprint (result)
        router.push({
            pathname: '/manual/excuse' }
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transport Carbon Calculator</Text>
            <View style={styles.inputContainer}>
                <Image source={icons.car} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter vehicle"
                    value={vehicle}
                    onChangeText={handleVehicleChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image source={icons.destination} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter start location"
                    value={startLocation}
                    onChangeText={handleStartLocationChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <Image source={icons.destination} style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Enter end location"
                    value={endLocation}
                    onChangeText={handleEndLocationChange}
                />
            </View>
            <Button title="Calculate Carbon Footprint" onPress={calculateCarbonFootprint} color="#4CAF50" />
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
        color: '#4CAF50',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    inputIcon: {
        fontSize: 20,
        marginRight: 10,
        color: '#4CAF50',
        width: 20,
        height: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: '#4CAF50',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default TransportationCarbonCalculator;
