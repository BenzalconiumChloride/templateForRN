import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalContext } from '../../../context/GlobalPRovider';
import WalletCard from '../../../components/WalletCard';
import { images } from '../../../constants';
import HomeDropdown from '../../../components/HomeDropdown';
import { ScrollView } from 'react-native-gesture-handler';

const Home = () => {
      const { user, logout } = useContext(GlobalContext);
  return (
    <SafeAreaView>
      <View className="flex items-center justify-center mb-3">
        <Image
          source={images.bluhori}
          className="w-[300] h-[40] mt-5"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View className="mt-10">
        <WalletCard />
      </View>
      <View className="mt-10 justify-center items-center">
          <HomeDropdown />
      </View>
    </SafeAreaView>
  );
}

export default Home