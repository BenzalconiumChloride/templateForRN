import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { icons, images } from '../constants';
import { useState } from 'react';
import QrScanner from './QrScanner';

const WalletCard = () => {
     const [isBalanceVisible, setIsBalanceVisible] = useState(true);

     const toggleBalanceVisibility = () => {
       setIsBalanceVisible(!isBalanceVisible);
     };

  return (
    // card
    <View className="flex items-center justify-center">
      <LinearGradient
        colors={["#022c5c", "#2832c2"]}
        start={{ x: 0, y: 0.5}}
        end={{ x: 1, y: 1 }}
        style={styles.cardBox}
      >
        <View className="flex-row">
          <Image source={images.ohlogo} className="w-[60] h-[60]" />
          <View className="flex-col ml-3">
            <Text className="text-white font-pmedium text-lg"> My Wallet</Text>

            <View className="flex-row mt-1 w-64 justify-between">
              <Text className="text-white font-pmedium text-2xl">
                {" "}
                ₱ {isBalanceVisible ? "30000" : "•••••"}
              </Text>

              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Image
                  style={{ tintColor: "white" }}
                  source={isBalanceVisible ? icons.eye : icons.eyehide}
                  className="w-[30] h-[20] ml-2"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View className="flex-col">
          <Text className="text-white ">Account #</Text>
          <Text className="text-white text-3xl">123456789</Text>
        </View>

        <View>
            {/* cash In btn */}
       
            {/* pay btn */}
        </View>
      </LinearGradient>
    </View>
    // card
  );
}

const styles = StyleSheet.create({
  cardBox: {
    width: 350,
    height: 200,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.78,
    elevation: 15,
  },
});

export default WalletCard;
