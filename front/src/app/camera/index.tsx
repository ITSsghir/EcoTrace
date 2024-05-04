import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";
import CameraView from "@/components/camera";
import icons from "@constants/icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native";

export default function CameraPage() {

    const router = useRouter();

    return (
        <CameraView>
        </CameraView>
    );
}