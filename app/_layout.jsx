import { View, Text } from 'react-native'
import React from 'react'
import { SplashScreen, Stack } from 'expo-router'
import "../global.css";
import  { useEffect } from 'react';
import { useFonts } from 'expo-font';
import  _layoutDrawer  from './(drawer)/_layoutDrawer.jsx';
import _layoutTab from './(tabs)/_layoutTab.jsx';

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
    }, [fontsLoaded, error])

  if (!fontsLoaded && !error) { return null;}

  return (
    <>
    <View> <_layoutDrawer /> </View>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(form)" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
      </Stack>
      <View> <_layoutTab /></View>
    </>
  );
};

export default RootLayout