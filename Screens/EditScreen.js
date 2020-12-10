import React, { useState,useEffect } from "react";
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
  SafeAreaView} from "react-native";

  import {widthPercentageToDP as wp, heightPercentageToDP as hp,} from "react-native-responsive-screen";
  import { AntDesign } from "@expo/vector-icons";
  import { useFonts } from "@use-expo/font";
  import { AppLoading } from "expo";
  import { RadioButton } from 'react-native-paper';
  import DatePicker from "react-native-datepicker";
  import { Icon,Picker } from "native-base";
import Header from "../Components/Header";


//importing stuff - components and assets
import DobPicker from "../Components/DobPicker";

import male from "../assets/icons/male2.png"; //GenderImages
import female from "../assets/icons/female2.png";//GenderImages

import {getUserId} from '../apis/LocalDB'
import { ScrollView } from "react-native-gesture-handler";
import {removeIdFromLocalDb} from '../apis/LocalDB'
import { useFocusEffect } from '@react-navigation/native';


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
////////////////////////////////////////


export default function EditScreen({ navigation }) {

  useFocusEffect(
    React.useCallback(() => {
      getUserId(userProfile)
    }, [])
  );
//user attributes
const [mail, setMail] = useState();
const [nickname, setNickname] = useState();
const [pass, setPass] = useState();
const [city, setCity] = useState();
const [DOB, setDOB] = useState();
const [gend, setGend] = useState();
const [userId, setUserId] = useState()
const [values, setvalues] = useState([]);

  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  

  SignOut = async() => {
    try{
  await firebase.auth().signOut()
  removeIdFromLocalDb()
    navigation.navigate("Welcome")
  }catch(error){
  alert('Unable to Sign Out right now!');
  }}

  fetchUserInfo = () =>{
    let item;
    let fetch = firebase.database().ref('user/'+userId);
    fetch.on('value', (snapshot)=> {
             item = snapshot.val();
             console.log('items:',item)
         });
         setNickname(item.nickname)
              setMail(item.email)
              setCity(item.city)
              setDOB(item.DateOfBirth)
              setGend(item.gender)
         
  }

  const userProfile = value => {
    if (value !== null && value !== '') {
          setUserId(value)
          fetchUserInfo()
    }
  }

  // var user = firebase.auth().currentUser;

  // firebase.database().ref('user').child(user.uid).once('value').then((snapshot) => {

  //   snapshot.forEach((child) => {
  //     values.push(child.val());
  //   });
    //alert(values[1]);
    // var city= values[1];  var email =values[2]; var gender =values[3]; var nickname = values[4];
  // });





    // var DateOfBirth = values[0];
    // var City= values[1];
    // var Email =values[2];
    // var Gender =values[3]; 
    // var Nickname = values[4];
    
  



Edit = async() => {


  reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }


  //////


var user = firebase.auth().currentUser;
if (user != null) {

  if(nickname){

    await firebase
    .database()
    .ref('user')
    .child(user.uid)
    .update({
      nickname:nickname,

        });}

  if(mail){

changeEmail = (currentPassword, mail) => {
  this.reauthenticate(currentPassword).then(() => {
    var user = firebase.auth().currentUser;
    user.updateEmail(newEmail).then(() => {
      console.log("Email updated!");
    }).catch((error) => { console.log(error); });
  }).catch((error) => { console.log(error); });
}


        
  }


  
  if(city){

    await firebase
    .database()
    .ref('user')
    .child(user.uid)
    .update({
      city:city,

        });



  }



  if(gend){

    await firebase
    .database()
    .ref('user')
    .child(user.uid)
    .update({
      gender: gend

        });



  }


  if(DOB){

    await firebase
    .database()
    .ref('user')
    .child(user.uid)
    .update({
      DateOfBirth: DOB,

        });



  }


alert("Update")

}
else{
  alert('something wrong')
}}

  return (
    <SafeAreaView style={styles.container}>
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleContainer}>
          <Text style={styles.Recomend}>Edit Information</Text>
          <Image source={require("../assets/icons/edit.png")} />
        </View>

        <View style={styles.signupCardContainer}>
          <View style={styles.inputsMainContainer}>
            <View style={styles.nickNameContainer}>
              <View style={styles.nickNameSubContainer}>
                <Image source={require("../assets/icons/nickname.jpg")} />







 
                <TextInput
                keyboardType="default"
                style={styles.inputMail}
                /////////////////
                defaultValue={nickname}
                ///////////
                placeholderTextColor="#707070"
                onChangeText={(text) => setNickname(text)}

                
              />

              </View>
            </View>

            <View style={styles.emailContainer}>
              <View style={styles.emailSubContainer}>
                <Image source={require("../assets/icons/mail.jpg")} />

        
              <TextInput
                keyboardType="email-address"
                style={styles.inputMail}


                ///////////
                defaultValue={mail}
                //////////

                
                placeholderTextColor="#707070"
                onChangeText={(text) => setMail(text)}

              />

              </View>
            </View>

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

            <View style={styles.passwordContainer}>
              <View style={styles.passwordSubContainer}>
                <Image source={require("../assets/icons/city.jpg")} />

                        <Picker 
                iosHeader={city}
                mode = "dropdown" 
                ////
                selectedValue = {city} 
                ////
                onValueChange = {city =>setCity(city)}
                iosIcon = {<Icon name="arrow-down" />}
                >
                    <Picker.Item label = "Riyadh" value = "Riyadh"/>
                    <Picker.Item label = "Jeddah" value = "Jeddah"/>
                </Picker>

              </View>
            </View>

            <View style={styles.dobContainer}>
              <View style={styles.dobSubContainer}>
                <Image source={require("../assets/icons/Calendar.jpg")} />

                
                <SafeAreaView>
      <View>
        <DatePicker
          
          date={DOB} // Initial date from state
          mode="date" // The enum of date, datetime and time
          format="DD-MM-YYYY"
          minDate="01-01-1950"
          maxDate="01-01-2021"
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
          onDateChange={DOB =>setDOB(DOB)}
        />
      </View>
    </SafeAreaView>

              </View>
            </View>

            <View style={styles.genderContainer}>
           
            <RadioButton.Group selectedValue={gend} onValueChange={gend => setGend(gend)} value={gend}>

<RadioButton.Item 
style = {styles.maleContainer} color="#7D34E3" label="Female" value="Female" />
<RadioButton.Item style = {styles.maleContainer} color="#7D34E3" label="Male" value="Male" />


</RadioButton.Group>


            </View>
          </View>
        </View>


        <View style={{flex: 1, flexDirection: 'row' , alignItems:'center', justifyContent:'center'}}>
        <TouchableOpacity
          
          style={{
            width: wp("30%"),
            height: hp("5%"),
            backgroundColor: "#7D34E3",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            margin:30,
            marginRight: wp("-10%"),
            marginTop: hp("1%"),
            marginBottom: hp("10%"),
            alignItems:'center', justifyContent:'center'
          }}
        >
          <Text
            style={{ color: "#fff", fontFamily: "MoskMedium500", fontSize: 18 }}
          >
            Edit
          </Text>
        </TouchableOpacity>





        <TouchableOpacity
          onPress={SignOut}
          style={{
            width: wp("30%"),
            height: hp("5%"),
            backgroundColor: "#7D34E3",
            borderRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            margin:50,
            marginRight: wp("8%"),
            marginTop: hp("1%"),
            marginBottom: hp("10%"),
            alignItems:'center', justifyContent:'center'
          }}
        >
          <Text
            style={{ color: "#fff", fontFamily: "MoskMedium500", fontSize: 18 }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  Recomend: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginLeft: wp("3%"),
  },

  titleContainer: {
    flexDirection: "row",
    marginHorizontal: wp("7%"),
    marginVertical: hp("4%"),
    alignItems: "center",
    justifyContent: "space-between",
  },

  signupCardContainer: {
    width: wp("85%"),
    height: hp("60%"),
    backgroundColor: "#fff",
    alignSelf: "center",
    borderRadius: 10,
    elevation: 5,
    bottom: hp("0%"),
    justifyContent: "center",
    alignItems: "center",
  },
  topTextContainer: {
    flexDirection: "row",
    padding: hp("3%"),
    alignItems: "center",
    marginBottom: hp("-1.5%"),
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
  },
  dobSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  maleContainer: {
    width: wp("35%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginTop: hp("1.3%"),
    marginLeft: 10,
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
