import colors from '@constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const backgroundStyles = StyleSheet.create({
    green: {
        flex: 1,
        backgroundColor: colors.secondary,
        width: width,
        height: height,
    },
});

export default backgroundStyles;