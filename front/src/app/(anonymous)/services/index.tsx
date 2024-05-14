import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const Services = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const franceTime = new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
        setCurrentTime(franceTime);
    }, []);

    const handleServiceClick = (serviceName) => {
        // Add your logic for handling service click here
        console.log('Service clicked:', serviceName);
        // You can add navigation logic here to redirect to respective pages
    };

    return (
        <View style={styles.container}>
            <Text style={styles.myServices}>My Services</Text>
            <View style={styles.serviceContainer}>
                <ServiceButton icon="database" label="Data" onPress={() => handleServiceClick('Data')} />
                <ServiceButton icon="bell" label="Setup Alert" onPress={() => handleServiceClick('Setup Alert')} />
                <ServiceButton icon="user" label="Account Officer" onPress={() => handleServiceClick('Account Officer')} />
                <ServiceButton icon="lightbulb" label="Advice" onPress={() => handleServiceClick('Advice')} />
                <ServiceButton icon="history" label="History" onPress={() => handleServiceClick('History')} />
            </View>
            <Text style={styles.timeText}>Current Time: {currentTime}</Text>
        </View>
    );
};

const ServiceButton = ({ icon, label, onPress }) => {
    return (
        <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
            <FontAwesome5 name={icon} size={40} color="#4CAF50" />
            <Text style={styles.serviceLabel}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    myServices: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    serviceContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    serviceButton: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        width: 120,
        height: 120,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#4CAF50',
    },
    serviceLabel: {
        marginTop: 5,
        fontSize: 16,
        color: '#333',
    },
    timeText: {
        fontSize: 14,
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default Services;
