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
  Modal,
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={menuVisible}
        onRequestClose={toggleMenu}
      >
        <View style={styles.modalOverlay}>
          <Animated.View
            style={[styles.menu]}
            className="items-center justify-space-between"
          >
            <TouchableOpacity style={styles.option} onPress={toggleMenu}>
              <Text style={styles.optionText}>
                <Link href="/services">
                  <Image
                    source={icons.carpentry}
                    style={{ tintColor: "#fff" }}
                    className="w-[50] h-[50]"
                  />
                </Link>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={toggleMenu}>
              <Link href="/services">
                <Image
                  source={icons.plumber}
                  style={{ tintColor: "#fff" }}
                  className="w-[50] h-[50]"
                />
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={toggleMenu}>
              <Link href="/services">
                <Image
                  source={icons.electrical}
                  style={{ tintColor: "#fff" }}
                  className="w-[50] h-[50]"
                />
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={toggleMenu}>
              <Link href="/services">
                <Image
                  source={icons.roof}
                  style={{ tintColor: "#fff" }}
                  className="w-[50] h-[50]"
                />
              </Link>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={toggleMenu}>
              <Link href="/services">
                <Image
                  source={icons.painting}
                  style={{ tintColor: "#fff" }}
                  className="w-[50] h-[50]"
                />
              </Link>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
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
              headerShown: false,
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
             headerShown: false,
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
              headerShown: false,
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
    width: 70,
    height: 45,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
    justifyContent: "center",
    alignItems: "center",
    top: -15,
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
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  // modal
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  // options
  option: {
    backgroundColor: "#022c5c",
    borderColor: "#e0e0f6",
    borderWidth: 2,
    width: 70,
    height: 70,
    borderRadius: 40,
    transitionDelay: 100,
    justifyContent: "center",
    alignItems: "center",
    
  },

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
    top: 15,
  },
  focusedIcon: {
    tintColor: "#fff",
    width: 24,
    height: 24,
  },
  label: {
    fontSize: 12,
    color: "#fff",
    top: 15,
  },
  focusedLabel: {
    fontWeight: "600",
    color: "#fff",
  },
  tabBarStyle: {
    backgroundColor: "#022c5c",
    height: 70,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },

  circularBackground: {
    position: "absolute",
    backgroundColor: "#022c5c",
    borderRadius: 40,
    height: 55,
    width: 55,
    alignItems: "center",
    justifyContent: "center",
    top: -15,
  },
});

export default TabsLayout;
