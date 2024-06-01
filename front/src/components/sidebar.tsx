import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "@/styles/home";

export default function SidebarComponent({ closeSidebar, router }) {
    
    const [showDropdown, setShowDropdown] = useState(true);

    const manualInputOptions = [
        { label: "Food", value: "food" },
        { label: "Destination", value: "destination" },
    ];

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const renderDropdown = () => {
        return (
            <View style={styles.sidebarDropdown}>
                {manualInputOptions.map((option) => (
                    <TouchableOpacity
                        style={styles.sidebarItemMini}
                        key={option.value}
                        onPress={() => router.push(`/manual/${option.value}`)}
                    >
                        <Text style={styles.sidebarItemTextMini}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    return (
        <View style={styles.sidebar}>
            <TouchableOpacity  
                style={styles.sidebarItem}
                onPress={() => {toggleDropdown()} }
            >
                <Text style={styles.sidebarItemText}>Manual input</Text>
            </TouchableOpacity>
            {showDropdown && renderDropdown()}
            <TouchableOpacity
                onPress={closeSidebar}
                style={styles.sidebarItem}
            >
                <Text style={styles.sidebarItemText}>Close Sidebar</Text>
            </TouchableOpacity>
        </View>
    );
}
