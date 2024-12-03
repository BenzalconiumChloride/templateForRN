import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { images, icons } from '../../../constants';



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
          <Text className="text-gray-100 font-pmedium text-xl">
            Frequently Asked Questions
          </Text>
        </View>
      </LinearGradient>

      <ScrollView>
        <View className="flex items-center justify-between p-5">
          <View className="items-center justify-center">
            <Image source={icons.cp} className="w-[50] h-[50]" />
            <Text className="text-center font-pmedium text-lg">
              WHAT SERVICES DOES ONE HOME SOLUTIONS OFFER?
            </Text>
            <Text className="text-center">
              We provide a wide range of property management services, including
              maintenance, repairs, and renovation.
            </Text>
          </View>

          <View className="items-center justify-center mt-10">
            <Image source={icons.gear} className="w-[50] h-[50]" />
            <Text className="text-center font-pmedium text-lg">
              ARE YOU SERVICE PROVIDERS ACCREDITED?
            </Text>
            <Text className="text-center">
              Yes, all service providers on our platform are carefully vetted
              and accredited.
            </Text>
          </View>

          <View className="items-center justify-center mt-10">
            <Image source={icons.telephone} className="w-[50] h-[50]" />
            <Text className="text-center font-pmedium text-lg">
              HOW DO I BOOK A SERVICE PROVIDERS?
            </Text>
            <Text className="text-center">
              Simply use our app to connect with accredited service providers
              and schedule a service.
            </Text>
          </View>

          <View className="items-center justify-center mt-10">
            <Image source={icons.notebook} className="w-[50] h-[50]" />
            <Text className="text-center font-pmedium text-lg">
              CAN I MANAGE MULTIPLE PROPERTIES WITH ONE HOME SOLUTIONS?
            </Text>
            <Text className="text-center">
              Yes, our platform supports the management of multiple properties.
            </Text>
          </View>

          <View className="items-center justify-center mt-10">
            <Image source={icons.map} className="w-[50] h-[50]" />
            <Text className="text-center font-pmedium text-lg">
              IS ONE HOME SOLUTIONS AVAILABLE ACROSS THE PHILIPPINES?
            </Text>
            <Text className="text-center">
              Yes, we serve property owners nationwide.
            </Text>
          </View>

          <View className="items-center justify-center mt-10">
            <Image source={icons.faq} className="w-[50] h-[50]" />
            <Text className="text-center font-pmedium text-lg">
              WHAT MAKES ONE HOME SOLUTIONS DIFFERENT FROM OTHER PLATFORMS?
            </Text>
            <Text className="text-center">
              We focus on innovation, quality, and a seamless user experience,
              making property management stress-free.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default FAQS