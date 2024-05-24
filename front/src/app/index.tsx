import React from 'react';
import { Redirect } from 'expo-router';
import { useSession } from '@/context/ctx';
import LoadingScreen from '@constants/loading';

export default function App() {

  const { token, isLoading } = useSession();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    token ? <Redirect href='/home'/> : <Redirect href="/choice" />
  );
}