import { FlatList, TouchableOpacity, Image, View } from "react-native";
import React from "react";
import icons from "@constants/icons";
import { useRouter } from "expo-router";
import styles from "@/styles/choices";

export default function Choices() {

    const router = useRouter();

    const choices = [
        { id: '1', title: 'Camera', icon: icons.camera, route: 'Camera', onpress: () => router.push({ pathname: '/camera'})},
        { id: '2', title: 'Microphone', icon: icons.microphone, route: 'Microphone', onpress: () => router.push({ pathname: '/microphone', params: { id: 1 } })},
        { id: '3', title: 'Vehicle', icon: icons.car, route: 'Vehicle', onpress: () => router.push({ pathname: '/vehicle', params: { id: 1 } })},
        { id: '4', title: 'Destination', icon: icons.destination, route: 'Destination', onpress: () => router.push({ pathname: '/destination', params: { id: 1 } })},
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.button} onPress={item.onpress}>
            <Image source={item.icon} style={styles.icon} />
        </TouchableOpacity>
    );
    return (
        <View>
            <FlatList
                data={choices}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                style={styles.choicesContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            />
        </View>
    );
}