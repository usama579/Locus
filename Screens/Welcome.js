import React, { Component } from "react";
import {
  AppRegistry,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  StatusBar,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Swiper from "react-native-swiper";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

export default function Welcome({ navigation }) {
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
      <ImageBackground
        source={require("../assets/backgroundImage.png")}
        style={styles.ImageBackground}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage}
        />

        <Text style={styles.welcomeText}>
        Locus understands your {"\n"}  tastes to guides you {"\n"} to the best places
          {"\n"} that suit you {"\n"}
          
            
        </Text>
      </ImageBackground>

      <ImageBackground
        source={require("../assets/backgroundImage.png")}
        style={styles.ImageBackground}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage}
        />

        <Text style={styles.welcomeText}>
        Explore all places and {"\n"}  events in Riyadh 
          
            
        </Text>
      </ImageBackground>

      <ImageBackground
        source={require("../assets/backgroundImage.png")}
        style={styles.ImageBackground2}
      >
        <Image
          source={require("../assets/logo.png")}
          style={styles.logoImage2}
        />

        <View>
          <View style={styles.loginButtonContainer}>
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={styles.loginText}
            >
              LOGIN
            </Text>
          </View>

          <Text
            onPress={() => navigation.navigate("SignUpScreen")}
            style={styles.createAccountText}
          >
            Create a new account
          </Text>
        </View>
      </ImageBackground>
    </Swiper>
  );
}

AppRegistry.registerComponent("myproject", () => SwiperComponent);

const styles = StyleSheet.create({
  wrapper: {},

  slide1: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD6EB",
  },

  ImageBackground: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  slide2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#97CAE5",
  },
  slide3: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#92BBD9",
  },
  ImageBackground2: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  logoImage: {
    width: wp("70%"),
    height: hp("10%"),
    marginTop: hp("25%"),
    opacity: 0.9,
  },
  logoImage2: {
    width: wp("70%"),
    height: hp("10.5%"),
    opacity: 0.9,
  },

  welcomeText: {
    textAlign: "center",
    fontSize: wp("9%"),
    opacity: 0.5,
    marginTop: hp("14%"),
    fontFamily: "MoskBold700",
  },

  loginButtonContainer: {
    width: wp("80%"),
    height: hp("8%"),
    borderRadius: 30,
    backgroundColor: "#7D34E3",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: wp("5%"),
  },
  createAccountText: {
    alignSelf: "center",
    color: "#000",
    fontSize: 17,

    marginTop: hp("1%"),
    fontFamily: "MoskBold700",
  },
});
