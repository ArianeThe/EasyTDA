import React from 'react';
import { Slot } from 'expo-router';

export default function AppNavigator() {
  // Expose Expo Router's Slot inside the global providers (see app/_layout.tsx)
  return <Slot />;
}

