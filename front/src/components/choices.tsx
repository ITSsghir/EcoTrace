import { FlatList, TouchableOpacity, Image, Text, Dimensions, View } from "react-native";
import React from "react";
import icons from "@constants/icons";
import { useRouter } from "expo-router";

export default function Choices() {

    const router = useRouter();

    const choices = [
        { id: '1', title: 'Camera', icon: icons.camera, route: 'Camera', onpress: () => router.push({ pathname: '/camera'})},
        { id: '2', title: 'Microphone', icon: icons.microphone, route: 'Microphone', onpress: () => router.push({ pathname: '/microphone', params: { id: 1 } })},
        { id: '3', title: 'Vehicle', icon: icons.car, route: 'Vehicle', onpress: () => router.push({ pathname: '/vehicle', params: { id: 1 } })},
        { id: '4', title: 'Destination', icon: icons.destination, route: 'Destination', onpress: () => router.push({ pathname: '/destination', params: { id: 1 } })},
        { id: '5', title: 'manual', icon: icons.manual, route: 'manual', onpress: () => router.push({ pathname: '/choice', params: { id: 1 } })},
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={stylesChoices.button} onPress={item.onpress}>
            <Image source={item.icon} style={stylesChoices.icon} />
        </TouchableOpacity>
    );
    return (
        <View>
            <FlatList
                data={choices}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                style={stylesChoices.choicesContainer}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
            />
        </View>
    );
}

const screenWidth = Dimensions.get('window').width;
const choicesContainerWidth = screenWidth * 0.9;
const choiceButtonWidth = choicesContainerWidth / 5 - 10;
const choiceIconWidth = choiceButtonWidth * 0.5;
const choiceTitleFontSize = screenWidth < 400 ? 12 : 14;

const stylesChoices = {
    choicesContainer: {
        flex: 1,
        borderRadius: 10 / 1.25,
        width: choicesContainerWidth,
        height: choiceButtonWidth * 2 + 20,
        margin: 10
    },
    subTitle: {
        fontSize: choiceTitleFontSize,
    },
    button: {
        width: choiceButtonWidth,
        height: choiceButtonWidth,
        borderRadius: 10 / 1.25,
        borderWidth:  1,
        borderColor: 'black',
        margin: 5,
        padding: 10,
    },
    icon: {
        width: choiceIconWidth,
        height: choiceIconWidth,
        borderRadius: 10 / 1.25,
        margin: 10
    }
};
// export card height
export const choicesContainerHeight = stylesChoices.choicesContainer.height;