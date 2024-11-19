import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const PagerScreen = () => {
  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      <View key="1" style={styles.page}>
        <Text>Page 1</Text>
      </View>
      <View key="2" style={styles.page}>
        <Text>Page 2</Text>
      </View>
      <View key="3" style={styles.page}>
        <Text>Page 3</Text>
      </View>
    </PagerView>
  );
};

const SettingsScreen = () => {
  return (
    <View style={styles.screen}>
      <Text>Settings Screen</Text>
    </View>
  );
};

export default function dfg() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Pager">
        <Drawer.Screen name="Pager" component={PagerScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9c2ff",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
