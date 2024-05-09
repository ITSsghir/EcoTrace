import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserProfile = ({ username, lastLogin, onAccountPress, onDeletePress, onServicesPress, onHistoryPress, onSettingsPress, onLogoutPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profil Utilisateur</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Nom d'utilisateur: {username}</Text>
                <Text style={styles.infoText}>Dernière connexion: {lastLogin}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onAccountPress}>
                <Text style={styles.buttonText}>Compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onDeletePress}>
                <Text style={styles.buttonText}>Supprimer le compte</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onServicesPress}>
                <Text style={styles.buttonText}>Mes Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onHistoryPress}>
                <Text style={styles.buttonText}>Historique</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSettingsPress}>
                <Text style={styles.buttonText}>Paramètres et Aide</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
                <Text style={styles.buttonText}>Déconnexion</Text>
            </TouchableOpacity>
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
    infoContainer: {
        marginBottom: 20,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UserProfile;
