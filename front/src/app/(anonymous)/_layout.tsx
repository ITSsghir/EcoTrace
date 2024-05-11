import { Redirect, Stack } from 'expo-router';
import { useSession } from '../context/ctx';
import React from 'react';
import LoadingScreen from '@constants/loading';

export default function AnonymousLayout() {
  const {token, isLoading } = useSession();

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