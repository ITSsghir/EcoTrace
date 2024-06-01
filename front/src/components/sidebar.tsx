import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/home";

export default function SidebarComponent({ full_name, closeSidebar, router }) {
    
    const [showDropdown, setShowDropdown] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Home');

    const styleClicked = [styles.sidebarItemClicked];

    const styleNotClicked = [styles.sidebarItem];

    const manualInputOptions = [
        { label: "Food", value: "food" },
        { label: "Destination", value: "destination" },
        { label: "Clothing", value: "clothing"},
    ];

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const onUpdatePress = () => {
        // Navigate to the profile page (not implemented yet)
        //router.push('/profile');
    }

    const onDeletePress = () => {
        // Handle delete account using the API (through ctx)
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
            <Text style={styles.miniTitle}>Welcome back {full_name}!</Text>
            <TouchableOpacity
                onPress={() => {
                    setSelectedOption('Home');
                    router.push('/')
                }}
                style={
                    selectedOption === 'Home' ? styleClicked : styleNotClicked
                }
            >
                <Text style={styles.sidebarItemText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={selectedOption === 'Manual' ? styleClicked : styleNotClicked}
                onPress={() => {
                    setSelectedOption('Manual');
                    toggleDropdown();
                }}
            >
                <Text style={styles.sidebarItemText}>Manual input</Text>
            </TouchableOpacity>
            {showDropdown && renderDropdown()}
            <TouchableOpacity 
                style={selectedOption === 'Update' ? styleClicked : styleNotClicked}
                onPress={() => {
                    setSelectedOption('Update');
                    onUpdatePress();
                }}
            >
                <Text style={styles.sidebarItemText}>Update Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={selectedOption === 'Delete' ? styleClicked : styleNotClicked}
                onPress={
                    () => {
                        setSelectedOption('Delete');
                        onDeletePress();
                    }
                }
            >
                <Text style={styles.sidebarItemText}>Delete Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={closeSidebar}
                style={styles.sidebarItem}
            >
                <Text style={styles.sidebarItemText}>Close Sidebar</Text>
            </TouchableOpacity>
        </View>
    );
}
