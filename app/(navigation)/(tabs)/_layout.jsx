import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Tabs } from "expo-router";
import { icons, images } from "../../../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";

const Tab = createBottomTabNavigator();

const TabIcon = ({ iconFilled, iconOutlined, color, name, focused }) => {
  return (
    <View style={[styles.tabContainer, focused && styles.focusedTab]}>
      {focused && <View style={styles.highlightCircle} />}
      <Image
        source={focused ? iconFilled : iconOutlined}
        resizeMode="contain"
        style={[
          styles.icon,
          { tintColor: focused ? color : "#fff" },
          focused && styles.focusedIcon,
        ]}
      />
      <Text style={[styles.label, focused && styles.focusedLabel]}>{name}</Text>
    </View>
  );
};

const ServicesTabScreen = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0)); // For animating menu

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);

    // Animate the menu items
    Animated.timing(animation, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const menuStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -270], // Adjust this value for how far the options should appear
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleMenu}>
        <View style={styles.circularBackground}>
          <Image
            source={!menuVisible ? images.ohlogo : images.ohlogo}
            style={[styles.buttonIcon, { width: 26, height: 26 }]}
          />
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.menu, menuStyle]}>
        {menuVisible && (
          <>
            <TouchableOpacity style={styles.option1}>
              <Text style={styles.optionText}>
                <Link href="/services">Option A</Link>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option2}>
              <Text style={styles.optionText}>Option B</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option3}>
              <Text style={styles.optionText}>Option C</Text>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </View>
  );
};

const TabsLayout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Tabs
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: "#000",
            tabBarInactiveTintColor: "#fff",
            tabBarStyle: [
              styles.tabBarStyle,
              isKeyboardVisible && { display: "none" }, // Hide tab bar when keyboard is visible
            ],
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  iconFilled={icons.home}
                  iconOutlined={icons.home1}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="history"
            options={{
              title: "History",
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  iconFilled={icons.history}
                  iconOutlined={icons.history1}
                  color={color}
                  name="History"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="services"
            options={{
              title: "Services",
              tabBarButton: () => <ServicesTabScreen />, // Custom button for Services tab
            }}
          />
          <Tabs.Screen
            name="updates"
            options={{
              title: "Updates",
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  iconFilled={icons.notif}
                  iconOutlined={icons.notif1}
                  color={color}
                  name="Updates"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  iconFilled={icons.profile}
                  iconOutlined={icons.profile1}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#fff",
    width: 65,
    height: 60,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    top: -5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    fontSize: 30,
    fontWeight: "700",
    color: "#1e1e1e",
  },
  menu: {
    position: "absolute",
    top: 68, // Adjust position based on your layout
    alignItems: "center",
  },
  // options
  option1: {
    backgroundColor: "#022c5c",
    borderColor: "#e0e0f6",
    borderWidth: 2,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 140,
    right: 60,
    transitionDelay: 100,
  },

  option2: {
    backgroundColor: "#022c5c",
    borderColor: "#e0e0f6",
    borderWidth: 2,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    top: 40,
    transitionDelay: 200,
  },

  option3: {
    backgroundColor: "#022c5c",
    borderColor: "#e0e0f6",
    borderWidth: 2,
    width: 55,
    height: 55,
    borderRadius: 27.5,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    left: 60,
    top: 30,
    transitionDelay: 300,
  },
  // end of options
  optionText: {
    color: "#fff",
    fontWeight: "100",
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    position: "absolute",
    paddingVertical: 2,
  },
  focusedTab: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 24,
    height: 24,
    top: 10,
  },
  focusedIcon: {
    tintColor: "#fff",
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    color: "#fff",
    top: 10,
  },
  focusedLabel: {
    fontWeight: "600",
    color: "#fff",
  },
  tabBarStyle: {
    backgroundColor: "#022c5c",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  circularBackground: {
    position: "absolute",
    backgroundColor: "#022c5c",
    borderRadius: 35,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    top: 2,
  },
});

export default TabsLayout;
