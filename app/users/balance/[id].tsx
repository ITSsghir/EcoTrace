import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';

// This component is a subcomponent of the Welcome component, it will contain the monthly carbon footprint balance of the user and the daily one as well
export default function Balance() {

    let FullName = 'Demo User' // Get username from the server via API call

    let balance = 'xxxxxxxxxxx' // Get balance from the server via API call

    let FullBalance = balance + 'CO2'

    let DailyBalance = 'xxxxxx' // Get daily balance from the server via API call

    return (
        <View style={ styles.card }>
            <Text style={styles.message}>Welcome {FullName}</Text>
            <Text style={styles.BigMessage}>Current Monthly Carbon Footprint</Text>
            <Text style={styles.Monthly}>{FullBalance}</Text>
            <Text style={styles.Daily}>Today : {DailyBalance}CO2</Text>
        </View>
    )
}



// Create a stylesheet for the balance component (center the text, make the title large, and the subtitle medium, and the message small)
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    BigMessage: {
        fontSize: 24,
        textAlign: 'right',
        fontWeight: 'normal'
    },
    Monthly: {
        fontSize: 30,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    Daily: {
        fontSize: 20,
        textAlign: 'right'
    }
});