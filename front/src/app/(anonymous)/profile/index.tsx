import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSession } from '@/context/ctx';

const Profile = ({ onDeletePress, onServicesPress, onSettingsPress }) => {
    const { token } = useSession();
    const router = useRouter();

    const handleNavigate = (route) => {
        router.push(route);
    };

    const handleServicesPress = () => {
        router.push({ pathname: '/services' });
    };
    const onHistoryPress = () => {
        router.push({ pathname: '/history' });
    };

    const onAccountPress = () => {
        router.push({ pathname: '/menu' });
    };

    const onLogoutPress = () => {
        router.push({ pathname: '/home' });
    };

    const username = "User123";  // Replace with actual username from context
    const lastLogin = "2024-05-22";  // Replace with actual last login date from context

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
                <FontAwesome5 name="cogs" size={20} color="#fff" style={styles.icon} />
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
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onLogoutPress}>
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
    },
    logoutButton: {
        backgroundColor: '#d9534f',
    },
});

export default Profile;
