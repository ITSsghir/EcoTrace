import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Dimensions, Image, ImageURISource, SafeAreaView, Text, View } from "react-native";

export default function Preview() {

    // Get the image from the camera(passed as a params from the camera component via the router)
    const router = useRouter();
    const params = useLocalSearchParams();

    // Get the image from the params
    const image : string = params.image as string;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', padding: 10, marginTop: 20 }}>
                </View>
                <Image source={{ uri: image }} style={styles.imagePreview} />
                
            </View>
        </SafeAreaView>
    );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = {
    container: {
        flex: 1,
    },
    
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 3 / 4,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    subTitle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    imagePreview: {
        width: width,
        height: height * 0.7,
    }
};