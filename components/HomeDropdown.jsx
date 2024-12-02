import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeDropdown = () => {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
    { placeholder: "Need to Fix", value: null, label: "Select Item" },
      { label: "Apple", value: "apple" },
      { label: "Banana", value: "banana" },
    ]);

  return (
    <View className="w-[350]" style={[styles.selectBox, { zIndex: 1000 }]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        modalProps={{
          animationType: "fade",
        }}
        listMode='MODAL'
        style={{
          borderRadius: 30,
        }}
        dropDownContainerStyle={{
          zIndex: 1000,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectBox: {
    borderRadius: 30,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.23,
    shadowRadius: 11.78,
    elevation: 15,
  },
});
export default HomeDropdown