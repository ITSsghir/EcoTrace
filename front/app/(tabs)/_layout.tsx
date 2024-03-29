import { Tabs } from "expo-router"
import React from "react"

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="users/[id]" />
        </Tabs>
    );
}

export default TabsLayout;