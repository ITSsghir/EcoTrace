// SignIn Page

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { Stack, useRouter } from 'expo-router';
import styles from '@/styles/auth';
import { useSession } from '@/context/ctx';


const Signin = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const { token } = useSession();

    const router = useRouter();

    const { signIn } = useSession();

    const handleSignIn = async () => {
        await signIn(email, password);
        if (token) {
            router.replace('/home');
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
                onPress={() => { handleSignIn() }}
            />
        </View>
    );
}

export default Signin;