// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//import DatePicker from the package we installed
import DatePicker from "react-native-datepicker";

const DobPicker = () => {
  const [date, setDate] = useState("09-10-2020");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="Date of Birth"
          format="DD-MM-YYYY"
          minDate="01-01-2016"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              display: "none",
            },

            dateInput: {
              borderRadius: 10,
              borderWidth: 0,
            },
          }}
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DobPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: wp("-3%"),
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 20,
  },
  datePickerStyle: {},
});
