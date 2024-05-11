import { useSession } from "@/app/context/ctx";
import { Slot, Stack } from "expo-router";
import React from "react";
import { Redirect } from "expo-router";
import { Text } from "react-native";
import LoadingScreen from "@constants/loading";

export default function WelcomeLayout() {
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
    return (
      <Slot />
    );
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Redirect href="/home" />
  );
}