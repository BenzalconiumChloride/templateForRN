import {
  View,
  Text,
  Button,
  Modal,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../../constants";
import QrScanner from "../../../components/QrScanner";
import { ScrollView } from "react-native-gesture-handler";

const Services = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView>
      <ScrollView className="h-full w-full">
        <View className="flex justify-center items-center h-[400] w-[350]">
      <QrScanner />
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};
export default Services;
