import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const HistorySubmit = () => {
  return (
    <TouchableOpacity style={styles.btn}>
      <LinearGradient colors={["#0c2c5c", "#1c16bd"]} style={{  borderRadius: 30 }}>
        <View style={styles.btncontainer}>
          <Text className="text-white font-pmedium text-3xl">Submit</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
  },
  btncontainer: {
    alignItems: "center",
    marginTop: 10,
    padding: 5,
    width: 340,
  },
});
export default HistorySubmit