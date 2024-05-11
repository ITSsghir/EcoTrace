import React from 'react';
import { View } from 'react-native';
import backgroundStyles from '@/styles/backgrounds';

export const Background = ({ children }) => {
    return (
        <View style={backgroundStyles.green}>
            {children}
        </View>
    );
};