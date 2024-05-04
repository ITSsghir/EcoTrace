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
    ScrollView, 
    LogBox
} from "react-native";
import Balance, { balanceContainerHeight } from "@/components/balance";
import icons from '@/constants/icons';
import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";
import React, { useEffect } from "react";
import { useSession } from "@/app/context/ctx";
import Choices, { choicesContainerHeight } from "@/components/choices";

export default function HomePage() {
    const router = useRouter();

    let full_name = 'Demo user'; // Get from context later
    let balance = 'xxxxxx'; // Get from context later
    let daily_balance = 'xxxxxx'; // Get from context later

    const { signOut } = useSession();
    // Sign out function
    const handleSignOut = () => {
        signOut();
        router.push('/');
    }


    // Camera route will pop up a modal with two options: take a picture or choose from gallery
    const choices = [
        { id: '1', title: 'Camera', icon: icons.camera, route: 'Camera', onpress: () => router.push({ pathname: '/camera'})},
        { id: '2', title: 'Microphone', icon: icons.microphone, route: 'Microphone', onpress: () => router.push({ pathname: '/microphone', params: { id: 1 } })},
        { id: '3', title: 'Vehicle', icon: icons.car, route: 'Vehicle', onpress: () => router.push({ pathname: '/vehicle', params: { id: 1 } })},
        { id: '4', title: 'Destination', icon: icons.destination, route: 'Destination', onpress: () => router.push({ pathname: '/destination', params: { id: 1 } })},
    ];

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

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
                            handlePress={() => {
                                handleSignOut()
                            }}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn 
                            iconUrl={icons.profile} 
                            dimension={40}
                            handlePress={() => {
                                handleSignOut()
                            }}
                        />
                    )
                }}
            
            />
            <Balance full_name={full_name} balance={balance} daily_balance={daily_balance} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Choices />
            </View>
            <History />
        </SafeAreaView>
    );
};

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
                            router.push('/history')
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
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    }
});

const screenWidth = Dimensions.get('window').width;
// Get the height of the choices component
const balanceContainerHeightNet = balanceContainerHeight - 20;
const choicesContainerHeightNet = choicesContainerHeight - 20;
const historyContainerHeightNet = screenWidth - balanceContainerHeightNet - choicesContainerHeightNet;

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
