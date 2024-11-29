import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from "../../../constants";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import { ScrollView } from 'react-native-gesture-handler';
import HistoryFL from '../../../components/HistoryFL';
import HistoryFilter from '../../../components/HistoryFilter';
import HistorySubmit from '../../../components/HistorySubmit';



const History = () => {
  // Get the current date
   const formattedDate = moment().format("MMMM DD, YYYY");


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
        <View className="items-center justify-center h-20">
          <Text className="text-gray-100 font-pmedium text-3xl">History</Text>
        </View>
      </LinearGradient>
      <View className="ml-5 mt-5 h-[50]">
        <Text className="text-primary font-psemibold text-xl">
          As of {formattedDate}
        </Text>
      </View>
      <View>
        <ScrollView>
          <HistoryFL />
        </ScrollView>
      </View>

      <LinearGradient
        colors={["#cbc9db", "#ffffff"]}
        className="flex-col h-full p-5"
      >
        <HistoryFilter />

        <View className="mt-10">
          <HistorySubmit />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};


export default History