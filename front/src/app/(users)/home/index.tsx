import { 
    Stack,
    useRouter 
} from "expo-router";
import { 
    View, 
    Text, 
    TouchableOpacity,
    SafeAreaView,
    LogBox
} from "react-native";
import Balance from "@/components/balance";
import icons from '@/components/icons';
import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";
import React, { useEffect, useState } from "react";
import { useSession } from "@/app/context/ctx";
import Choices from "@/components/choices";
import History from "@/components/history";
import styles from "@/styles/home";

export default function HomePage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { daily_balance, daily_unit, balance, unit } = useSession();

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
        <View style={styles.sidebar}>
            <TouchableOpacity onPress={() => {
                router.push('/manual');
            }}>
                <Text>Manual input</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleSidebar}>
                <Text>Close Sidebar</Text>
            </TouchableOpacity>
            {/* Add more sidebar items here */}
        </View>
    );

    let history = [
        { id: '1', title: 'Activity 1', carbon_footprint: 0 , unit: 'KgCO2e', method: 'Camera' },
        { id: '2', title: 'Activity 2', carbon_footprint: 0 , unit: 'KgCO2e', method: 'Microphone' },
        { id: '3', title: 'Activity 3', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Vehicle' },
        { id: '4', title: 'Activity 4', carbon_footprint: 5 , unit: 'kgCO2e', method: 'Destination' },
        { id: '5', title: 'Activity 5', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Camera' },
        { id: '6', title: 'Activity 6', carbon_footprint: 1 , unit: 'kgCO2e', method: 'Microphone' },
        { id: '7', title: 'Activity 7', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Vehicle' },
        { id: '8', title: 'Activity 8', carbon_footprint: 7 , unit: 'kgCO2e', method: 'Destination' },
        { id: '9', title: 'Activity 9', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Camera' },
        { id: '10', title: 'Activity 10', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Microphone' },
        { id: '11', title: 'Activity 11', carbon_footprint: 3 , unit: 'kgCO2e', method: 'Vehicle' },
        { id: '12', title: 'Activity 12', carbon_footprint: 0 , unit: 'kgCO2e', method: 'Destination' }
    ];    

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
      }, [])

    return (
        <SafeAreaView style={styles.container}>
            {isSidebarOpen && (
                <>
                    <View style={styles.overlay} onTouchStart={closeSidebar} />
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
            <Balance full_name={full_name} balance={balance} daily_balance={daily_balance} unit={unit} daily_unit={daily_unit} />
            <View style={styles.choicesContainer}>
                <Choices />
            </View>
            <History data={history} />
        </SafeAreaView>
    );
};