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
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function PasswordResetScreen({ navigation }) {
  const [mail, setMail] = useState("");

  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

forgetPass= async (mail)=> {
  if( mail){
  try{
  const response = await firebase.auth().sendPasswordResetEmail(mail);
    navigation.navigate("PasswordResetScreen2")
  }catch(e){
    switch(e.code){
      case 'auth/user-not-found':
        alert('A user with that Email does not exist. Try signing up' );
        break; 
        case 'auth/invalid-email':
          alert('Please enter a valid Email address' );
    }
  

  }} else {
    alert(' Please enter an Email ');
  }

};

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

      <View style={{ height: hp("65%"), justifyContent: "flex-start" }}>
        <View style={styles.loginCardContainer}>
          <View style={styles.topTextContainer}>
            <View>
              <Text style={styles.signIn}>Forgot password?</Text>
              <View style={styles.signinLine} />
            </View>
          </View>

          <Text style={styles.prefereText}>Enter your email here</Text>

          <View style={styles.emailContainer}>
            <View style={styles.emailSubContainer}>
              <Image source={require("../assets/icons/mail.jpg")} />

              <TextInput
                keyboardType="email-address"
                style={styles.inputMail}
                placeholder="Email address"
                placeholderTextColor="#707070"
                onChangeText={(text) => setMail(text)}
                defaultValue={mail}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={()=>forgetPass(mail)}
            style={styles.cardBottomCircle}
          >
            <View>
              <AntDesign name="arrowright" size={16} color="#fff" />
            </View>
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
    height: hp("32%"),
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

  emailContainer: {
    width: wp("75%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginVertical: hp("5%"),
  },
  emailSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputMail: {
    width: wp("70%"),
    height: hp("2.5%"),
    paddingHorizontal: wp("3%"),
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
    elevation: 5,
  },
});
