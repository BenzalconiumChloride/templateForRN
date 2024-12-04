import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlobalContext } from '../../../context/GlobalPRovider';
import WalletCard from '../../../components/WalletCard';
import { images } from '../../../constants';
import MultiSelectComponent from '../../../components/MultiSelectComponent';
import QrScanner from '../../../components/QrScanner';


const Home = () => {
      const { user, logout } = useContext(GlobalContext);
  return (
    <SafeAreaView className="h-full w-full">
      <View className="flex items-center justify-center mb-3">
        <Image
          source={images.bluhori}
          className="w-[300] h-[40] mt-2"
          style={{ resizeMode: "contain" }}
        />
      </View>
      <View className="mt-5">
        <WalletCard />
      </View>
      <View className="mt-10 justify-center items-center w-fit">
         <MultiSelectComponent />
      </View>
      
    </SafeAreaView>
  );
}

export default Home