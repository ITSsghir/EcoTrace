// Create a background component that will be used in the app
// The component should display a background image or a background color
// The component should be reusable and configurable
// The component should be styled using CSS

import React from 'react';
import { Dimensions, View } from 'react-native';

export const Background = ({ children }) => {
    return (
        <View style={backgroundStyles.bgContainer}>
            {children}
        </View>
    );
};
const { width, height } = Dimensions.get('window');

const backgroundStyles = {
    bgContainer: {
        flex: 1,
        backgroundColor: '#00bf63',
        width: width,
        height: height,
    },
};