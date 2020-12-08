import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  // Alert
} from "react-native";
import Header from "../Components/Header";
import { useFocusEffect } from '@react-navigation/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

//card images
import bella from "../assets/bella.png";
import kabab from "../assets/kababjees.png";
import tandoor from "../assets/tandoor.png";
import cafe from "../assets/cafe.png";
import spice from "../assets/spice.png";
import hardees from "../assets/hardees.png";

//star
import star from "../assets/icons/star.png";
import halfstar from "../assets/icons/halfstar.png";
import emptystar from "../assets/icons/emptystar.png";

//Hearts
import emptyheart from "../assets/icons/Heart.png";
import Heart2 from "../assets/icons/redHeart.png";

//////////////////////
import { ScrollView } from "react-native-gesture-handler";
import HomeCard from "../Components/HomeCard";
import ModalButtons from "../Components/ModalButtons";
import ModalButtons2 from "../Components/ModalButton2";
import PriceSegment from "../Components/PriceSegment";
import {getUserId} from '../apis/LocalDB'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import '@react-native-firebase/database';

export default function FavoriteScreen({ navigation }) {
   fetchBookmarks = async ()=>{
     console.log('call')
    let allBookmarks=[];
    let fetch = firebase.database().ref('user/'+userId).child('/bookmarks/');
   fetch.on('value', (snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
            let item = childSnapshot.val();
            let key = Object.keys(item)
            // console.log('itemsss',key)
            allBookmarks.push(item);
            setLoading(false);
        });
        setBookmarkItems(allBookmarks)
      })
  
    } 
    removeBookmark = (bookmarkItems) =>{
      var bookmark = firebase.database().ref('user/'+userId+'/bookmarks').child(bookmarkItems.name);
      bookmark.remove().then(()=>{
        console.log('removed')
        alert('UnBookmarked')
        fetchBookmarks()
      }).catch(()=>{
        console.log('error removing')
      })
    }
    useFocusEffect(
      React.useCallback(() => {
        getUserId(user)
        setLoading(true);
      }, [])
    );

   const user = value => {
      if (value !== null && value !== '') {
            console.log('valuefavyuyuy',value)
            setUserId(value)
            fetchBookmarks()
      }
    }
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState()
  const [bookmark, setBookmark] = useState(true)
  const [bookmarkItems, setBookmarkItems] = useState([])
  const bookmarkItemArray = []
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
          <View style={styles.titleContainer}>
            <Text style={styles.Recomend}>Favorites</Text>
          </View>
          {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
          />
        ) : (
          <ScrollView>
          <FlatList
          data={bookmarkItems}
          renderItem={({item,index}) =>{
          return (
            <TouchableOpacity onPress={() =>
              navigation.navigate("ActivityInformationScreen",{
                object: item,
                response: true
              })}>
            <View style={styles.container1}>
              <Image source={{uri:item.image}} style={styles.cardImage} resizeMode={"cover"}/>
      
              <View>
                <View style={styles.ratingsContainer}>
                  <Text numberOfLines = {1} style={styles.cardTextTitle}>{item.name}</Text>
      
                  <View style={styles.starContainer}>
      
                  </View>
                </View>
      
                <View style={styles.subtitle3Container}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.subtitle3}>More Informatiom</Text>
                    <Image source={require("../assets/icons/down-arrow.png")} />
                  </View>
      
                  <TouchableOpacity 
                          onPress={() => {
                            setBookmark(false)
                            removeBookmark(item)
                          }}>
                    <Image source={Heart2} style={{height:20,width:20,resizeMode:'contain',tintColor:bookmark === false ? null : 'red'}} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>      
           )
          }
          }
          // extraData={detailActivity}
          numColumns={2}
          // keyExtractor={(item, index) => index}
        />   
        </ScrollView>  
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

  
  Recomend: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginLeft: wp("3%"),
  },

  titleContainer: {
    flexDirection: "row",
    marginHorizontal: wp("5%"),
    marginVertical: hp("4%"),
    bottom: hp("1.3%"),
  },

  container1: {
    width: wp("44.5%"),
    // height: hp("24%"),
    backgroundColor: "#fff",
    margin: wp("3%"),
    borderRadius: 12,
    elevation: 5,
    // padding:wp('2%')
  },

  cardImage: {
    width: wp("45%"),
    height: hp("15%"),
    borderRadius: 12,
  },

  cardTextTitle: {
    fontFamily: "MoskBold700",
    fontSize: wp('4%'),
    color: "#454F63",
    marginRight:5
  },

  ratingsContainer: {
    // flexDirection: "row",
    alignItems: 'flex-start',
    // justifyContent: "space-between",
    margin: 5,
  },

  starContainer: {
    flexDirection: "row",
  },
  ratingText: {
    fontFamily: "MoskMedium500",
    fontSize: 10,
    color: "#454F63",
    marginLeft: wp("2%"),
    opacity: 0.8,
  },
  subtitle1Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginTop: hp("-.4%"),
  },

  subtitle1: {
    fontSize: 12,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
  },

  subtitle2Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginTop: hp(".1.5%"),
  },

  subtitle2: {
    fontSize: 12,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
  },

  subtitle3: {
    fontSize: 10,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
    marginRight: 3,
  },

  subtitle3Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginVertical: hp(".5%"),
    justifyContent: "space-between",
  },
});
