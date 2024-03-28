import { Stack } from "expo-router"

const HistoryLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="[id]" options={{ headerShown: false }} />
        </Stack>
    );
};

export default HistoryLayout;