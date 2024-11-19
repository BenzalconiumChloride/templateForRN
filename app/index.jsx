import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function App () {
  return (
    <View className="flex-1 items-center justify-center bg-dark">
    <StatusBar style='auto' />
    <Text className="text-3xl font-pblack"> OneHome</Text>
      <Link href="/dfg" className='font-pregular'>
        Go to Profile
      </Link>
    </View>
  )
}
