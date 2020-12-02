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

export default function PasswordResetScreen({ navigation }) {
  const [mail, setMail] = useState("");

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
        hidden={false}
        backgroundColor="#fff"
        translucent={true}
      />
      <Image source={require("../assets/logo.png")} style={styles.logoImage2} />

      <View style={{ height: hp("65%"), justifyContent: "flex-start" }}>
        <View style={styles.loginCardContainer}>
          <View style={styles.topTextContainer}>
            <View>
              <Text style={styles.signIn}>Forgot password?</Text>
              <View style={styles.signinLine} />
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.prefereText}>Check your Email</Text>
            <Text style={styles.prefereText2}>We sent a password reset link to you.</Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.cardBottomCircle}
          >
            <AntDesign name="arrowleft" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
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
    marginBottom: hp("-9%"),
  },

  loginCardContainer: {
    width: wp("85%"),
    height: hp("26%"),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    marginVertical: hp("5%"),
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

  prefereText: {
    fontFamily: "MoskMedium500",
    marginHorizontal: wp("7%"),
    marginVertical: hp("-1%"),
    color: "#707070",
    fontSize: 18,
    opacity: 0.5,
  },

  prefereText2: {
    fontFamily: "MoskMedium500",
    marginHorizontal: wp("7%"),
    marginVertical: hp("1.3%"),
    color: "#707070",
    fontSize: 18,
    opacity: 0.5,
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
    bottom: wp("-7%"),
  },

  textContainer: {
    marginVertical: hp("1%"),
  },
});
