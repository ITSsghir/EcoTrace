import { Link, router } from "expo-router";
import { View, Text, Pressable } from "react-native";
import React from "react";



const HomePage = () => {
    return (
        <View>
            <Text>Home Page</Text>
            <Link href="/users/1">
                <Text>Go to User 1</Text>
            </Link>
            <Pressable onPress={() => router.push({
                    pathname: "/users/[id]",
                    params: { id: 2 }

                })
             }
            >
                <Text>Go To User 2</Text>
            </Pressable>
        </View>
    );
};

export default HomePage;