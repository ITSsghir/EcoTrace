import { Slot, Stack } from 'expo-router';
import { SessionProvider } from './context/ctx';
import React from 'react';

export default function RootLayout() {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
