import { View, Text } from 'react-native'
import React from 'react'
import { Link, Redirect, router, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function App () {
   const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-dark">
      <StatusBar style="auto" />
      <Text className="text-3xl font-pblack"> OneHome</Text>

      <Link href="./(navigation)/(tabs)/home">
        <Text>{"\n"} Testing Home</Text>
      </Link>

    </View>
  );
}
