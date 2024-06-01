import { useSession } from "@/app/context/ctx";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { Redirect } from "expo-router";
import LoadingScreen from "@/components/loading";
import ScreenHeaderBtn from "@/components/ScreenHeaderBtn";
import icons from "@/components/icons";

export default function HomeLayout() {
  const { token, isLoading } = useSession();
  const router = useRouter();

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
    <Stack>
        <Stack.Screen name="food" options={{
            headerTitle: 'Manual Input - Food',
            headerShown: true,
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => {
                return (
                  <ScreenHeaderBtn 
                    iconUrl={icons.back} handlePress={() => {
                        router.back();
                    }} 
                    dimension={30} 
                  />
                );
            }
        }} />
    </Stack>
  );
}