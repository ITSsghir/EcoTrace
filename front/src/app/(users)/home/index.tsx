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
import SidebarComponent from "@/components/sidebar";

export default function HomePage() {
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { daily_balance, daily_unit, balance, unit, history } = useSession();

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

    let historyJSON = JSON.parse(history);

    // const { history } = useSession();

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
      }, [])

    return (
        <SafeAreaView style={styles.container}>
            {isSidebarOpen && (
                <>
                    <View style={styles.overlay} onTouchStart={closeSidebar} />
                    <SidebarComponent closeSidebar={closeSidebar} router={router} full_name={full_name} handleSignOut={handleSignOut} />
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
                                router.push('/profile')
                            }}
                        />
                    )
                }}
            
            />
            <Balance full_name={full_name} balance={balance} daily_balance={daily_balance} unit={unit} daily_unit={daily_unit} />
            <View style={styles.choicesContainer}>
                <Choices />
            </View>
            <History data={historyJSON} />
        </SafeAreaView>
    );
};