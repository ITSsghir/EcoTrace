import { Stack, Redirect } from "expo-router";
import React from "react"
import { useSession } from "@/app/context/ctx";
import LoadingScreen from "@constants/loading";

export default function HistoryLayout() {
    const { token, isLoading } = useSession();

    // You can keep the splash screen open, or render a loading screen like we do here.
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Only require authentication within the (app) group's layout as users
    // need to be able to access the (auth) group and sign in again.
    if (!token) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
        return <Redirect href="/signin" />;
    }

    // This layout can be deferred because it's not the root layout.
    return (
        <Stack />
    );
}