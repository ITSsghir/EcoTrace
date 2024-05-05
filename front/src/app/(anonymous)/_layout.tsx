import { Redirect, Slot, Stack, useRouter } from 'expo-router';
import { Text } from 'react-native';
import { useSession } from '../context/ctx';
import React from 'react';
import HomePage from '@/app/(users)/home';
import LoadingScreen from '@constants/loading';

export default function AnonymousLayout() {
  const {token, isLoading } = useSession();

  const router = useRouter();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!token) {
    return (
        <Stack />
    );
  }

  return <Redirect href="/home" />;
}