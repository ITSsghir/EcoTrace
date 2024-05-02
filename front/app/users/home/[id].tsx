import { 
    Stack, 
    router,
    useRouter 
} from "expo-router";
import { Image, 
    View, 
    Text, 
    TouchableOpacity, 
    FlatList, 
    StyleSheet, 
    SafeAreaView, 
    Dimensions, 
    ScrollView 
} from "react-native";
import Balance, { balanceHeight } from "../balance/[id]";
import icons from '@/constants/icons';
import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";
import React from "react";

const screenHeight = Dimensions.get('window').height;

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
            <View style={stylesHome.choicesContainer}>
                <FlatList
                        data={choices}
                        keyExtractor={item => item.id}
                        numColumns={4}
                        renderItem={renderItem}
                />
            </View>
            <History />
        </SafeAreaView>
    );
};
const screenWidth = Dimensions.get('window').width;
const choicesContainerWidth = screenWidth * 0.9;
const choiceButtonWidth = choicesContainerWidth / 4 - 10;
const choiceIconWidth = choiceButtonWidth * 0.5;
// Dynamic font sizes based on screen width
const choiceTitleFontSize = screenWidth < 400 ? 12 : 14;

export function History() {

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
                            console.log('History clicked')
                            router.push('/users/history/[id]')
                        }
                    }
                >
                <Text style={stylesHistory.title}>History</Text>
                <FlatList
                    data={history}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />
                </TouchableOpacity>
            </ScrollView>
    )
}

const stylesHome = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    choicesContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        borderRadius: 10 / 1.25,
        width: choicesContainerWidth,
        height: choiceButtonWidth * 2 + 20,
        margin: 10
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    subTitle: {
        fontSize: choiceTitleFontSize,
    },
    button: {
        width: choiceButtonWidth,
        height: choiceButtonWidth,
        borderRadius: 10 / 1.25,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:  1,
        borderColor: 'black',
        borderStyle: 'solid',
        margin: 5
    },
    icon: {
        width: choiceIconWidth,
        height: choiceIconWidth,
        borderRadius: 10 / 1.25,
    }
});

const choicesContainerHeight = stylesHome.choicesContainer.height;
const stylesHistory = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 0,
        borderRadius: 10 / 1.25,
        width: screenWidth - 10,
        padding: 10,
        marginTop: '-95%'
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
