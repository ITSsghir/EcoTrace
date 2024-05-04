// Register page for anonymous users to create an account (react-native)

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSession } from '../context/ctx';

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const { token, signUp } = useSession();

    const handleSignUp = async () => {
        await signUp(fullName, email, phoneNumber, password);
        if (token) {
            router.replace('/home');
        } else {
            router.replace('/');
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerTitle: '' }} />
            <Text style={styles.title}>Create an account</Text>
            <TextInput
                style={styles.input}
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button
                title="Sign up"
                onPress={() => {
                    handleSignUp(); // Wait for signUp to complete
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
        padding: 8,
        marginBottom: 16,
        borderWidth: 1,
    },
});

export default Signup;