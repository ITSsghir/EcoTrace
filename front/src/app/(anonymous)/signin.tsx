// SignIn Page

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

import { Stack, useRouter } from 'expo-router';
import { useSession } from '../context/ctx';


const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { token } = useSession();

    const router = useRouter();

    const { signIn } = useSession();

    const handleSignIn = async () => {
        await signIn(email, password);
        if (token) {
            router.replace('/home');
        } else {
            router.replace('/signin');
        }
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: '', title: 'signin' }} />
            <Text style={styles.title}>Sign in</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Sign in"
                onPress={() => {
                    handleSignIn(); // Wait for signIn to complete
                    if (token) {
                        router.replace('/home');
                    } else {
                        router.replace('/signin');
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
    },
    input: {
        width: '80%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Signin;