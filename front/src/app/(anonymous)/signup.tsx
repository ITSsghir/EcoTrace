import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useSession } from '@/context/ctx';
import styles from '@/styles/auth';

const Signup = () => {
    const [fullName, setFullName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [password, setPassword] = React.useState('');

    const router = useRouter();

    const { token, signUp } = useSession();

    const handleSignUp = async () => {
        await signUp(fullName, email, phoneNumber, password);
        if (token) {
            router.replace('/home');
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
                onPress={() => { handleSignUp() }}
            />
        </View>
    );
}

export default Signup;