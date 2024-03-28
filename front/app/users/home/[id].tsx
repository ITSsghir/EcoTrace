import { Link, Stack, router, useRouter } from "expo-router";
import { Image, View, Text, Pressable, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Dimensions, ScrollView } from "react-native";
import Balance from "../balance/[id]";
import History from "./history[id]";
import icons from '@/constants/icons';
import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";

export default function HomePage() {
    const router = useRouter();

    let username = 'User' // Get username from the server via API call

    // Camera route will pop up a modal with two options: take a picture or choose from gallery
    const choices = [
        { id: '1', title: 'Camera', icon: icons.camera, route: 'Camera', onpress: () => router.push({ pathname: '/camera/[id]', params: { id: 1 } })},
        { id: '2', title: 'Microphone', icon: icons.microphone, route: 'Microphone', onpress: () => router.push({ pathname: '/microphone', params: { id: 1 } })},
        { id: '3', title: 'Vehicle', icon: icons.car, route: 'Vehicle', onpress: () => router.push({ pathname: '/vehicle', params: { id: 1 } })},
        { id: '4', title: 'Destination', icon: icons.destination, route: 'Destination', onpress: () => router.push({ pathname: '/destination', params: { id: 1 } })},
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={stylesHome.button} onPress={item.onpress}>
            <Image source={item.icon} style={stylesHome.icon} />
            <Text style={stylesHome.subTitle}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={stylesHome.container}>
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: '#f0f0f0',
                    },
                    headerShadowVisible: false,
                    headerShown: true,
                    headerTitle: '',
                    headerLeft: () =>(
                        <ScreenHeaderBtn 
                            iconUrl={icons.menu} 
                            dimension={40}
                            handlePress={() => {}}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.profile} 
                            dimension={40}
                            handlePress={() => {}}
                        />
                    )
                }}
            
            />
            <Balance />
            <ScrollView style={
                {
                    flex: 1,
                    flexDirection: "row", 
                    flexWrap: "wrap",
                    borderRadius: 10 / 1.25,
                }
            }
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            >
                <FlatList
                        data={choices}
                        keyExtractor={item => item.id}
                        numColumns={4}
                        renderItem={renderItem}
                />
            </ScrollView>
            <History />
        </SafeAreaView>
    );
};
const screenHeight = Dimensions.get('window').height;


const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: 15,
    },
    button: {
        width: 90,
        height: 90,
        borderRadius: 10 / 1.25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:  1,
        borderColor: 'black',
        borderStyle: 'solid',
        margin: 5
    },
    icon: {
        width: 45,
        height: 45,
        borderRadius: 10 / 1.25,
    }
});