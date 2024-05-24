import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icons from '@constants/icons';
import {router} from "expo-router";

const SorryPage = ({ navigation }) => {
    const handleBack = () => {
        router.push({
            pathname: '/services'
        });
    };

    return (
        <View style={styles.container}>
            <Image source={Icons.sorry} style={styles.characterImage} />
            <Text style={styles.title}>Oops!</Text>
            <Text style={styles.message}>Sorry, this feature is not yet implemented.</Text>
            <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    characterImage: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#4CAF50',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SorryPage;
