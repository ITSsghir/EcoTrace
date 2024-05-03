import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';

// This component is a subcomponent of the Welcome component, it will contain the monthly carbon footprint balance of the user and the daily one as well
export default function Balance() {

    let FullName: string = 'Demo User' // Get username from the server via API call

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

// Get the screen width
const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.9;
// Font sizes based on the screen width
const messageFontSize = screenWidth < 400 ? 16 : 20;
const BigMessageFontSize = screenWidth < 400 ? 18 : 24;
const MonthlyFontSize = screenWidth < 400 ? 20 : 30;
const DailyFontSize = screenWidth < 400 ? 10 : 20;

// Create a stylesheet for the balance component (center the text, make the title large, and the subtitle medium, and the message small)
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: cardWidth,
        height: 'auto',
    },
    message: {
        fontSize: messageFontSize,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    BigMessage: {
        fontSize: BigMessageFontSize,
        textAlign: 'right',
        fontWeight: 'normal'
    },
    Monthly: {
        fontSize: MonthlyFontSize,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    Daily: {
        fontSize: DailyFontSize,
        textAlign: 'right'
    }
});

// Export height and width of the component
// convert the height to a number
export const balanceHeight = Number(styles.card.height);