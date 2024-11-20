import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useEffect } from "react";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";

import { icons } from "../../constants";

export const header = () => null; // Disable the default header

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      style={{ backgroundColor: "rgba(240, 240, 240, 0.55)" }} // Content background opacity
    >
      <DrawerItem
        icon={() => (
          <Image source={icons.question} style={{ width: 24, height: 24 }} />
        )}
        label={"FAQs"}
        onPress={() => router.push("/FAQS")} // Simplified path
      />
      <DrawerItem
        icon={() => (
          <Image source={icons.info} style={{ width: 24, height: 24 }} />
        )}
        label={"About Us"}
        onPress={() => router.push("/About")} // Simplified path
      />
      <DrawerItem
        icon={() => (
          <Image source={icons.contact} style={{ width: 24, height: 24 }} />
        )}
        label={"Contact Us"}
        onPress={() => router.push("/Contact")} // Simplified path
      />
    </DrawerContentScrollView>
  );
};

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
