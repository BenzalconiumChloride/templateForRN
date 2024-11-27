import { View, Text, Image, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { screenOptions } from './_layout';
import { images } from '../../../constants';
import QRCodeGenerator from '../../../components/QRCodeGenerator';
import ProfileInfo from '../../../components/ProfileInfo';

const Profile = () => {
  

  return (
    <SafeAreaView className="h-full w-full">
      <Image
        className="flex items-center justify-center mb-3"
        source={images.bluhori}
        style={{ alignSelf: "center", height: 60, width: 300 }}
      />
      <LinearGradient
        colors={["#022c5c", "#1c16bd"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View className="items-center justify-center h-20">
          <Text className="text-white font-pmedium text-3xl ">My Profile </Text>
        </View>
      </LinearGradient>

      {/* profile details */}

      <View>
        <ProfileInfo />
      </View>

      {/* end of profile details */}
      <LinearGradient colors={["#d9d9d9", "#fff"]}>
        <View className="h-20 w-full mt-1 flex-row justify-between items-center px-4">
          <Text className="font-pmedium text-3xl">My Wallet</Text>
          <Text className="font-pmedium text-3xl">30000</Text>
        </View>
      </LinearGradient>

      
        <View className="w-full p-4">
          <Text className="font-psemibold text-3xl px-4">Address</Text>
          <Text className="font-psemibold text-lg px-4">Home</Text>
          <Text className="font-pregular text-lg px-4">
            121 Park Avenue, King Street, NY 23561
          </Text>
          <Text className="font-psemibold text-lg px-4">Office</Text>
          <Text className="font-pregular text-lg px-4">
            43 Bourkle Street, Newbridge, NY 36211
          </Text>
        </View>
     

      <View className="w-full mt-24 bg-white">
        <QRCodeGenerator />
      </View>
    </SafeAreaView>
  );
};


export default Profile