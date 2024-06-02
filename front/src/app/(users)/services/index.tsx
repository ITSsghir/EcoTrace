import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import {router} from "expo-router";

const Services = () => {
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const franceTime = new Date().toLocaleString('en-US', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' });
        setCurrentTime(franceTime);
    }, []);

    const handleServiceClick = (serviceName) => {
        console.log('Service clicked:', serviceName);
        router.push({
            pathname: '/services/advice'
        });
    };
    const handleDataClick = (serviceName) => {
        console.log('Data clicked:', serviceName);
        router.push({
            pathname: '/services/excuse'
        });
    };

    const handleAccountClick = (serviceName) => {
        console.log('Account clicked:', serviceName);
        router.push({
            pathname: '/profile'
        });
    };

    const handleAlertClick = (serviceName) => {
        console.log('Account clicked:', serviceName);
        router.push({
            pathname: '/services/alert'
        });
    };

    const handleHistoryClick = (serviceName) => {
        console.log('Account clicked:', serviceName);
        router.push({
            pathname: '/history'
        });
    };


    return (
        <View style={styles.container}>
            <Text style={styles.myServices}>My Services</Text>
            <View style={styles.serviceContainer}>
                <ServiceButton icon="database" label="Data" onPress={() => handleDataClick('Data')} />
                <ServiceButton icon="bell" label="Setup Alert" onPress={() => handleAlertClick('Setup Alert')} />
                <ServiceButton icon="user" label="Account Officer" onPress={() => handleAccountClick('Account Officer')} />
                <ServiceButton icon="lightbulb" label="Advice" onPress={() => handleServiceClick('Advice')} />
                <ServiceButton icon="history" label="History" onPress={() => handleHistoryClick('History')} />
            </View>
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
        marginBottom: 40,
        marginLeft: 10,
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
