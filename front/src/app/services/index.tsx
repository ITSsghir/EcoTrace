import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Services = () => {
    const franceTime = '10/09/2024'

    const handleServiceClick = (service) => {
        // Add your logic for handling service click here
        console.log('Service clicked:', service);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My Services</Text>
            <View style={styles.serviceContainer}>
                <TouchableOpacity onPress={() => handleServiceClick('10:00 AM 4G')}>
                    <Text style={styles.serviceText}>{franceTime}</Text>
                    <Text style={styles.serviceText}>4G</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.serviceContainer}>
                <TouchableOpacity onPress={() => handleServiceClick('10:00 AM 4G')}>
                    <Text style={styles.serviceText}>{franceTime}</Text>
                    <Text style={styles.serviceText}>4G</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.searchText}>Search account number or name</Text>
            <View style={styles.servicesList}>
                <TouchableOpacity onPress={() => handleServiceClick('Airtime/Data')}>
                    <Text style={styles.serviceItem}>Airtime/Data</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleServiceClick('Data')}>
                    <Text style={styles.serviceItem}>Data</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleServiceClick('Bill Payment')}>
                    <Text style={styles.serviceItem}>Bill Payment</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleServiceClick('Setup Alert')}>
                    <Text style={styles.serviceItem}>Setup Alert</Text>
                </TouchableOpacity>
                {/* Add other services with TouchableOpacity wrapped Text */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    serviceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    serviceText: {
        fontSize: 16,
        marginRight: 10,
        color: '#007bff',
    },
    searchText: {
        fontSize: 16,
        marginBottom: 10,
    },
    servicesList: {
        marginTop: 10,
    },
    serviceItem: {
        fontSize: 16,
        marginBottom: 5,
        color: '#007bff',
    },
});

export default Services;
