import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import icons from '@/components/icons';
import { useSession } from '@/app/context/ctx';

const Profile = () => {
    const router = useRouter();

    const { full_name, lastLogin, userId, deleteUser } = useSession();

    const onAccountPress = () => {
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
            <Text style={styles.title}>User Profile</Text>
            <View style={styles.infoContainer}>
                <View style={styles.info}>
                    <Text style={styles.infoName}>Name:</Text>
                    <Text style={styles.infoText}>  {full_name}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoName}>Last Login:</Text>
                    <Text style={styles.infoText}>  {lastLogin}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/services')}>
                <Image source={icons.services} style={styles.icon} />
                <Text style={styles.buttonText}>Services</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => router.push('/history')}>
                <Image source={icons.history} style={styles.icon} />
                <Text style={styles.buttonText}>View History</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onAccountPress}>
                <Image source={icons.update} style={styles.icon} />
                <Text style={styles.buttonText}>Update Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={onDeleteAccount}>
                <Image source={icons.delete} style={styles.icon} />
                <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 25,
        marginLeft: 5,
    },
    infoContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        width: screenWidth - 40,
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
    infoName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
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
        marginLeft: 5
    },
    icon: {
        marginRight: 10,
        width: 20,
        height: 20,
    },
    logoutButton: {
        backgroundColor: '#d9534f',
    },
    info: {
        flexDirection: 'row',
    },
});

export default Profile;
