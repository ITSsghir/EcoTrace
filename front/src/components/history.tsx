import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, ScrollView, TouchableOpacity, Image } from 'react-native';
import styles from '@/styles/history';
import icons from '@/components/icons';

export default function History({data}) {

    const router = useRouter();

    const renderItem = (data) => {
        if (!data) {
            return <Text>No data</Text>
        }
        // For each activity, render the activity
        if (data.length === 0) {
            return (
                <Text style={styles.noActivitiesTitle}>No carbon footprint activities</Text>
            );
        }
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
        <TouchableOpacity
            onPress= {
                () => {
                    router.push('/history')
                }
            }
            style={styles.homeContainer}
        >
            <ScrollView showsVerticalScrollIndicator={false} horizontal={false}>
                <View style={styles.titleContainer}>
                    <Image source={icons.history} style={styles.icon} />
                    <Text style={styles.title}>
                        History
                    </Text>
                </View>
                {renderItem(data)}
            </ScrollView>
        </TouchableOpacity>
    );
}