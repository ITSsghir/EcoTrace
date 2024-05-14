import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const OrderForm = ({ navigation }) => {
    const [ingredients, setIngredients] = useState([{ id: 1, name: '', quantity: '' }]);

    const handleChangeIngredientName = (id, value) => {
        const updatedIngredients = ingredients.map(ing => ing.id === id ? { ...ing, name: value } : ing);
        setIngredients(updatedIngredients);
    };

    const handleChangeIngredientQuantity = (id, value) => {
        const updatedIngredients = ingredients.map(ing => ing.id === id ? { ...ing, quantity: value } : ing);
        setIngredients(updatedIngredients);
    };

    const handleAddIngredient = () => {
        const newId = ingredients.length > 0 ? ingredients[ingredients.length - 1].id + 1 : 1;
        setIngredients([...ingredients, { id: newId, name: '', quantity: '' }]);
    };

    const handleRemoveIngredient = (id) => {
        const updatedIngredients = ingredients.filter(ing => ing.id !== id);
        setIngredients(updatedIngredients);
    };

    const handleReset = () => {
        setIngredients([{ id: 1, name: '', quantity: '' }]);
    };

    const handleSubmit = () => {
        // Add logic for submitting the order and redirecting to '/result'
        console.log('Order submitted:', ingredients);
        // Redirect to '/result'
        navigation.navigate('Result', { ingredients });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Manual Entries</Text>
            {ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredient}>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingredient"
                        value={ingredient.name}
                        onChangeText={(value) => handleChangeIngredientName(ingredient.id, value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantity"
                        value={ingredient.quantity}
                        onChangeText={(value) => handleChangeIngredientQuantity(ingredient.id, value)}
                    />
                    <TouchableOpacity onPress={() => handleRemoveIngredient(ingredient.id)}>
                        <FontAwesome5 name="times" size={24} color="#4CAF50" style={styles.removeIcon} />
                    </TouchableOpacity>
                </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={handleAddIngredient}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
            <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.buttonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    ingredient: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    removeIcon: {
        marginLeft: 10,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginTop: 10,
        alignSelf: 'center',
        marginRight: 10,
    },
    addButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    resetButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginRight: 10,
    },
    submitButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default OrderForm;
