import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';


const screenWidth = Dimensions.get('window').width;
export default function Filter({ onPress, title, color, active }) {
    const filterStyles = StyleSheet.create({
        filter: {
            backgroundColor: active ? color : '#fff',
            borderRadius: 10 / 1.25,
            padding: 0,
            margin: 5,
            width: screenWidth * 0.2,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: color,
        },
    });

    return (
        <TouchableOpacity onPress={onPress} style={filterStyles.filter}>
            <Text style={{ color: active ?  '#fff': color }}>{title}</Text>
        </TouchableOpacity>
    );
}
