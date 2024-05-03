import CameraView from "@/components/camera";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function CameraPage() {

    return (
        <SafeAreaView>
            <Stack.Screen options={{ headerTitle: 'Camera' }} />
            <CameraView />
        </SafeAreaView>
    );
}