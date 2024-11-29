import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { LinearGradient } from "expo-linear-gradient";

const DATA = [
  { title: "Received P10,000 from 987654321" },
  { title: "Successfully Payed P10,000 to 584759347" },
  { title: "You Just topped up your wallet with P30,000" },
];

const MyFlashList = () => {
  return (
    <LinearGradient colors={["#cbc9db", "#ffffff"]}>
      <FlashList
        data={DATA}
        renderItem={({ item }) => <Text style={styles.item}>{item.title}</Text>}
        estimatedItemSize={50}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.container}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  item: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  footer: {
    fontSize: 14,
    color: "#888",
    marginTop: 10,
  },
});

export default MyFlashList;
