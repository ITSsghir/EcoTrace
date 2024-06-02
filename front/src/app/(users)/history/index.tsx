import { router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import styles from '@/styles/history';
import FilterBlock from '@/components/filterBlock';
import { useSession } from '@/app/context/ctx';

export default function History() {

    const { history, daily_balance } = useSession();
    const historyJSON = JSON.parse(history)
    const [activeFilter, setActiveFilter] = React.useState('All');
    const [filteredHistory, setFilteredHistory] = React.useState(historyJSON);

    const filterHistory = (filter) => {
        let filtered = historyJSON;
        if (filter === 'High') {
            filtered = historyJSON.filter(item => item.carbon_footprint / daily_balance > 0.3);
        } else if (filter === 'Medium') {
            filtered = historyJSON.filter(item => item.carbon_footprint / daily_balance <= 0.3 && item.carbon_footprint / daily_balance > 0.14);
        } else if (filter === 'Low') {
            filtered = historyJSON.filter(item => item.carbon_footprint / daily_balance <= 0.14);
        }
        setFilteredHistory(filtered); // Update filteredHistory, not history
        setActiveFilter(filter);
    }
    

    const renderActivity = (filteredHistory: any) => {
        // For each activity, render the activity
        return filteredHistory.map((item, index) => {
            return (
                <View style={styles.activity} key={index}>
                    <Text style={styles.subTitle}>{item.name}</Text>
                    <Text style={styles.subSubTitle}>{item.carbon_footprint} {item.unit}</Text>
                    <Text style={styles.subSubTitle}>{item.activity_type}</Text>
                </View>
            )
        })
    }

    return (
        <View style={styles.historyContainer}>
            <FilterBlock filterHistory={filterHistory} activeFilter={activeFilter} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {renderActivity(filteredHistory)}
                </View>
            </ScrollView>
        </View>
    )
}