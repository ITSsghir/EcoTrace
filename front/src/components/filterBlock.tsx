import Filter from "@constants/filter";
import { SafeAreaView, ViewStyle } from "react-native";
import React from "react";

export default function FilterBlock ({ filter, setFilter }) {

    const styles = {
        filterBlock: {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            margin: 10,
        } as ViewStyle,
    };

    return (
        <SafeAreaView style={styles.filterBlock}>
            <Filter
                onPress={() => setFilter("High")}
                active={filter === "High"}
                title="High"
                color="#000"
            />
            <Filter
                onPress={() => setFilter("Medium")}
                active={filter === "Medium"}
                title="Medium"
                color="#00f"
            />
            <Filter
                onPress={() => setFilter("Low")}
                active={filter === "Low"}
                title="Low"
                color="#0f0"
            />
        </SafeAreaView>
    );
};