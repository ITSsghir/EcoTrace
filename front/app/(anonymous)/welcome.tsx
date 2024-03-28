import { Stack, useRouter } from "expo-router";
import { Image, SafeAreaView, Text, View, useWindowDimensions } from "react-native";

// Solid color background: #f0f0f0
const Background = () => {

    const { width, height } = useWindowDimensions();

    return (
        <View style={{ width, height, backgroundColor: "#f0f0f0" }} />
    );
}

export default function Welcome() {

    const router = useRouter();

    return (
        <SafeAreaView>
            <Background/>
        </SafeAreaView>
    );
}