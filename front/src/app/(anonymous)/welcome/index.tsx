import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import React from "react";
import { Background } from "@/components/background";
import styles from "@/styles/welcome";

export default function Welcome() {
    return (
            <Background>
                <View style={styles.bigContainer}>
                    <Text style={styles.title}>Welcome to the app!</Text>
                    <View style={styles.container}>
                        <Link href="/signin" style={styles.btn}>
                            <Pressable>
                                <Text style={styles.btnText}>Sign in</Text>
                            </Pressable>
                        </Link>
                        <Link href="/signup" style={styles.btn}>
                            <Pressable>
                                <Text style={styles.btnText}>Sign up</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </Background>
    );
}