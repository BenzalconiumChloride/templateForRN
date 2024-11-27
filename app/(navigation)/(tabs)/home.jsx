import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalContext } from '../../../context/GlobalPRovider';
import WalletCard from '../../../components/WalletCard';
import { images } from '../../../constants';

const Home = () => {
      const { user, logout } = useContext(GlobalContext);
  return (
    <SafeAreaView>
      <Image
        className="flex items-center justify-center mb-3"
        source={images.bluhori}
        style={{ alignSelf: "center", height: 60, width: 300 }}
      />
      <View className="mt-10">
        <WalletCard />
      </View>
    </SafeAreaView>
  );
}

export default Home