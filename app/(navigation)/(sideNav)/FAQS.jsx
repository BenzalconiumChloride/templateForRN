import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { images } from '../../../constants';

const FAQS = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <StatusBar style="dark" />
      <View className="flex items-center justify-center mb-3">
        <Image
          source={images.bluhori}
          className="w-[300] h-[40]"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <LinearGradient
        colors={["#022c5c", "#1c16bd"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <View className="items-center justify-center h-20">
          <Text className="text-gray-100 font-pmedium text-3xl">FAQ's</Text>
          <Text className="text-gray-100 font-pmedium text-xl">Frequently Asked Questions</Text>
        </View>
      </LinearGradient>
      <View className="flex items-center justify-center">
        <Image
          source={images.faq}
          />
      <Text>WHAT SERVICES DOES ONE HOME SOLUTIONS OFFER</Text>
      </View>
    </SafeAreaView>
  );
}

export default FAQS