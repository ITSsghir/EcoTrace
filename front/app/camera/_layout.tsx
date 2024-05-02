import { Stack } from "expo-router";
import React from "react";

const CameraLayout = () => {
    return (
        <Stack>
            <Stack.Screen name="[image]" options={{ 
                headerTitle: 'Preview',
            }} />
            
        </Stack>
    );
};

export default CameraLayout;