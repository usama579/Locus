//importing stuff 
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
  SafeAreaView,
ScrollView} from "react-native";

import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { RadioButton } from 'react-native-paper';
import DatePicker from "react-native-datepicker";
import { Icon,Picker } from "native-base";
// import GenderDraft from "../Components/GenderDraft"; 

//importing stuff - components and assets
import DobPicker from "../Components/DobPicker";

import male from "../assets/icons/male2.png"; //GenderImages
import female from "../assets/icons/female2.png";//GenderImages

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
////////////////////////////////////////
////////////////////////////////////////
export default function SignUpScreen({ navigation }) {
//user attributes
  const [mail, setMail] = useState("");
  const [nickname, setNickname] = useState("");
  const [pass, setPass] = useState("");
  const [city, setCity] = useState("");
  const [DOB, setDOB] = useState("");
  const [gend, setGend] = useState("");

  const [errormail, seterrorMail] = useState("");
  const [errornickname, seterrorNickname] = useState("");
  const [errorpass, seterrorPass] = useState("");
  const [errorcity, seterrorCity] = useState("");
  const [errorDOB, seterrorDOB] = useState("");
  const [errorgend, seterrorGend] = useState("");


  //regular expression for validation
  let lowerCaseLetters = /(?=.*?[a-z])/g;
  let upperCaseLetters = /(?=.*?[A-Z])/g;
  let numbers = /(?=.*?[0-9])/g;
  let emailreg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



//loaing fonts
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

//to make sure the font is loaded before starting the application
  if (!loaded) {return <AppLoading />;}



  const checkNickname= () =>{
  if (nickname==null || nickname==undefined || nickname.length<1){
    seterrorNickname("Plaese enter your nickname")
    return false
  }
    else {
    seterrorNickname("") 
    return true
    }
  }

  const checkMail= () =>{
    if (mail==null || mail==undefined || mail.length<1){
    seterrorMail("Plaese enter your Email")
    return false
    }
    else if (emailreg.test(mail) === false) {
    seterrorMail("Plaese enter a valid Email")
    return false
    }
    else {
    seterrorMail("") 
    return true
    }
    }

    const checkpass= () =>{
      if (pass==null || pass==undefined || pass.length<1){
      seterrorPass("Plaese enter your password");
      return false;
      }
      else if (pass.length<6){
      seterrorPass("Passowrd must have at least 6 characters");
      return false;
      }
      else if (lowerCaseLetters.test(pass) === false){
      seterrorPass("Password must have at least one lowercase letter");
      return false;
      }
      else if (upperCaseLetters.test(pass) === false){
      seterrorPass("Password must have at least one uppecase letter");
      return false;
      } 
      else if (numbers.test(pass) === false){
      seterrorPass("Password must have at least one number");
      return false;
      }
      else {
      seterrorPass("");
      return true;
      }
    }

    const checkcity= (cityinput) =>{
      setCity(cityinput);
      seterrorCity("");
    }

    const checkDOB= (dobinput) =>{
      setDOB(dobinput);
      seterrorDOB("");
    }

    const checkGend= (geninput) =>{
      setGend(geninput);
      seterrorGend("");
    }

     /*  const checkCity= () =>{
        if (city==null || city==undefined || city.length<1)
        seterrorCity("Plaese choose your city")
        else seterrorCity("") 
        } */

/*         if(mail)
        seterrorMail("Plaese enter your Email")
        if(pass)
        seterrorPass("Plaese enter your password")
        if (nickname)
        seterrorNickname("Plaese enter your password")
        if (city)
        seterrorCity("Plaese choose your city")
        if (DOB)
        seterrorDOB("Plaese enter your date of birth")
        if (gend)
        seterrorGend("Plaese choose your gender") */

 const SSignUp = async () => {
console.log('callde')
  if (!city)
  seterrorCity("Plaese choose your city");
  else
  seterrorCity("");

  if (!DOB)
  seterrorDOB("Plaese enter your date of birth");
  else
  seterrorDOB("");

  if (!gend)
  seterrorGend("Plaese choose your gender");
  else
  seterrorGend("");

  checkNickname();
  checkpass();
  checkMail();
/*   if (!pass)
  seterrorPass("Plaese enter your passowrd")
  else
  seterrorPass("")
  if (!nickname)
  seterrorNickname("Plaese enter your nickname")
  else
  seterrorNickname("")
  if (!mail)
  seterrorMail("Plaese enter your date of Email")  
  else
  seterrorMail("")  */


  if (gend && DOB && city && pass && mail && nickname && checkNickname() && checkpass() && checkMail()  ){
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(
          mail,
          pass
        );
        const user = firebase.auth().currentUser;

//Email verfication sent.
          user.sendEmailVerification()
// Email verfication sent.
      if (response) {
        const user = await firebase
          .database()
          .ref('user')
          .child(response.user.uid)
          .set({ email: response.user.email,
                uid: response.user.uid,
                nickname:nickname,
                city:city,
                gender: gend,
                DateOfBirth: DOB});
               console.log('SignUp')
          navigation.navigate("InterestsScreen")
         
      }
   
    } catch (error) {
      if (error.code == 'auth/email-already-in-use') 
        alert('User already exists.Try loggin in');
      
      console.log(error);
    }  } else {
      console.log(pass);
      console.log(mail);
      console.log(nickname);
      console.log(DOB);
      console.log(city);
      console.log(gend);
      console.log(checkMail);
      console.log(checkNickname);
      console.log(checkpass);
    alert ("Please complete your information")
    }
  
  };
  
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
{/* Sign Up card --> Sign up section of the page */}
  <ScrollView style={{marginBottom:20}}>
      <View style={styles.signupCardContainer}>
        <View style={styles.topTextContainer}>
          {/* displaying name of the card */}
          <Text
            onPress={() => navigation.navigate("LoginScreen")}
            style={styles.signIn}
          >
            Sign in
          </Text>
            {/* displaying name of the other inactive page(Sign Up) */}
          <View>
            <Text style={styles.signUp}>Sign Up</Text>
            <View style={styles.signinLine} />
          </View>
        </View>

        <View style={styles.inputsMainContainer}>
          <View style={styles.nickNameContainer}>
            <View style={styles.nickNameSubContainer}>
              <Image source={require("../assets/icons/nickname.jpg")} />

              <TextInput
                keyboardType="default"
                style={styles.inputMail}
                placeholder="Nickname"
                placeholderTextColor="#707070"
                onChangeText={(text) => setNickname(text)}
                defaultValue={nickname}
                onBlur={checkNickname}
              />
            </View>
          </View>

    <Text style={{textAlign: 'center', marginBottom:10, color:"red"}}> {errornickname} </Text>

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
                onBlur={checkMail}
              />
            </View>
          </View>
          <Text style={{textAlign: 'center', marginBottom:0, color:"red"}}> {errormail} </Text>


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
                onBlur={checkpass}
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

          <View style={styles.passwordContainer}>
            <View style={styles.passwordSubContainer}>
              <Image source={require("../assets/icons/city.jpg")} />
            
                <Picker 
                iosHeader="Choose City"
                mode = "dropdown" 
                selectedValue = {city} 
                onValueChange = {city =>checkcity(city)}
                iosIcon = {<Icon name="arrow-down" style={{marginLeft: 110, color: '#707070'}} />} //fix margin
                placeholder ={<Text style={{color: '#707070', fontSize:15}}>Choose City</Text>}
            
                >
                    <Picker.Item label = "Riyadh" value = "Riyadh"/>
                    <Picker.Item label = "Jeddah" value = "Jeddah"/>
                </Picker>
                


</View>
          </View>
          <Text style={{textAlign: 'center', marginBottom:0, color:"red"}}> {errorcity} </Text>


          <View style={styles.dobContainer}>
            <View style={styles.dobSubContainer}>
              <Image source={require("../assets/icons/Calendar.jpg")} />

              <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={DOB} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder={<Text style={{color: '#707070'}}>Date of Birth</Text>}
          format="DD-MM-YYYY"
          minDate="01-01-1920"
          maxDate="31-12-2010"
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
          onDateChange={DOB =>checkDOB(DOB)}
         
        />
      </View>
    </SafeAreaView>

             {/*  <DobPicker /> */}
            </View>
          </View>
          <Text style={{textAlign: 'center', marginBottom:0, color:"red"}}> {errorDOB} </Text>


                  <View style={styles.genderContainer}>

                  <RadioButton.Group onValueChange={gend => checkGend(gend)} value={gend}>

                  <RadioButton.Item 
                  style = {styles.maleContainer} color="#7D34E3" label="Female" value="Female" />
                  <RadioButton.Item style = {styles.maleContainer} color="#7D34E3"label="Male" value="Male" />

                  </RadioButton.Group>


          </View>  
          <Text style={{textAlign: 'center', marginTop:2, color:"red"}}> {errorgend} </Text>

        </View>

                  {/* for testing if the value of city is saved after selection from the picker component*/}
                  {/*<View><Text>{city}</Text></View>*/}



        <TouchableOpacity
          style={styles.cardBottomCircle}
          onPress={SSignUp}
        >
          <AntDesign name="arrowright" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      </ScrollView>
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

  signupCardContainer: {
    width: wp("85%"), 
    height: hp("80%"),//white container, maha
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    bottom: hp("2%"),
  },
  topTextContainer: {
    flexDirection: "row",
    padding: hp("3%"),
    alignItems: "center",
    marginBottom: hp("-1.5%"),
  },
  signUp: {
    fontSize: 18,
    fontFamily: "MoskBold700",
  },

  signinLine: {
    borderBottomWidth: 2,
    width: wp("15.5%"),
    marginVertical: hp(".5%"),
    borderBottomColor: "#7D34E3",
    fontFamily: "MoskMedium500",
  },

  signIn: {
    fontSize: 18,
    color: "#B0B6BA",
    marginRight: wp("10%"),
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
    marginBottom: 5
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
    marginBottom: 5
  },
  passwordSubContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  inputsMainContainer: {},

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
    padding: hp("1%"),
    alignSelf: "center",
    
  },
  cardBottomCircle: {
    width: 50,
    height: 50,
    borderRadius: 28,
    backgroundColor: "#7D34E3",
    alignSelf: "center",
    borderWidth: 6,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: hp("-4.8%"),
  },

  nickNameContainer: {
    width: wp("75%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginBottom: hp("1.5%"),
    marginBottom: 5,
    marginTop: 5
  },

  nickNameSubContainer: {
    flexDirection: "row",
  },
  dobContainer: {
    width: wp("75%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginTop: hp("1.3%"),
    marginBottom: 5
  },
  dobSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  maleContainer: {
    width: wp("36%"),// change maha
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginTop: hp("1.3%"),
    marginLeft: 5, // change maha
    marginRight:5, // change maha
  },

  maleSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  genderContainer: {
    flexDirection: "row",
    alignSelf: "center",
  },
});
