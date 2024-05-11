import { Redirect, Slot, Stack, useRouter } from 'expo-router';
import { useSession } from '../context/ctx';
import React from 'react';
import LoadingScreen from '@constants/loading';
import { Header } from 'react-native/Libraries/NewAppScreen';

export default function AnonymousLayout() {
  const {token, isLoading } = useSession();

  const router = useRouter();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!token) {
    return (
        <Stack>
          <Stack.Screen name="welcome" options={{ headerShown: false }}/>
        </Stack>
    );
  }

  return <Redirect href="/home" />;
}