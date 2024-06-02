import colors from '@constants/Colors';
import { StyleSheet, Dimensions } from 'react-native';

// Get the screen width
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const cardWidth = screenWidth * 0.9;
// Font sizes based on the screen width
const messageFontSize = screenWidth < 400 ? 16 : 20;
const BigMessageFontSize = screenWidth < 400 ? 18 : 24;
const MonthlyFontSize = screenWidth < 400 ? 20 : 30;
const DailyFontSize = screenWidth < 400 ? 10 : 20;

// Create a stylesheet for the balance component (center the text, make the title large, and the subtitle medium, and the message small)
const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        padding: 20,
        borderRadius: 10,
        width: cardWidth,
        height: screenHeight * 145/812,
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

export default styles;