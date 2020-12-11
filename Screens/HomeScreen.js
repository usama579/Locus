import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Platform, Image,FlatList,ActivityIndicator, SafeAreaView } from "react-native";
import Header from "../Components/Header";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

//import Homecardd from "../Components/Homecardd";
import HomeCard from "../Components/HomeCard";

//card images


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
import { ScrollView } from "react-native-gesture-handler";


import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export default function HomeScreen({ navigation }) {
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });
  const [loading, setLoading] = useState(true);
  const bella = "https://pbs.twimg.com/media/C56DkeFWYAIarxw.jpg";
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [tryyy, settryy] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [values, setvalues] = useState("");
  const [detailActivity, setDetailActivity] = useState([]);

  fetchDetailActivity = async ()=>{
    let allDetail=[];
    firebase.database().ref('Activities').on('value', (snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
            childSnapshot.forEach((subChildSnapshot)=> {
              subChildSnapshot.forEach((multiSubChildSnapshot)=> {
                let subItem = multiSubChildSnapshot.val();
              allDetail.push(subItem);
              });
            });
          });    
             
        console.log("allDetail:",allDetail)
        allDetail.sort((a,b) => {
          let d1=distance(a.geometry.location.lat,a.geometry.location.lng);
          let d2=distance(b.geometry.location.lat,b.geometry.location.lng);
          if(d1 < d2) 
          return  -1;
          else if(d2 <d1)
          return 1;
          else 
          return 0;
          })
        const items = allDetail.slice(0, 10)
        setDetailActivity(items)
        setLoading(false);
      })
    
  }

  function distance(lat2, lon2) {
    let lat1 = 24.753006
    let lon1 = 46.674387
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      dist = dist * 1.609344 
      return dist;
    }
  }

  useEffect(()=>{
    fetchDetailActivity()
 },[])
/* useEffect(() => {  */      
 /*  firebase.database().ref('TemproryEvent').child('1').once('value').then((snapshot) => {

      snapshot.forEach((child) => {
        values.push(child.val());
      });
   
    });
 */

//console.log("haaaaai"+image);
/*   var storage = firebase.storage();
 // setImage("https://firebasestorage.googleapis.com/v0/b/locus-gp.appspot.com/o/header-web.png?alt=media&token=39708241-8ba2-4b45-b6fe-69530f6c4b91");
 // console.log("haaaaaiyooo"+image);

// Create a storage reference from our storage service
var storageRef = storage.ref();
storageRef.child('header-web.png').getDownloadURL().then(function(url) {
  setImage(url);
})  */
//console.log("hi"+image);
/* const fetchData = async () => {  
  const myitems = await firebase.database().ref('TemproryEvent').child('1');
  myitems.once("value", datasnap => {
    //datasnap.forEach((child) => {
      setvalues(datasnap);
   // })
  
  })

}
fetchData();

  });
 */

/*   values.map((val) => {
    console.log(val);
}); */

//console.log(image);



  if (!loaded) {
    return <AppLoading />;
  }


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#fff"
        translucent={true}
      />
      <Header />

      <ScrollView style={{ zIndex: -5 }} showsVerticalScrollIndicator={false}>
        {/* First Cards rows */}
        <View>
          <Text style={styles.Recomend}>Recommended for you</Text>

          <ScrollView
            style={{ marginTop: hp("-5%") }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardFirstRow}>
              <HomeCard
                image={bella}
                title="Bella Vita"
               star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
               // subTitle1="Khayaban shahbaz (Karachi)"
            //    subTitle2="Burgers Beverage Italian American Fast Food"
                heart={emptyheart}
                // onPress2={() =>
                //   navigation.navigate("ActivityInformationScreen")
                // }
              />

              <HomeCard
                image={bella}
                title="Kababjees"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={emptyheart}
                // onPress2={() =>
                //   navigation.navigate("ActivityInformationScreen")
                // }
              />
              <HomeCard
                image={bella}
                title="Bella Vita"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={emptyheart}
                // onPress2={() =>
                //   navigation.navigate("ActivityInformationScreen")
                // }
              />
            </View>
          </ScrollView>
        </View>

        {/* Second Cards rows */}
        <View>
          <Text style={styles.othersLike}>What others like</Text>

          <ScrollView
            style={{ marginTop: hp("0%") }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardFirstRow}>
              <HomeCard
                image={bella}
                title="Tandoor"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={emptystar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={emptyheart}
                // onPress2={() =>
                //   navigation.navigate("ActivityInformationScreen")
                // }
              />

              <HomeCard
                image={bella}
                title="Cafe Bogie"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={emptyheart}
                // onPress2={() =>
                //   navigation.navigate("ActivityInformationScreen")
                // }
              />
              <HomeCard
                image={bella}
                title="Bella Vita"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={emptyheart}
                // onPress2={() =>
                //   navigation.navigate("ActivityInformationScreen")
                // }
              />
            </View>
          </ScrollView>
        </View>

        {/* Third Cards rows */}

        <View>
          <Text style={styles.othersLike}>Near to you</Text>
          {loading ? (
          <ActivityIndicator
            //visibility of Overlay Loading Spinner
            visible={loading}
            textContent={'Loading...'}
            textStyle={{fontSize:20,color:'blue'}}
          />
        ) : (
          <>
          {(loading==false && detailActivity.length <= 0 ) ?
          <View style={{alignSelf:'center'}}>
          <Text style={{fontSize:20}}>No data found</Text>
          </View>
          :
          <FlatList
          data={detailActivity}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item,index}) =>{
            // item search in (bookmarkitem)
            //const response= bookmarkedItems.some((selectedItem)=> selectedItem.name === item.name);
            // const {image,name}=item
            //console.log("componentDidMount on detail catagory",response) 
          return (
            // <View style={styles.cardFirstRow}>
              <HomeCard
                image={item.image}
                title={item.name}
                heart={null}
                item={item}
                index={index}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen",{
                    object: item,
                    response:false
                  }) 
               }
              />
            // </View>
           )
          }
          }
          extraData={detailActivity}
          keyExtractor={(item, index) => index}
          />
          }
          </>
        )} 
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
    marginVertical: wp("10%"),
    marginHorizontal: wp("7%"),
  },

  cardFirstRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: wp("4%"),
  },

  othersLike: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginVertical: wp("0%"),
    marginHorizontal: wp("7%"),
  },
});
