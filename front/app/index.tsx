import React from "react";
import HomePage from "./users/home";
import Welcome from "./(anonymous)/welcome";
import { View } from "react-native";


export default function App() {
  const useAuth = true;
  return (
    <>
      {useAuth ? <HomePage /> : <Welcome />}
    </>
  );
}