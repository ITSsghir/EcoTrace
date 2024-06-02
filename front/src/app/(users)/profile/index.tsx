import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import icons from '@/components/icons';
import { useSession } from '@/app/context/ctx';

const Profile = () => {
    const router = useRouter();

    const { full_name, lastLogin, userId, deleteUser } = useSession();

    const onAccountPress = () => {
        // Not implemented yet
        router.push({ pathname: '/profile/update' });
    };

    const onDeleteAccount = async () => {
        // Delete the user account
        await deleteUser(userId);

        // Redirect to the home page
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Name: {full_name}</Text>
                <Text style={styles.infoText}>Last Login: {lastLogin}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onAccountPress}>
                <Text style={styles.buttonText}>Update Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onDeleteAccount}>
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    button: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'flex-start',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 15,
    },
    icon: {
        marginRight: 10,
        width: 20,
        height: 20,
    },
    logoutButton: {
        backgroundColor: '#d9534f',
    },
});

export default Profile;
