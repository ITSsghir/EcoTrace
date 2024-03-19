import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 10,
        borderRadius: 10 / 1.25,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        margin: 15,
        marginBottom: 20
    },
    subTitle: {
        fontSize: 18,
    },
    btnContainer: {
        width: 60,
        height: 60,
        borderRadius: 10 / 1.25,
        justifyContent: "center",
        alignItems: "center",
    },
    subSubTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "right"
    }
});

const History = () => {

    let history = [
        { id: '1', title: 'Activity 1', carbon_footprint: 'xxxxxxCO2', method: 'Camera' },
        { id: '2', title: 'Activity 2', carbon_footprint: 'xxxxxxCO2', method: 'Microphone' },
        { id: '3', title: 'Activity 3', carbon_footprint: 'xxxxxxCO2', method: 'Vehicle' },
        { id: '4', title: 'Activity 4', carbon_footprint: 'xxxxxxCO2', method: 'Destination' },
        { id: '5', title: 'Activity 5', carbon_footprint: 'xxxxxxCO2', method: 'Camera' },
        { id: '6', title: 'Activity 6', carbon_footprint: 'xxxxxxCO2', method: 'Microphone' },
        { id: '7', title: 'Activity 7', carbon_footprint: 'xxxxxxCO2', method: 'Vehicle' },
        { id: '8', title: 'Activity 8', carbon_footprint: 'xxxxxxCO2', method: 'Destination' },
        { id: '9', title: 'Activity 9', carbon_footprint: 'xxxxxxCO2', method: 'Camera' },
        { id: '10', title: 'Activity 10', carbon_footprint: 'xxxxxxCO2', method: 'Microphone' },
        { id: '11', title: 'Activity 11', carbon_footprint: 'xxxxxxCO2', method: 'Vehicle' },
        { id: '12', title: 'Activity 12', carbon_footprint: 'xxxxxxCO2', method: 'Destination' }
    ];
    return (
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={()=>{}}>
                <Text style={styles.title}>History</Text>
                <FlatList
                data={history}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{ flex: 1, justifyContent: 'space-between', margin: 20, borderColor: '#000000', borderBottomWidth: 2, paddingBottom: 10, marginTop: 5 }}>
                        <Text style={styles.subTitle}>{item.title}</Text>
                        <Text style={styles.subSubTitle}>{item.carbon_footprint}</Text>
                        <Text style={styles.subSubTitle}>{item.method}</Text>
                    </View>
                )}
                />
                </TouchableOpacity>
            </ScrollView>
    )
}

export default History;