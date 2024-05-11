import { FlatList, TouchableOpacity, Image, View, ScrollView } from "react-native";
import React from "react";
import icons from "@constants/icons";
import { useRouter } from "expo-router";
import styles from "@/styles/choices";

export default function Choices() {

    const router = useRouter();

    return (
        <ScrollView showsVerticalScrollIndicator={false} horizontal={true} style={styles.choicesContainer}>
            <View>
            <TouchableOpacity style={styles.button} onPress={
                () => {
                    router.push({ pathname: '/camera'})
                }
            }>
                <Image source={icons.camera} style={styles.icon} />
            </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={
                    () => {
                        router.push({ pathname: '/microphone' })
                    }
                }>
                    <Image source={icons.microphone} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={
                    () => {
                        router.push({ pathname: '/vehicle' })
                    }
                }>
                    <Image source={icons.car} style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={
                    () => {
                        router.push({ pathname: '/destination' })
                    }
                }>
                    <Image source={icons.destination} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}