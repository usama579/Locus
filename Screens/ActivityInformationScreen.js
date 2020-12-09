import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  Button,
  FlatList
} from "react-native";
import Header from "../Components/Header";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import ActivityCard from "../Components/ActivityCard";
import { Rating } from 'react-native-ratings';
import Boy from "../assets/boy.png";
import Girl from "../assets/girl.png";

//card images
import bella from "../assets/bella.png";

//star
import star from "../assets/icons/star.png";
import halfstar from "../assets/icons/halfstar.png"
import starrr from "../assets/icons/starrr.png";


//Hearts
import emptyheart2 from "../assets/icons/Heart2.png";
import { ScrollView } from "react-native-gesture-handler";
import RatingsCard from "../Components/RatingsCard";
import { useSafeArea } from "react-native-safe-area-context";
import * as firebase from 'firebase/app';
import shareicon from "../assets/icons/share.png";
import { useFocusEffect } from '@react-navigation/native';
import {getUserId} from '../apis/LocalDB'

import 'firebase/auth';
import 'firebase/database';
import { saveUserId } from "../apis/LocalDB";

/*       var endPoints = {
        'getVenueDetailById': 'https://api.foursquare.com/v2/venues/',
        'getVenueCategories': 'https://api.foursquare.com/v2/venues/categories',
        'getPopularVenues': 'https://api.foursquare.com/v2/venues/explore',
        'searchVenues': 'https://api.foursquare.com/v2/venues/search',
        'getTrendingVenues': 'https://api.foursquare.com/v2/venues/trending',
    } */

export default function ActivityInformationScreen({ navigation, route}) {
  const { object,response,fromFav } = route.params;
  const {image,name,rating,features}=object
  const [bookmark,setBookmark] = useState(response)
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });
  const [feature,setFeature]=useState([]);
  const [star,setStar]=useState([]);
  const [placename, setPlacename] = useState("");
  const [placelocation, setPlacelocation] = useState("");
  const [pictureurl, setPicureurl] = useState("");
  const [placedescription, setPlacedescription] = useState("");
  const [placeid, setPlaceid] = useState("");
  const [venues, setVenueState] = useState([]);  
  const [userId, setUserId] = useState()


  saveBookmarks = (bookmarkItems) => {
    let allDetail=[];
    var bookmark = firebase.database().ref('user/'+userId+'/bookmarks').child(bookmarkItems.name);
    // var bookmarkPush = bookmark.push();
    bookmark.set(bookmarkItems)
    .then(()=>{
      console.log('success',bookmarkItems.name)
      alert('Bookmarked')
      navigation.navigate('GeneralCategoryScreen')
    }).catch(()=>{
      console.log('error')
    })
        // setDetailActivity(allDetail)
    } 

    removeBookmark = (bookmarkItems) =>{
      var bookmark = firebase.database().ref('user/'+userId+'/bookmarks').child(bookmarkItems.name);
      bookmark.remove().then(()=>{
        console.log('removed')
        alert('UnBookmarked')
        if (fromFav){
      navigation.navigate('FavoriteScreen')
    }else{
      navigation.navigate('GeneralCategoryScreen')
    }
      }).catch(()=>{
        console.log('error removing')
      })
    }

    const save = item => {
      if(bookmark != true){
          saveBookmarks(item)
          console.log('select',item.name)
      }
      else{
        removeBookmark(item);
        console.log('unselect',item.name)
      }
    }

    useFocusEffect(
      React.useCallback(() => {
        setBookmark(response)
        getUserId(user)
       let list=[];
       list=Object.values(features)
       setFeature(list) 
       console.log("features list:",feature,bookmark)
       const roundValue=Math.round(rating)
       let i;
       let ratingList=[];
       for (i = 0; i < roundValue; i++) {
        ratingList.push(i)
       }
       setStar(ratingList)
       console.log("star:",star)
      }, [])
    );
   
  const user = value => {
    if (value !== null && value !== '') {
          setUserId(value)
    }
  }
  
/*   const NearbyPlaces = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=24.7136,46.6753&radius=50000&type=campground&key=AIzaSyDgH0ZpaFEJ2HpSRxevHaeTupKpfZlVsBs";
 
  const SearchPlaceURL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=restaurant&inputtype=textquery&fields=photos,formatted_address,name,place_id,geometry&key=AIzaSyDgH0ZpaFEJ2HpSRxevHaeTupKpfZlVsBs";

    //call parameters
    const params = {}; 
  
      const getVenues = () =>   
      {
      
      fetch(NearbyPlaces + new URLSearchParams(params), { 
        method: 'GET' 
        }).then(response => response.json()).then((response) => {
          setVenueState(response.results);
          console.log(venues[0]['geometry']);
            });         
        };

  */


/*    const ClientID = "1OGVD2BR242MZOXE1QOICQYKPSYMPWH5LBWUD4PSFCLVRRRE";
  const ClientSecret = "MCO4PEFWBBUNYPZHABL15UEMEXJHKX0YAH0VLYAQYNGYHPLW";
  const DefaultLangLat = "24.7136,46.6753";
  //this link changes based on request type
  const VenueExploreURL = 'https://api.foursquare.com/v2/venues/search?ll=24.7,46.6&client_id=1OGVD2BR242MZOXE1QOICQYKPSYMPWH5LBWUD4PSFCLVRRRE&client_secret=MCO4PEFWBBUNYPZHABL15UEMEXJHKX0YAH0VLYAQYNGYHPLW';

  //call parameters
  const params = {
    client_id: ClientID,  
    client_secret: ClientSecret, 
    limit: 20, //The max number of venues to load
    query: 'Art Gallery', //The type of venues we want to query
     v: '20180323', //The version of the API.
    ll: DefaultLangLat 
    }; 

    const getVenues = () =>   
    {
    
    fetch(VenueExploreURL + new URLSearchParams(params), { 
      method: 'GET'
      }).then(response => response.json()).then((response) => {
        setVenueState(response.response.venues);
        console.log(venues.length);
          });         
      };
 */
/*       useEffect(() => {
        
        getVenues(); 
        addVenues();  
      
      },[]);
      const addVenues = async() => { 

      if (venues){ 
        try {  
          const response = await firebase
            
          if (response) { 
            const wait = await firebase
              .database()
              .ref('Activities')
              .child('Campgrounds') 
              .set({Venues:venues});
          }
        } catch (error) {
            alert('Not Added Successfully');} 
        } 

      }    */

    /*   const [resultArray, setresultArray] = useState("");
      
      useEffect(() => {

      
        firebase.database().ref('Activities/Art Galleries/Venues/0/photos/0').child("photo_reference").once('value').then((snapshot) => {
        //  firebase.database().ref('Activities/Art Galleries').child("Venues").once('value').then((snapshot) => {
         // setresultArray(snapshot);
          console.log(snapshot);
           
        });  
        

      },[]);
 */
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <Header />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: hp("-5%"), zIndex: -1 }}
      >
        <View style={styles.titleContainer}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Image source={require("../assets/icons/backArrow.png")} />
          </TouchableWithoutFeedback>
          
          <TouchableWithoutFeedback> 
           <Image source={shareicon} style={styles.share} />
          </TouchableWithoutFeedback>
        
          <TouchableWithoutFeedback 
          onPress={()=>
          {
            setBookmark(!bookmark)
            save(object)
          }}> 
          <Image source={emptyheart2} style={[styles.heart,{tintColor: bookmark || response == true? 'red' : null}]} />
          </TouchableWithoutFeedback>
             
             

         {/*  <Text style={styles.Recomend}>Activity Information</Text> */}
        </View>


      <View>
        </View>

<TouchableWithoutFeedback>
      <View style={styles.container2}>
      <View>
        </View>
        <Image source={{uri:image}}  style={styles.cardImage}/>
        <View>
        <Text style={styles.cardTextTitle}>{name}</Text>
            <View style={styles.starContainer}>
            <FlatList
            contentContainerStyle={styles.starFlatListContainer}
            data={star}
            renderItem={() =>{
            return (
              <Image
              source={starrr}
              style={{ width:20, height:20}}
              />
             )}
             }
             extraData={star}
             keyExtractor={(item, index) => index}
            />
            <Text style={styles.ratingText}>{rating}/5</Text>
            </View>
          <View style={styles.subtitle1Container}>
            <Image
              source={require("../assets/icons/locicon.png")}
              style={{ marginTop: hp("1.5%") ,width:20, height:20, opacity: 0.5}}
               />
              <Text style={styles.subtitle1}>placelocation</Text>
              
              <TouchableWithoutFeedback>
              <Image
              source={require("../assets/icons/mapping.png")}
              style={{ marginTop: hp("2.5%") ,width:20, height:20, marginLeft: 'auto'}}
               />
               </TouchableWithoutFeedback>
          </View>

     <View
     style={{ borderBottomColor: '#8338EB', borderBottomWidth: 3 , paddingTop:10}}>
  </View>

{/*   <View style={styles.featuresContainer}> */}
           {/*  <Image source={require("../assets/icons/plate2.png")} /> */}
                    </View>
      </View>
    </TouchableWithoutFeedback>

     {/*    <Text style={styles.pictures}>Pictures</Text> */}

        <View style={styles.picMainContainer}>
        <Text style={styles.subtitle2}>Features</Text>
            <FlatList
            data={feature}
            renderItem={({item}) =>{
            return (
            <View style={styles.subtitle1Container}>
            <Text>{item}</Text>  
            </View>
           )}
          }
          extraData={feature}
          keyExtractor={(item, index) => index}
            />
         {/*  </View> */}
          {/* <View style={styles.subtitle2Container}>
            <Image source={require("../assets/icons/plate2.png")} />
            <Text style={styles.subtitle2}>• For groups</Text>
          </View> */}

          <View style={styles.subtitle3Container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.subtitle3}>• For groups</Text>
            </View>
          </View>

          <View style={styles.subtitle3Container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.subtitle3}>• Credit cards</Text>
            </View>
          </View>


        {/*   <View style={styles.picFirstRow}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Image
                style={styles.image1}
                source={require("../assets/bella.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Image
                style={styles.image1}
                source={require("../assets/cafe.png")}
              />
            </TouchableOpacity>
          </View> */}

         {/*  <View style={styles.pic2ndRow}>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Image
                style={styles.image1}
                source={require("../assets/kababjees.png")}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <Image
                style={styles.image1}
                source={require("../assets/hardees.png")}
              />
            </TouchableOpacity>
          </View> */}

         {/*  <Text style={styles.review}>Reviews</Text>  */}

        {/*   <RatingsCard title="Maxime Barbosa" image={Boy} />
          <RatingsCard title="Marie Winter" image={Girl} /> */}
        </View>
      </ScrollView>

      <View style={styles.modalContainer}>
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image
                style={{
                  width: wp("92%"),
                  height: hp("50%"),
                  resizeMode: "contain",
                  marginLeft: wp("2.5%"),
                }}
                source={require("../assets/bella.png")}
              />

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Minimize</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: "#fff",
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
    marginVertical: hp("5.5%"),
    bottom: hp("-3.5%"),
  },

  pictures: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginLeft: wp("6%"),
    marginTop: hp("2%"),
  },

  picFirstRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  pic2ndRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp("2%"),
    paddingBottom: hp("10%"),
  },

  image1: {
    width: wp("40%"),
    height: hp("15%"),
    borderRadius: 10,
  },
  picMainContainer: {
    paddingHorizontal: hp("3%"),
  },
  review: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginLeft: wp("6%"),
    bottom: wp("16%"),
  },

  ratingsContainer: {
    width: wp("90%"),

    elevation: 3,
    backgroundColor: "#fff",
    bottom: hp("5%"),
    borderRadius: 10,
    paddingBottom: hp("5%"),
  },
  heart: {
    flexDirection:"row-reverse",
    marginLeft: 'auto',
    marginTop: hp("0.4%")
  },
  share:{
    flexDirection:"row-reverse",
    marginLeft: 'auto',
    marginRight:250,
    width:20,
    height:20,
    opacity:0.4
  },
  modalView: {
    marginTop: hp("20%"),
    width: wp("90%"),
    alignSelf: "center",
    backgroundColor: "white",

    borderRadius: 20,
    height: hp("50%"),
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: hp("-2.5%"),
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle3Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginTop: hp(".5%"),
    justifyContent: "space-between",
    paddingTop: 5,
  },
  subtitle3: {
    fontSize: 20,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
    marginRight: 3,
  },
  subtitle2: {
    fontSize: 22,
    fontFamily: "MoskBold700",
    marginLeft: wp(".5%"),
    textAlign: 'center',
  },
  subtitle2Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginBottom: hp("1%"),
    
  },
  featuresContainer:{
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginBottom: hp("1%"),
    paddingTop:20,

  },
  subtitle1: {
    fontSize: 18,
    fontFamily: "MoskMedium500",
    marginLeft: wp("1%"),
    marginBottom: hp("-1.5%"),
    color:'black'
  },
  subtitle1Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginTop: hp(".5%"),
  },
  ratingText: {
    fontFamily: "MoskMedium500",
    fontSize: 18,
    color: "black",
    marginLeft: wp("2%"),
    opacity: 0.8,
    marginBottom: hp("-0.3%"),

    
  },
  starContainer: {
    paddingTop:5,
    width:"45%",
    alignSelf:"center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  starFlatListContainer: {
    paddingTop:5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: hp("1%"),
  },
  cardTextTitle: {
    paddingTop: 5,
    fontFamily: "MoskBold700",
    fontSize: 25,
    textAlign: 'center'

  },
  cardImage: {
    width: wp("85%"),
    height: hp("29%"),
    resizeMode: "cover",
    borderRadius: 12,
    //justifyContent: "center",
    alignSelf: "center"
  },
  container2: {
    width: wp("87%"),
    height: hp("48%"),
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    alignSelf: "center",
  },

});