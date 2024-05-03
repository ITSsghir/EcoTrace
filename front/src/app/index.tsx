import React from 'react';
import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useSession } from './context/ctx';
import HomePage from './(users)/home';

export default function App() {

  const { token, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    token ? <HomePage /> : <Redirect href="/welcome" />
  );
}