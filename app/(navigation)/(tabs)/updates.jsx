import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { images } from '../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { ScrollView } from 'react-native-gesture-handler';



const Updates = () => {

  return (
    <SafeAreaView>
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
        <View className="items-center justify-center h-[50]">
          <Text className="text-gray-100 font-pmedium text-3xl">Updates</Text>
        </View>
      </LinearGradient>

      <ScrollView>
        
      </ScrollView>      
    </SafeAreaView>
  );
}

export default Updates