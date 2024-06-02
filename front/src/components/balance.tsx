import React from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from '@/styles/balance';

// This component is a subcomponent of the Welcome component, it will contain the monthly carbon footprint balance of the user and the daily one as well
export default function Balance({ balance, unit, daily_balance, daily_unit, full_name }) {

    let FullBalance: string = balance +  unit;

    let DailyBalance : string = daily_balance +  daily_unit;

    return (
        <View style={ styles.card }>
            <Text style={styles.message}>Welcome {full_name}</Text>
            <Text style={styles.BigMessage}>Current Monthly Carbon Footprint</Text>
            <Text style={styles.Monthly}>{FullBalance}</Text>
            <Text style={styles.Daily}>Today : {DailyBalance}</Text>
        </View>
    )
}