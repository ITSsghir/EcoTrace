import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Filter from '@/components/filter';
import styles from '@/styles/filterBlock';

export default function FilterBlock({ filterHistory, activeFilter }) {
    return (
        <ScrollView horizontal={true} style={styles.filterBlock}>
            <Filter onPress={() => filterHistory('All')} title="All" color="#000" active={activeFilter === 'All'} />
            <Filter onPress={() => filterHistory('High')} title="High" color="#FF0000" active={activeFilter === 'High'} />
            <Filter onPress={() => filterHistory('Medium')} title="Medium" color="#ff8000" active={activeFilter === 'Medium'} />
            <Filter onPress={() => filterHistory('Low')} title="Low" color="#008000" active={activeFilter === 'Low'} />
        </ScrollView>
    );
}