import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { useSession } from '@/app/context/ctx';

const update = () => {
    const { full_name, email, phone_number, password } = useSession();

    const [newName, setNewName] = React.useState(full_name);
    const [newEmail, setNewEmail] = React.useState(email);
    const [newPhoneNumber, setNewPhoneNumber] = React.useState(phone_number);
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');


    const router = useRouter();

    const { updateUser } = useSession();

    const saveProfile = async () => {
        const data = {
            full_name: newName,
            email: newEmail,
            phone_number: newPhoneNumber,
            password: newPassword,
            confirmPassword: confirmPassword
        };
        // Save the data to the server
        console.log('Name:', newName);
        console.log('Email:', newEmail);
        console.log('Phone Number:', newPhoneNumber);
        console.log('Password:', newPassword);
        console.log('Confirm Password', confirmPassword);

        // Save the data to the server
        await updateUser(data);
        router.replace('/profile');
    }

    // This component will be used to update the user's profile
    return (
        <View style={styles.container}>
            <Text>User Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setNewName}
                value={full_name}
            />
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={setNewEmail}
                value={email}
            />
            <Text>Phone Number</Text>
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                onChangeText={setNewPhoneNumber}
                value={phone_number}
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={setNewPassword}
            />
            <Text>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                onChangeText={setConfirmPassword}
            />

            <TouchableOpacity onPress={() => {saveProfile();}} style={styles.btn}>
                <Text>Save</Text>
            </TouchableOpacity>
        </View>

    )
}

export default update

const styles = StyleSheet.create({
    container: {
        padding: 16, // Adjust padding as needed
    },
    descriptionInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
        marginBottom: 8,
        height: 120,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginTop: 8,
        marginBottom: 8,
    },
    btn: {
        backgroundColor: 'blue',
        color: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '50%',
        alignItems: 'center',
        marginLeft: '25%',
        marginRight: '25%',
    },
});