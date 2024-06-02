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
    const [filteredHistory, setFilteredHistory] = React.useState([]);;

    const filterHistory = (filter) => {
        let filtered = historyJSON;
        if (filter === 'High') {
            filtered = historyJSON.filter((item: { carbon_footprint: number; }) => item.carbon_footprint / daily_balance > 0.3);
        } else if (filter === 'Medium') {
            filtered = historyJSON.filter((item: { carbon_footprint: number; }) => item.carbon_footprint / daily_balance <= 0.3 && item.carbon_footprint / daily_balance > 0.15);
        } else if (filter === 'Low') {
            filtered = historyJSON.filter((item: { carbon_footprint: number; }) => item.carbon_footprint / daily_balance <= 0.15);
        }
        setFilteredHistory(filtered); // Update filteredHistory, not history
        setActiveFilter(filter);
    }
    

    const renderActivity = (filteredHistory: any) => {
        // For each activity, render the activity
        if (filteredHistory) {
            if (filteredHistory.length === 0) {
                return (
                    <Text style={styles.noActivitiesTitle}>No {activeFilter} carbon footprint activities</Text>
                );
            }
            else {
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
        } else {
            return <Text>No data</Text>
        }
    }

    return (
        <View>
            <FilterBlock filterHistory={filterHistory} activeFilter={activeFilter} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {renderActivity(filteredHistory)}
            </ScrollView>
        </View>
    )
}