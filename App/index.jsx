import { useState } from 'react';
import { View, ScrollView, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';

import ScreenHeaderBtn from './components/ScreenHeaderBtn';

import images from '../constants/images';
import Welcome from './components/Welcome';

const Home = () => {
    const router = useRouter();

    const options = ['Take a picture', "Upload a picture", 'Set itinerary', 'Manual input']

    return (
       <SafeAreaView style={{ flex: 1, backgroundColor: '#00BF63' }}>
        <Stack.Screen
          options={{
            headerStyle: { backgroundColor: '#00BF63' },
            headerShadowVisible: false,
            headerTitle: '',
            headerLeft: () =>(
                <ScreenHeaderBtn 
                    iconUrl={images.menu} 
                    dimension={40}
                />
            ),
            headerRight: () => (
                <ScreenHeaderBtn 
                    iconUrl={images.profile} 
                    dimension={40}
                />
            )
          }}
        />
        <ScrollView showsHorizontalScrollIndicator={false}>
            <View style={{ flex: 1, backgroundColor: '#00BF63'}} >
                <Welcome dimension='60' />
            </View>
        </ScrollView>
       </SafeAreaView>
    );
}

export default Home;