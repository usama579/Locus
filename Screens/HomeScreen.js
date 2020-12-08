import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar, Platform, Image } from "react-native";
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

  const bella = "https://pbs.twimg.com/media/C56DkeFWYAIarxw.jpg";
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [tryyy, settryy] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [values, setvalues] = useState("");
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
    <View style={styles.container}>
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

          <ScrollView
            style={{ marginTop: hp("0%") }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.cardFirstRow}>
              <HomeCard
                image={bella}
                title="Spice"
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
                title="Hardees"
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
      </ScrollView>
    </View>
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
