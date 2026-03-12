import { Stack } from 'expo-router';

export default function ModalLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                presentation: 'modal',
                animation: 'slide_from_bottom',
                contentStyle: { backgroundColor: 'white' }, // Assure un fond blanc
            }}
        >
            <Stack.Screen name="addTask" />
            <Stack.Screen name="notifications" />
            <Stack.Screen name="categories" />
        </Stack>
    );
}
