import React from 'react';
import { Redirect } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const UserProfile = ({ username, lastLogin, onAccountPress, onDeletePress, onServicesPress, onHistoryPress, onSettingsPress, onLogoutPress }) =>
{

    const handleServicesPress = () => {
        return <Redirect href="/services" />;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Username: {username}</Text>
                <Text style={styles.infoText}>Last Login: {lastLogin}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={onAccountPress}>
                <FontAwesome5 name="user" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onDeletePress}>
                <FontAwesome5 name="trash-alt" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleServicesPress}>
                <Text style={styles.buttonText}>My Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onHistoryPress}>
                <FontAwesome5 name="history" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSettingsPress}>
                <FontAwesome5 name="cog" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Settings & Help</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onLogoutPress}>
                <FontAwesome5 name="sign-out-alt" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Logout</Text>
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
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default UserProfile;
