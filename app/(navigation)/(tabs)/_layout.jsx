import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Tabs } from "expo-router";
import { icons, images } from "../../../constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

const TabIcon = ({ iconFilled, iconOutlined, color, name, focused }) => (
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


const TabsLayout = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Correct usage of useRef() for BottomSheetModal
  const bottomSheetModalRef = useRef(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present(); // Proper ref usage with useRef()
  }, []);

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
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
                  headerShown: false,
                  tabBarButton: () => (
                    <TouchableOpacity
                      onPress={handlePresentModalPress}
                      style={styles.tabButton}
                    >
                      <LinearGradient
                        colors={["#0c2c5c", "#0f427d"]}
                        style={styles.serviceBtn}
                      >
                        <Image
                          source={images.ohlogo}
                          style={styles.serviceLogo}
                        />
                      </LinearGradient>
                    </TouchableOpacity>
                  ),
                }}
              />

              <Tabs.Screen
                name="updates"
                options={{
                  headerShown: false,
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

          {/* Services Modal */}
          <BottomSheetModal
            ref={bottomSheetModalRef}
            snapPoints={["50%"]}
            backgroundStyle={{ backgroundColor: "rgba(9, 9, 9, 0.70)" }}
            handleIndicatorStyle={{ backgroundColor: "#ccc" }}
          >
            <BottomSheetView style={styles.modalContent}>
              <View style={styles.optionsContainer}>
                <TouchableOpacity style={styles.options}>
                  <Link href="/services">
                    <Image source={icons.carpentry} style={styles.optionIcon} />
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options}>
                  <Link href="/services">
                    <Image
                      source={icons.electrical}
                      style={styles.optionIcon}
                    />
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options}>
                  <Link href="/services">
                    <Image source={icons.painting} style={styles.optionIcon} />
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options}>
                  <Link href="/services">
                    <Image source={icons.roof} style={styles.optionIcon} />
                  </Link>
                </TouchableOpacity>

                <TouchableOpacity style={styles.options}>
                  <Link href="/services">
                    <Image source={icons.plumber} style={styles.optionIcon} />
                  </Link>
                </TouchableOpacity>
              </View>
            </BottomSheetView>
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  // modal options
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Adjusts spacing between items
    width: "100%",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  options: {
    width: "18%", // This ensures that 4 items fit per row (considering margins/padding)
    marginBottom: 10, // Space between rows
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  optionIcon: {
    width: 50, // Adjust according to your icon size
    height: 50, // Adjust according to your icon size
    resizeMode: "contain",
  },
  tabButton: {
    top: -15,
    alignItems: "center",
  },
  modalContent: {
    resizeMode: "contain",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  tabContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 65,
    height: 65,
    position: "absolute",
    paddingVertical: 2,
  },
  icon: {
    width: 25,
    height: 25,
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
  focusedBG: {
    backgroundColor: "#022c5c",
    position: "absolute",
    width: 40,
    height: 40,
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
  serviceBtn: {
    top: -5,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.22,
    shadowRadius: 9.22,
    elevation: 12,
  },
  serviceLogo: {
      width: 35,
      height: 35,
  },
});

export default TabsLayout;
