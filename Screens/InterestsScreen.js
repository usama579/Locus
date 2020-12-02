import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  StatusBar,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { AntDesign } from "@expo/vector-icons";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import InterestsBox from "../Components/InterestsBox";

export default function LoginScreen({ navigation }) {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      style={styles.loginBackgroundImage}
      source={require("../assets/backgroundImage.png")}
    >
      <StatusBar
        barStyle="dark-content"
        hidden={true}
        backgroundColor="#fff"
        translucent={true}
      />
      <Image source={require("../assets/logo.png")} style={styles.logoImage2} />

      <View style={styles.loginCardContainer}>
        <View style={styles.topTextContainer}>
          <View>
            <Text style={styles.signIn}>Tell us about you</Text>
            <View style={styles.signinLine} />
          </View>
        </View>

        <Text style={styles.prefereText}>What do you prefer?</Text>

        <View style={styles.interestsBoxContainer}>
          <View style={styles.firstRow}>
            <InterestsBox text="Swimmming" />
            <InterestsBox text="Gaming" />
          </View>

          <View style={styles.secondRow}>
            <InterestsBox text="Reading" />
            <InterestsBox text="Playing" />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("HomeScreen")}
          style={styles.cardBottomCircle}
        >
          <AntDesign name="arrowright" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  loginBackgroundImage: {
    width: wp("100%"),
    height: hp("100%"),
    opacity: 0.9,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    justifyContent: "space-evenly",
  },

  logoImage2: {
    width: wp("60%"),
    height: hp("10.5%"),
    alignSelf: "center",
  },

  loginCardContainer: {
    width: wp("85%"),
    height: hp("57%"),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    bottom: hp("1%"),
  },
  topTextContainer: {
    flexDirection: "row",
    padding: hp("3%"),
    alignItems: "center",
  },
  signIn: {
    fontSize: 18,

    fontFamily: "MoskMedium500",
  },

  signinLine: {
    borderBottomWidth: 2,
    width: wp("36%"),
    marginVertical: hp(".5%"),
    borderBottomColor: "#7D34E3",
  },

  cardBottomCircle: {
    width: 54,
    height: 54,
    borderRadius: 28,
    backgroundColor: "#7D34E3",
    alignSelf: "center",
    borderWidth: 6,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: hp("-3.5%"),
  },

  prefereText: {
    fontFamily: "MoskMedium500",
    marginHorizontal: wp("7%"),
    marginVertical: hp("-1%"),
    color: "#707070",
    fontSize: 18,
    opacity: 0.5,
  },

  interestsBoxContainer: {
    marginRight: wp("5%"),
    alignItems: "center",
  },

  firstRow: {
    flexDirection: "row",
  },
  secondRow: {
    flexDirection: "row",
    marginTop: hp("-5%"),
  },
});
