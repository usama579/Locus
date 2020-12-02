import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageBackground,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CategoryBox({ backImage, centerImage, text, onPress }) {
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
    MoskNormal400: require("../assets/fonts/MoskNormal400.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <ImageBackground style={styles.imageContainer} source={backImage}>
          <Image source={centerImage} />
        </ImageBackground>
        <Text style={styles.bottomText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: wp("35%"),
    height: hp("18%"),
    alignItems: "center",
    justifyContent: "center",
  },
  bottomText: {
    alignSelf: "center",
    fontFamily: "MoskNormal400",
    color: "#8338EB",
    fontSize: 16,
    marginVertical: hp("1%"),
  },
});
