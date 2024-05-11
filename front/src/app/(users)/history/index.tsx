import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import styles from '@/styles/history';
import FilterBlock from '@/components/filterBlock';


let history = [
    { id: '1', title: 'Activity 1', carbon_footprint: 0 , unit: 'KgCO2e', method: 'Camera' },
    { id: '2', title: 'Activity 2', carbon_footprint: 0 , unit: 'KgCO2e', method: 'Microphone' },
    { id: '3', title: 'Activity 3', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Vehicle' },
    { id: '4', title: 'Activity 4', carbon_footprint: 5 , unit: 'kgCO2e', method: 'Destination' },
    { id: '5', title: 'Activity 5', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Camera' },
    { id: '6', title: 'Activity 6', carbon_footprint: 1 , unit: 'kgCO2e', method: 'Microphone' },
    { id: '7', title: 'Activity 7', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Vehicle' },
    { id: '8', title: 'Activity 8', carbon_footprint: 7 , unit: 'kgCO2e', method: 'Destination' },
    { id: '9', title: 'Activity 9', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Camera' },
    { id: '10', title: 'Activity 10', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Microphone' },
    { id: '11', title: 'Activity 11', carbon_footprint: 3 , unit: 'kgCO2e', method: 'Vehicle' },
    { id: '12', title: 'Activity 12', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Destination' }
];

export default function History() {
    const [activeFilter, setActiveFilter] = React.useState('All');
    const [filteredHistory, setFilteredHistory] = React.useState(history);

    const filterHistory = (filter) => {
        let filtered = history;
        if (filter === 'High') {
            filtered = history.filter(item => item.carbon_footprint > 5);
        } else if (filter === 'Medium') {
            filtered = history.filter(item => item.carbon_footprint > 1 && item.carbon_footprint <= 5);
        } else if (filter === 'Low') {
            filtered = history.filter(item => item.carbon_footprint <= 1);
        }
        setFilteredHistory(filtered);
        setActiveFilter(filter);
    }

    return (
        <View style={styles.historyContainer}>
            <FilterBlock filterHistory={filterHistory} activeFilter={activeFilter} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={filteredHistory}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.activity}>
                            <Text style={styles.subTitle}>{item.title}</Text>
                            <Text style={styles.subSubTitle}>{item.carbon_footprint + ' ' + item.unit}</Text>
                            <Text style={styles.subSubTitle}>{item.method}</Text>
                        </View>
                    )}
                />
            </ScrollView>
        </View>
    )
}