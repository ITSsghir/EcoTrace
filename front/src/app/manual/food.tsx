import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';

const App = () => {
    const [ingredient, setIngredient] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);

    const handleIngredientChange = (text) => {
        setIngredient(text);
    };

    const handleAddIngredient = () => {
        if (ingredient.trim() !== '') {
            setIngredientsList([...ingredientsList, ingredient]);
            setIngredient('');
        }
    };

    const handleKeyPress = (event) => {
        if (event.nativeEvent.key === 'Enter') {
            handleAddIngredient();
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saisie des composants d'un plat</Text>
            <TextInput
                style={styles.input}
                placeholder="Entrez un composant"
                value={ingredient}
                onChangeText={handleIngredientChange}
                onKeyPress={handleKeyPress}
            />
            <Button title="Ajouter" onPress={handleAddIngredient} />
            <ScrollView style={styles.scrollView}>
                {ingredientsList.map((item, index) => (
                    <Text key={index} style={styles.item}>{item}</Text>
                ))}
            </ScrollView>
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
    scrollView: {
        marginTop: 20,
        width: '100%',
    },
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default App;
