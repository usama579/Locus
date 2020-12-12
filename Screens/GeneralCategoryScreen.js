import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
  Text,
  Modal,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";

import Header from "../Components/Header";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SightImage from "../assets/sightImage.png";
import sight from "../assets/icons/sight.png";
import PriceSegment from "../Components/PriceSegment";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { ScrollView } from "react-native-gesture-handler";

import CityPicker from "../Components/CityPicker";
import CategoryBox from "../Components/CategoryBox";
import { useFocusEffect } from '@react-navigation/native';

//images
import backImage from "../assets/cafeCat.png";
import centerImage from "../assets/icons/cup.png";

import {getUserId} from '../apis/LocalDB'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default function GeneralCategoryScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [pass, setPass] = useState("");
  const [filter, setFilter] = useState(false);
  const [activity, setActivity] = useState([]);
  const [userId, setUserId] = useState('')
  const [customActivity,setCustomActivity] = useState([]);
  const [categoryIds,setCategoryIds] = useState([])

  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });
    fetchActivity = async ()=>{
      let fetch =  await firebase.database().ref('Activities');
      fetch.on('value', (snapshot)=> {
     //const response = await getAllActvities()
     console.log("componentDidMount on catagory")
      let todosKeys=Object.keys(snapshot.val());
      setActivity(todosKeys)
      setLoading(false);
    });
    }
    
   
    
useEffect(()=>{
  fetchActivity()
      setLoading(true)
      getUserId(value => {
        if (value !== null && value !== '') {
          console.log("value:",value)
              setUserId(value)
        }
      })
},[])
  if (!loaded) {
    return <AppLoading />;
  }
  function getUnique (array){
    var uniqueArray = [];
    
    // Loop through array values
    for(i=0; i < array.length; i++){
        if(uniqueArray.indexOf(array[i]) === -1) {
            uniqueArray.push(array[i]);
        }
    }
    return uniqueArray;
}
  onChangeText = (text) => {
    setPass(text)
    setFilter(true)
    let array=[...activity]
      array = array.filter(function (item) {
      return item.includes(text)
      })
      console.log("array filter by credit cards :",array)
      setCustomActivity(array)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
    
      <View style={styles.searchContainer}>
        <View style={styles.searchSubContainer}>
          <Image source={require("../assets/icons/searchIcon.png")} />

          <TextInput
            keyboardType="numbers-and-punctuation"
            style={styles.inputpass}
            placeholder="What are you looking for"
            placeholderTextColor="#707070"
            onChangeText={onChangeText}
            defaultValue={pass}
          />
        </View>
      </View>

      <View style={styles.categortConteiner}>
        <Text style={styles.Recomend}>Browse Activities in</Text>
        
        <View style={{width:wp('30%'),borderRadius:10,borderWidth:0.5,
        height:hp('5%'),justifyContent:'center',borderColor:"#cccccc",}}>
        <CityPicker />
        </View>
       
      </View>
      {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{fontSize:20,color:'blue'}}
          />
        ) : (
          <>
        {(activity.length <= 0 || ((customActivity <= 0) && filter)) ?
          <View style={{alignSelf:'center'}}>
          <Text style={{fontSize:20}}>No data found</Text>
          </View>
          :  
        <FlatList
          data={filter ? customActivity:activity}
          renderItem={({ item }) => (
          <View style={styles.catRow2}>
          <CategoryBox
            centerImage={centerImage}
            backImage={backImage}
            text={item}
            onPress={() =>{
                navigation.navigate("CategoryClickScreen", {
                  title: item,
                })
            }}
          />
          </View>
          )
          }
          extraData={filter ? customActivity:activity}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        }
        </>
        )}

  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  searchContainer: {
    width: wp("90%"),
    height: hp("7%"),
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset:{
      width:0,
      height: 1},
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "space-between",
    padding: wp("5%"),
    marginTop: hp("5%"),
    flexDirection: "row",
    alignItems: "center",
  },
  searchSubContainer: {
    flexDirection: "row",
  },

  inputpass: {
    width: wp("70%"),
    height: hp("2.5%"),
    paddingHorizontal: wp("3%"),
    fontSize: 16,
    fontFamily: "MoskMedium500",
  },

  Recomend: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
  },

  passwordContainer: {
    width: wp("29%"),
    height: hp("5%"),
    elevation: 2,
    backgroundColor: "#fff",

    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
  },
  passwordSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  categortConteiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: hp("3%"),
  },

  catRow1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  catRow2: {
    alignItems: "stretch",
    alignSelf:"center",
    justifyContent: "space-evenly",
    marginTop: hp("1%"),
  },

  modalView: {
    width: "100%",
    height: "80%",
    marginTop: "60%",
    backgroundColor: "#7D34E3",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,

    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "orange",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    bottom: hp("3%"),
  },
  textStyle: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },

  bottomText: {
    marginTop: hp("0.8%"),
    color: "#D6D6D8",
    fontSize: wp("3.5%"),
  },
  text1View: {
    width: wp("50%"),
    marginLeft: wp("4%"),
  },
  pdf: {
    color: "#D6D6D8",
  },

  modalTopContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: wp("100%"),
    marginTop: hp("4%"),
  },

  filters: {
    fontSize: 25,
    color: "#fff",
    fontFamily: "MoskBold700",
    fontWeight: "bold",
  },

  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    width: wp("85%"),
    marginTop: hp("3%"),
  },

  sortBy: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    fontWeight: "500",
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: wp("9%"),
    marginVertical: hp("2%"),
  },

  nearestContainer: {
    width: wp("90%"),
    height: hp("6%"),
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
  },
  nearestSubContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  nearestText: {
    fontSize: 14,
    fontFamily: "MoskMedium500",
    color: "#fff",
  },

  price: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    fontWeight: "500",
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: wp("9%"),
    marginVertical: hp("2.5%"),
  },

  feature: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    fontWeight: "500",
    color: "#fff",
    alignSelf: "flex-start",
    marginHorizontal: wp("2%"),
    marginVertical: hp(".5%"),
  },

  passwordContainer: {
    width: wp("90%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#fff",
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
});
