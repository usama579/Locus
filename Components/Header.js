import React from "react";
import { StyleSheet, SafeAreaView, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Header() {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../assets/icons/headerlogo.png")}
        style={styles.headerLogo}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5EEFE",
    width: wp("100%"),
    height: hp("11.5%"),
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },

  headerLogo: {
    width: wp("21%"),
    height: hp("12%"),
    alignSelf: "center",
    position: "absolute",
    top: hp("3.5%"),
  },
});
