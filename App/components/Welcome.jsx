import { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';
import { useRouter } from 'expo-router';

// Create a stylesheet for the choices grid (fit to the screen size, 4 columns, 1 row, and each button is a square, and make the buttons centered and small, and below each icon, there is a title, and the title is centered and a medium size)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 18,
    },
    button: {
        width: 90,
        height: 90,
        borderRadius: 10 / 1.25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:  1,
        borderColor: 'black',
        borderStyle: 'solid',
        margin: 5
    },
    icon: {
        width: 45,
        height: 45,
        borderRadius: 10 / 1.25,
    }
});

import Balance from './subcomponents/balance';
import History from './history';

const Welcome = () => {

    const router = useRouter();

    let username = 'User' // Get username from the server via API call

    // Camera route will pop up a modal with two options: take a picture or choose from gallery
    const picture_choices = [
        { id: '1', title: 'Camera', icon: require('../../assets/images/camera.png'), route: 'Camera' , options: [{ sub_id : 1, title: 'Take a picture' }, { sub_id : 2, title: 'Choose from gallery' }] },
        { id: '2', title: 'Microphone', icon: require('../../assets/images/mic.png'), route: 'Microphone'},
        { id: '3', title: 'Vehicle', icon: require('../../assets/images/car.png'), route: 'Vehicle'},
        { id: '4', title: 'Destination', icon: require('../../assets/images/destination.png'), route: 'Destination'}
    ];

    return (
        <View>
            <Balance />
                {/*
                Create a grid of buttons for the user to choose from (4 buttons, each with an icon and a title, on the same row, and each button is a square, and make the buttons centered and small, and below each icon, there is a title, and the title is centered and a medium size)
                Center the grid in the middle of the screen
                */}
            <View style={ styles.container }>
                <FlatList
                    data={picture_choices}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {}}
                        >
                            <Image
                                source={item.icon}
                                style={styles.icon}
                            />
                            <Text style={{ marginTop: 5, fontWeight: 'bold' }}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    horizontal
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
                />
            </View>
            <History />
        </View>
    );
}

export default Welcome;