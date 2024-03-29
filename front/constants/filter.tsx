import { Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function Filter({onPress, active, title, color}) {
    const filterStyles = StyleSheet.create({
        filter: {
            backgroundColor: "#fff",
            borderRadius: 10 / 1.25,
            color: color,
            padding: 10,
            margin: 5,
            width: 100,
            height: 30,
            justifyContent: "center",
            alignItems: "center"
        },
        filterActive: {
            backgroundColor: color,
            borderRadius: 10 / 1.25,
            color: "#fff",
            padding: 10,
            margin: 5,
            width: 100,
            height: 30,
            justifyContent: "center",
            alignItems: "center"
        }
    });
    return (
        <TouchableOpacity onPress={onPress} style={active ? filterStyles.filterActive : filterStyles.filter}>
            <Text style={active ? {color: "#fff"} : {color: color}}>{title}</Text>
        </TouchableOpacity>
    );
}


