import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { images } from "../constants";
import SignIn from "./(form)/SignIn";
import SignUp from "./(form)/SignUp";
import { Link } from "expo-router";

export default function App() {
  
  const [showSignIn, setShowSignIn] = useState(true); // State to toggle between SignIn and SignUp

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="flex-1 items-center justify-center bg-dark mt-10">
          <StatusBar style="auto" />
          <Image
            source={images.silverlogo}
            style={{ width: 250, height: 250 }}
          />
        </View>

        <View className="mt-10">
          {/* Toggle between SignIn and SignUp */}
          {showSignIn ? <SignIn /> : <SignUp />}
        </View>

        <Text className="text-center text-white mt-10">
          {showSignIn ? "Don't have an account? " : "Already have an account? "}
        </Text>

        {/* Button to switch forms */}
        <TouchableOpacity
          className="text-center mt-2"
          onPress={() => setShowSignIn(!showSignIn)}
        >
          <Text className="text-blue-500 text-center">
            {showSignIn ? "Sign Up" : "Sign In"}
          </Text>
        </TouchableOpacity>

      <Link href={"./(navigation)/(tabs)/home"}>
          To Home
      </Link>

      </ScrollView>
    </SafeAreaView>
  );
}
