import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import styles from '@/styles/history';

export default function History({data}) {

    const router = useRouter();

    const renderItem = ({ item }) => (
        <View style={{ flex: 1, justifyContent: 'space-between', margin: 20, borderColor: '#000000', borderBottomWidth: 2, paddingBottom: 10, marginTop: 5 }}>
            <Text style={styles.subTitle}>{item.title}</Text>
            <Text style={styles.subSubTitle}>{item.carbon_footprint + ' ' + item.unit}</Text>
            <Text style={styles.subSubTitle}>{item.method}</Text>
        </View>
    );


    return (
            <ScrollView style={styles.homeContainer} showsVerticalScrollIndicator={false} horizontal={false}>
                <TouchableOpacity
                    onPress= {
                        () => {
                            router.push('/history')
                        }
                    }
                >
                <Text style={styles.title}>History</Text>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                </TouchableOpacity>
            </ScrollView>
    )
}