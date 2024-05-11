import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';

export default function History({data}) {

    const router = useRouter();

    const renderItem = ({ item }) => (
        <View style={{ flex: 1, justifyContent: 'space-between', margin: 20, borderColor: '#000000', borderBottomWidth: 2, paddingBottom: 10, marginTop: 5 }}>
            <Text style={stylesHistory.subTitle}>{item.title}</Text>
            <Text style={stylesHistory.subSubTitle}>{item.carbon_footprint}</Text>
            <Text style={stylesHistory.subSubTitle}>{item.method}</Text>
        </View>
    );


    return (
            <ScrollView style={stylesHistory.container} showsVerticalScrollIndicator={false} horizontal={false}>
                <TouchableOpacity
                    onPress= {
                        () => {
                            router.push('/history')
                        }
                    }
                >
                <Text style={stylesHistory.title}>History</Text>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                </TouchableOpacity>
            </ScrollView>
    )
}

const screenWidth = Dimensions.get("window").width;

const stylesHistory = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        borderRadius: 10 / 1.25,
        width: screenWidth * 0.9,
        padding: 20,
        margin: 10,
        height: screenWidth * 19/20
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
