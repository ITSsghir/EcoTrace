import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import styles from '@/styles/history';


let history = [
    { id: '1', title: 'Activity 1', carbon_footprint: 'xxxxxxCO2e', method: 'Camera' },
    { id: '2', title: 'Activity 2', carbon_footprint: 'xxxxxxCO2e', method: 'Microphone' },
    { id: '3', title: 'Activity 3', carbon_footprint: 'xxxxxxCO2e', method: 'Vehicle' },
    { id: '4', title: 'Activity 4', carbon_footprint: 'xxxxxxCO2e', method: 'Destination' },
    { id: '5', title: 'Activity 5', carbon_footprint: 'xxxxxxCO2e', method: 'Camera' },
    { id: '6', title: 'Activity 6', carbon_footprint: 'xxxxxxCO2e', method: 'Microphone' },
    { id: '7', title: 'Activity 7', carbon_footprint: 'xxxxxxCO2e', method: 'Vehicle' },
    { id: '8', title: 'Activity 8', carbon_footprint: 'xxxxxxCO2e', method: 'Destination' },
    { id: '9', title: 'Activity 9', carbon_footprint: 'xxxxxxCO2e', method: 'Camera' },
    { id: '10', title: 'Activity 10', carbon_footprint: 'xxxxxxCO2e', method: 'Microphone' },
    { id: '11', title: 'Activity 11', carbon_footprint: 'xxxxxxCO2e', method: 'Vehicle' },
    { id: '12', title: 'Activity 12', carbon_footprint: 'xxxxxxCO2e', method: 'Destination' }
];

export default function History() {

    return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    onPress= {
                        () => {
                            console.log('History clicked')
                            router.push({ pathname: '/history', params: { id: 1 } })
                        }
                    }
                >
                <FlatList
                    data={history}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.activity}>
                            <Text style={styles.subTitle}>{item.title}</Text>
                            <Text style={styles.subSubTitle}>{item.carbon_footprint}</Text>
                            <Text style={styles.subSubTitle}>{item.method}</Text>
                        </View>
                    )}
                />
                </TouchableOpacity>
            </ScrollView>
    )
}