import { Link, Stack } from "expo-router";
import { Dimensions, Pressable, Text, View } from "react-native";
import React from "react";
import { Background } from "@/components/background";

export default function Welcome() {
    return (
            <Background>
                <View style={welcomeStyles.bigContainer}>
                    <Text style={welcomeStyles.title}>Welcome to the app!</Text>
                    <View style={welcomeStyles.container}>
                        <Link href="/signin" style={welcomeStyles.btn}>
                            <Pressable>
                                <Text style={welcomeStyles.btnText}>Sign in</Text>
                            </Pressable>
                        </Link>
                        <Link href="/signup" style={welcomeStyles.btn}>
                            <Pressable>
                                <Text style={welcomeStyles.btnText}>Sign up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </Background>
    );
}


const width = Dimensions.get('window').width;

const welcomeStyles = {
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        marginRight: width * 0.1,
        marginLeft: width * 0.1,
    },
    bigContainer: {
        flex: 1,
        marginTop: width /2
    },
    btn:{
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        marginRight: width * 0.1,
        marginLeft: width * 0.1,
        marginTop: 10,
        marginBottom: 10,
        width: width * 0.8,
        borderRadius: 5,
    },
    btnText: {
        color: 'white'
    }
};