import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const CarbonFootprintCalculator = () => {
    const [origin, setOrigin] = useState('');
    const [texture, setTexture] = useState('');
    const [brand, setBrand] = useState('');
    const [size, setSize] = useState('');

    const handleOriginChange = (text) => {
        setOrigin(text);
    };

    const handleTextureChange = (text) => {
        setTexture(text);
    };

    const handleBrandChange = (text) => {
        setBrand(text);
    };

    const handleSizeChange = (text) => {
        setSize(text);
    };

    const calculateCarbonFootprint = () => {
        // Add your carbon footprint calculation logic here
        // Using the entered data
        // This function could display the result or save it to a database, etc.
        // For this example, we simply log the entered data.
        console.log('Origin:', origin);
        console.log('Texture:', texture);
        console.log('Brand:', brand);
        console.log('Size:', size);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Clothing Carbon Footprint Calculator</Text>
            <View style={styles.inputContainer}>
                <FontAwesome5 name="globe" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Clothing Origin"
                    value={origin}
                    onChangeText={handleOriginChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5 name="tshirt" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Clothing Texture"
                    value={texture}
                    onChangeText={handleTextureChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5 name="tags" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Clothing Brand"
                    value={brand}
                    onChangeText={handleBrandChange}
                />
            </View>
            <View style={styles.inputContainer}>
                <FontAwesome5 name="arrows-alt-v" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    placeholder="Clothing Size"
                    value={size}
                    onChangeText={handleSizeChange}
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

export default CarbonFootprintCalculator;
