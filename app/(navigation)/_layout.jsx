import { View, Text, SafeAreaView, Image, StyleSheet, Alert, TouchableOpacity, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, useRouter } from "expo-router";
import { signOut } from "../../lib/appwriteConfig";
import { useState } from "react";

import { icons } from "../../constants";
import DropdownComponent from "../../components/DrawerDropdown";

export const header = () => null; // Disable the default header

const CustomDrawerContent = (props) => {

   const [isLoggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await signOut();
      Alert.alert(
        "Logged Out",
        "You have been logged out. Do you want to close the app?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {
              router.push("/index"); // Redirect to the sign-in page
            },
          },
          {
            text: "Close App",
            onPress: () => {
              BackHandler.exitApp(); // Closes the app on Android
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to log out.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: "transparent" }}
    >
      <DrawerItem
        icon={() => (
          <Image source={icons.question} style={{ width: 24, height: 24 }} />
        )}
        label={"FAQs"}
        labelStyle={{
          color: "black",
          fontSize: 16,
          fontFamily: "Poppins-Regular",
        }}
        onPress={() => router.push("/FAQS")} // Simplified path
      />
      <DrawerItem
        icon={() => (
          <Image source={icons.info} style={{ width: 24, height: 24 }} />
        )}
        label={"About Us"}
        labelStyle={{
          color: "black",
          fontSize: 16,
          fontFamily: "Poppins-Regular",
        }}
        onPress={() => router.push("/About")} // Simplified path
      />

      {/*  Drop Down Contact */}
      <DropdownComponent />

      {/* Logout Button */}
      <TouchableOpacity
        style={[styles.logoutButton, isLoggingOut && { opacity: 0.5 }]}
        onPress={handleLogout}
        disabled={isLoggingOut}
        className="flex flex-row"
      >
        <Image source={icons.logout} style={{ width: 24, height: 24 }} />

        <Text className="ml-3" style={styles.logoutButtonText}>
          Log Out
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

const Layout = () => {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false, // Hide the header
      }}
      drawerStyle={{
        backgroundColor: "rgba(240, 255, 250, 0.23)", // Set the drawer background opacity (50% opacity)
      }}
    />
  );
};

export default Layout;
