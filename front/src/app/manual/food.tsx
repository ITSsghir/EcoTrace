import { View, Text, TextInput, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { Picker } from '@react-native-picker/picker';
import Colors from '@constants/Colors';
import { useRouter } from 'expo-router';

const Food = () => {

    const router = useRouter();

    const SaveData = async () => {
        // Save the data to the server


        // Return to the home page
        router.replace('/home');
    }

    return (
        <View style={styles.container}>
            <Text>Nom</Text>
            <TextInput
            placeholder="Nom du plat"
            style={styles.input} // Apply custom styles for name
            />
            <Text>Description</Text>
            <TextInput
            placeholder="Description du plat"
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.descriptionInput} // Apply custom styles for description
            />
            <Text>Date de consommation</Text>
            <TextInput
            placeholder="Date et heure de consommation"
            style={styles.input} // Apply custom styles for time of consumption
            />
            <Text>Quantité</Text>
            <TextInput
            placeholder="Quantité"
            style={styles.input} // Apply custom styles for quantity
            />
            <Text>Unité</Text>
            <Picker>
                <Picker.Item label="kg" value="kg" />
                <Picker.Item label="g" value="g" />
                <Picker.Item label="L" value="L" />
                <Picker.Item label="mL" value="mL" />
            </Picker>

            <TouchableOpacity onPress={() => { SaveData() }} style={styles.btn}>
                <Text style={{ color: Colors.primary }}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

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

export default Food;
