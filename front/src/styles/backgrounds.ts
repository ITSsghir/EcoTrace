import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const backgroundStyles = StyleSheet.create({
    green: {
        flex: 1,
        backgroundColor: '#00bf63',
        width: width,
        height: height,
    },
});

export default backgroundStyles;