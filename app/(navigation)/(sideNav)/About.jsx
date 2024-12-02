import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import { images } from '../../../constants'
import { ScrollView } from 'react-native-gesture-handler'

const About = () => {
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
          <Text className="text-gray-100 font-pmedium text-3xl">About Us</Text>
        </View>
      </LinearGradient>

      <ScrollView>
        <View className="flex items-center justify-center h-full p-5">
          <Text className="text-center">
            One home solutions is a property concierge in the Philippines.
            Designed to simplify the complexities of property management, we
            connect property owners with a wide network of accredited service
            providers and suppliers. Whether it's routine maintenance,
            renovation, or specialized services, our platform offers seamless
            access to trusted professionals.
          </Text>
          <Text className="text-center mt-5">
            With a focus on innovation and quality, One Home Solutions is
            committed to setting new industry standards, making property
            management more efficient and stress-free. Our goal is to create a
            reliable and easy-to-use platform that helps property owners and
            take care of their investments with confidence. Whether you're
            managing a single home or multiple properties, One Home Solutions is
            here to provide the support you need.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default About