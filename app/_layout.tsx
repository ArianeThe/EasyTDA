import { AppProvider } from '@/context/AppContext';
import { CategoryProvider } from '@/context/CategoryContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { TaskProvider } from '@/context/TaskContext';
import { TimerProvider } from '@/context/TimerContext';
import { useNotifications } from '@/hooks/useNotifications';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function NotificationInitializer() {
  const { loadNotifications, requestPermissions } = useNotifications();

  useEffect(() => {
    loadNotifications();
    requestPermissions();
  }, [loadNotifications, requestPermissions]);

  return null;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ComicHero: require('../assets/fonts/ComicHero.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AppProvider>
      <TaskProvider>
        <TimerProvider>
          <CategoryProvider>
            <NotificationProvider>
              <NotificationInitializer />
              <StatusBar style="light" />
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(tabs)" />
                <Stack.Screen name="addTask" options={{ presentation: 'modal' }} />
                <Stack.Screen name="focus/[id]" options={{ presentation: 'card' }} />
                <Stack.Screen name="edit-task/[id]" options={{ presentation: 'modal' }} />
                <Stack.Screen name="(modal)" options={{ presentation: 'modal' }} />
              </Stack>
            </NotificationProvider>
          </CategoryProvider>
        </TimerProvider>
      </TaskProvider>
    </AppProvider>
  );
}
