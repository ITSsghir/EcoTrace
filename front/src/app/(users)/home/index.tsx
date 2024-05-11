import { 
    Stack, 
    router,
    useRouter 
} from "expo-router";
import { 
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
import Balance from "@/components/balance";
import icons from '@/constants/icons';
import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";
import React, { useEffect, useState } from "react";
import { useSession } from "@/app/context/ctx";
import Choices from "@/components/choices";

// Get the screen width
const screenWidth = Dimensions.get('window').width;

export default function HomePage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    let balance = 'xxxxxx'; // Get from context later
    let daily_balance = 'xxxxxx'; // Get from context later

    const { full_name, signOut } = useSession();
    // Sign out function
    const handleSignOut = () => {
        signOut();
        router.push('/');
    }

    // Close sidebar
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    }

    // Toggle sidebar
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    // Sidebar content
    const Sidebar = (
        <View style={stylesHome.sidebar}>
            <TouchableOpacity onPress={toggleSidebar}>
                <Text>Close Sidebar</Text>
            </TouchableOpacity>
            {/* Add more sidebar items here */}
        </View>
    );

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
      }, [])

    return (
        <SafeAreaView style={stylesHome.container}>
            {isSidebarOpen && (
                <>
                    <View style={stylesHome.overlay} onTouchStart={closeSidebar} />
                    {Sidebar}
                </>
            )}
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
                                toggleSidebar()
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
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sidebar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 4/6 * screenWidth,
        backgroundColor: '#fff',
        zIndex: 6,
        padding: 20,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust opacity as needed
        zIndex: 5, // Render behind the sidebar
    },
});

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
