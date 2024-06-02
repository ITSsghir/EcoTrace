import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import styles from '@/styles/history';

export default function History({data}) {

    const router = useRouter();

    const renderItem = (data) => {
        return data.map((item, index) => {
            return (
                <View style={styles.activity} key={index}>
                    <Text style={styles.subTitle}>{item.name}</Text>
                    <Text style={styles.subSubTitle}>{item.carbon_footprint} {item.unit}</Text>
                    <Text style={styles.subSubTitle}>{item.activity_type}</Text>
                </View>
            )
        });
    };


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
                {renderItem(data)}
                </TouchableOpacity>
            </ScrollView>
    );
}