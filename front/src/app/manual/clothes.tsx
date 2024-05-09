import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';

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
        // Ajoutez ici votre logique de calcul d'empreinte carbone
        // en utilisant les données saisies
        // Cette fonction pourrait afficher le résultat ou le sauvegarder dans une base de données, etc.
        // Pour cet exemple, nous affichons simplement les données saisies.
        console.log('Provenance:', origin);
        console.log('Texture:', texture);
        console.log('Marque:', brand);
        console.log('Taille:', size);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calculateur d'empreinte carbone d'un vêtement</Text>
            <TextInput
                style={styles.input}
                placeholder="Provenance du vêtement"
                value={origin}
                onChangeText={handleOriginChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Texture du vêtement"
                value={texture}
                onChangeText={handleTextureChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Marque du vêtement"
                value={brand}
                onChangeText={handleBrandChange}
            />
            <TextInput
                style={styles.input}
                placeholder="Taille du vêtement"
                value={size}
                onChangeText={handleSizeChange}
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
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default CarbonFootprintCalculator;
