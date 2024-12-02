import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import icons from '../constants/icons';

const HistoryFilter = () => {
   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
   const [selectedDate, setSelectedDate] = useState(null);

   const showDatePicker = () => setDatePickerVisibility(true);
   const hideDatePicker = () => setDatePickerVisibility(false);

   const handleConfirm = (date) => {
     setSelectedDate(date);
     hideDatePicker();
    
   };


   const handleConfirmA = (date) => {
     setSelectedDateA(date);
     hideDatePickerA();
   };
  return (
    <View>
      <Text className="text-primary font-psemibold text-xl">
        Select a date range
      </Text>
      <View className="mt-5">
        <Text className="text-primary font-psemibold text-xl">From</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={showDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </Text>
          <Image source={icons.calendar} className="w-[20] h-[20]" />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

{/* 2nd Date */}
      <View className="mt-5">
        <Text className="text-primary font-psemibold text-xl">To</Text>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={showDatePicker} style={styles.button}>
          <Text style={styles.buttonText}>
            {selectedDate ? selectedDate.toLocaleDateString() : "Select Date"}
          </Text>
          <Image source={icons.calendar} className="w-[20] h-[20]" />
        </TouchableOpacity>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    width: "90%",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginLeft: 10,
  },
});


export default HistoryFilter