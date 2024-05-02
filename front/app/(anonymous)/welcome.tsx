import { Redirect, Stack, useRouter } from "expo-router";
import { Button, Dimensions, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Background } from "@/components/background";

export default function Welcome() {

    const router = useRouter();

    return (
            <Background style={{ flex: 1}}>
                <View style={welcomeStyles.bigContainer}>
                    <Text>Welcome to the app!</Text>
                    <View style={welcomeStyles.container}>
                        <TouchableOpacity
                            style={welcomeStyles.btn}
                            onPress={() => router.push('/signin')}
                        >
                            <Text style={welcomeStyles.btnText}>Sign in</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={welcomeStyles.btn}
                            onPress={() => router.push('/signup')}
                        >
                            <Text style={welcomeStyles.btnText}>Don't have an account?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Background>
    );
}


const width = Dimensions.get('window').width;

const welcomeStyles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bigContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    btn:{
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        margin: 10,
        width: width * 0.8 / 2,
        borderRadius: 5
    },
    btnText: {
        color: 'white',
        textAlign: 'center'
    }
};