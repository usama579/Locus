import React, { useReducer, useState } from "react";
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
  ActivityIndicator
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
import { saveUserId } from "../apis/LocalDB";

export default function LoginScreen({ navigation }) {
  //user attributes
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  //Error attributes
  const [errorpass, seterrorPass] = useState("");
  const [errormail, seterrorMail] = useState("");
  const [loading, setLoading] = useState()
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  // sign in function
  const user = firebase.auth().currentUser; 
  fSignIn = async () => {
    setLoading(true)
    if( mail && pass ){
      try{
        //cheack if the user is verfied 
        const response = await firebase.auth().signInWithEmailAndPassword(mail ,pass);
        if (response){
          console.log(response.user.uid)
          userInfo = response.user
          console.log('kmsdaklfn',userInfo.DateOfBirth,'name',userInfo.nickname,userInfo.city,userInfo.gender,userInfo.email)
          saveUserId(userInfo)
          setLoading(false)
        navigation.navigate('HomeScreen')
        
        }
      }catch (error){
    
        switch(error.code){
          case 'auth/user-not-found':
            seterrorMail("A user with that Email does not exist.");
            break; 

          case 'auth/invalid-email':
            seterrorMail("Please enter a valid Email address" );
              break; 
          case 'auth/wrong-password':
            seterrorPass("Incorrrect password!");
        }
      
      }
    }
    else {
      alert(' Please enter Email and password');
      
    }
    
    };

    // end of sign in function 
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
            <Text style={styles.signIn}>Sign in</Text>
            <View style={styles.signinLine} />
          </View>

          <Text
            onPress={() => navigation.navigate("SignUpScreen")}
            style={styles.signUp}
          >
            Sign Up
          </Text>
        </View>

        <View style={styles.inputsMainContainer}>
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
          <Text style={{textAlign: 'center', marginBottom:1, color:"red"}}> {errormail} </Text>


          <View style={styles.passwordContainer}>
            <View style={styles.passwordSubContainer}>
              <Image source={require("../assets/icons/lock.jpg")} />

              <TextInput
                keyboardType="numbers-and-punctuation"
                secureTextEntry={true}
                style={styles.inputpass}
                placeholder="Password"
                placeholderTextColor="#707070"
                onChangeText={(text) => setPass(text)}
                defaultValue={pass}
              />

              <Image
                style={{
                  marginHorizontal: wp("-15%"),
                  alignSelf: "center",
                  borderRadius: 10,
                }}
                source={require("../assets/icons/eye.jpg")}
              />
              
            </View>
          </View>
          <Text style={{textAlign: 'center', marginBottom:1, color:"red"}}> {errorpass} </Text>


          <Text
            onPress={() => navigation.navigate("PasswordResetScreen")}
            style={styles.forgetPasswordText}
          >
            Forgot Password?
          </Text>
        </View>

{/*         <View style={styles.socialMainContainer}>
          <View style={styles.socialContainer}>
            <Image source={require("../assets/icons/google.jpg")} />
          </View>

          <View style={styles.socialContainer}>
            <Image source={require("../assets/icons/facebook.jpg")} />
          </View>

          <View style={styles.socialContainer}>
            <Image source={require("../assets/icons/twitter.jpg")} />
          </View>
        </View> */}
 {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
          />
        ) : (
        <TouchableOpacity
          onPress={fSignIn}
          style={styles.cardBottomCircle}
        >
          <View>
            <AntDesign name="arrowright" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        )}
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
    height: hp("55%"),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    bottom: hp("4%"),
  },
  topTextContainer: {
    flexDirection: "row",
    padding: hp("3%"),
    alignItems: "center",
  },
  signIn: {
    fontSize: 18,

    fontFamily: "MoskBold700",
  },

  signinLine: {
    borderBottomWidth: 2,
    width: wp("15.5%"),
    marginVertical: hp(".5%"),
    borderBottomColor: "#7D34E3",
  },

  signUp: {
    fontSize: 18,
    color: "#B0B6BA",
    marginLeft: wp("10%"),
    fontFamily: "MoskMedium500",
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
  },
  emailSubContainer: {
    flexDirection: "row",
  },

  inputMail: {
    width: wp("70%"),
    height: hp("2.5%"),
    paddingHorizontal: wp("3%"),
  },

  passwordContainer: {
    width: wp("75%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginTop: hp("1.3%"),
  },
  passwordSubContainer: {
    flexDirection: "row",
  },

  inputpass: {
    width: wp("70%"),
    height: hp("2.5%"),
    paddingHorizontal: wp("3%"),
  },

  forgetPasswordText: {
    color: "#A77AE1",
    fontSize: 14,
    marginTop: hp("3%"),
    alignSelf: "flex-end",
    marginRight: hp("3.5%"),
  },
  inputsMainContainer: {
    marginTop: hp("5%"),
  },

  socialContainer: {
    width: 38,
    height: 37,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 19,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: wp("3%"),
  },
  socialMainContainer: {
    flexDirection: "row",
    padding: hp("5%"),
    alignSelf: "center",
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
    bottom: hp("-3%"),
  },
});
