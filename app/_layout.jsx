import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useContext } from "react";
import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import { GlobalProvider, GlobalContext } from "../context/GlobalPRovider"; // Ensure correct file path and casing

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <GlobalProvider>
      <RootStack />
    </GlobalProvider>
  );
};

// Separate stack navigation logic into its own component
const RootStack = () => {
  const { user, isLoading } = useContext(GlobalContext); // Now it's inside the provider

  if (isLoading) {
    return null; // Or a loading spinner/screen
  }

  return (
    <Stack>
      
        <Stack.Screen name="index" options={{ headerShown: false}} />
        <Stack.Screen name="/home" options={{ headerShown: false }} />
      <Stack.Screen name="(form)" options={{ headerShown: false }} />
      <Stack.Screen name="(navigation)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;
