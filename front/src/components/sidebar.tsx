import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "@/styles/home";

export default function SidebarComponent({ full_name, closeSidebar, router, handleSignOut }) {
    
    const [showDropdown, setShowDropdown] = useState(true);
    const [selectedOption, setSelectedOption] = useState('Home');

    const styleClicked = [styles.sidebarItemClicked];

    const styleNotClicked = [styles.sidebarItem];

    const manualInputOptions = [
        { label: "Food", value: "food" },
        { label: "Destination", value: "destination" },
        { label: "Clothes", value: "clothes"},
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
                style={selectedOption === 'Services' ? styleClicked : styleNotClicked}
                onPress={() => {
                    setSelectedOption('Services');
                    router.push('/services');
                }}
            >
                <Text style={styles.sidebarItemText}>My Services</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={selectedOption === 'Account' ? styleClicked : styleNotClicked}
                onPress={() => {
                    setSelectedOption('Account');
                    router.push('/profile');
                }}
            >
                <Text style={styles.sidebarItemText}>Account</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={selectedOption === 'Settings' ? styleClicked : styleNotClicked}
                onPress={
                    () => {
                        setSelectedOption('Settings');
                        router.push('/settings');
                    }
                }
            >
                <Text style={styles.sidebarItemText}>Settings & Help</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.sidebarItem}
            >
                <Text style={styles.sidebarItemText}>Log out</Text>
            </TouchableOpacity>
        </View>
    );
}
