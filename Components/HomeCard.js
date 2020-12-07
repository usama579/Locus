import React,{useState,useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {getUserId} from '../apis/LocalDB'
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";
import { onChange } from "react-native-reanimated";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import '@react-native-firebase/database';
// import { TouchableOpacity } from "react-native-gesture-handler";


export default function HomeCard({
  item,
  image,
  title,
  index,
  star2,
  star3,
  star4,
  star5,
  heart,
  onPress2,
}) {
  saveBookmarks = (bookmarkItems) => {
    let allDetail=[];
    var bookmark = firebase.database().ref('user/'+userId+'/bookmarks').child(bookmarkItems.name);
    // var bookmarkPush = bookmark.push();
    bookmark.set(bookmarkItems)
    .then(()=>{
      console.log('success')
    }).catch(()=>{
      console.log('error')
    })
    console.log('21312312412',bookmarkItems)
        // setDetailActivity(allDetail)
    } 

    removeBookmark = (bookmarkItems) =>{
      var bookmark = firebase.database().ref('user/'+userId+'/bookmarks').child(bookmarkItems.name);
      bookmark.remove().then(()=>{
        console.log('removed')
      }).catch(()=>{
        console.log('error removing')
      })
    }

    useEffect(()=>{
      getUserId(user);
      console.log('item')
   },[])
   
  const user = value => {
    if (value !== null && value !== '') {
          console.log('value',value)
          setUserId(value)
    }
  }
  const [userId, setUserId] = useState()
  const [bookmark, setBookmark] = useState(false)
  const [bookmarkItems, setBookmarkItems] = useState([])
  let bookmarkItemArray = []

const save = item => {
  if(bookmark != true){
    // console.log('sads',item.name)
      // bookmarkItemArray.push(item.name)
      // setBookmarkItems(...bookmarkItems,item.name)
      saveBookmarks(item)
      // console.log('select',bookmarkItems)
      console.log('select',bookmarkItems)


  }
  else{
    removeBookmark(item);
    console.log('unselect',bookmarkItems)
  }
}
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });
 
  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <TouchableOpacity onPress={onPress2}>
      <View style={styles.container}>
        <Image source={image} style={styles.cardImage} resizeMode={"contain"}/>

        <View>
          <View style={styles.ratingsContainer}>
            <Text numberOfLines = {1} style={styles.cardTextTitle}>{title}</Text>

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
                        setBookmark(!bookmark);
                        console.log(bookmark)
      save(item)
                   
                    }}>
              <Image source={heart} style={{height:20,width:20,resizeMode:'contain',tintColor: bookmark === true ? 'red' : null}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
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
