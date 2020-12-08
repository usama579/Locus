import React, { useState,useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Image,
  View,
  FlatList,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
  SafeAreaView,
  Text,
  Modal,
  TouchableOpacity,
} from "react-native";
import Header from "../Components/Header";

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
import * as firebase from 'firebase/app';
import 'firebase/auth';
import '@react-native-firebase/database';
//star
import star from "../assets/icons/star.png";
import halfstar from "../assets/icons/halfstar.png";
import emptystar from "../assets/icons/emptystar.png";

//Hearts
import emptyheart from "../assets/icons/Heart.png";
import Heart from "../assets/icons/redHeart.png";
import { ScrollView } from "react-native-gesture-handler";
import HomeCard from "../Components/HomeCard";
import ModalButtons from "../Components/ModalButtons";
import ModalButtons2 from "../Components/ModalButton2";
import PriceSegment from "../Components/PriceSegment";
import CityPicker2 from "../Components/CityPicker2";
import {getUserId} from '../apis/LocalDB'
export default function CategoryClickScreen({ navigation, route, onPress2 }) {
  const { title } = route.params;

  const [pass, setPass] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailActivity, setDetailActivity] = useState([]);

  const [userId, setUserId] = useState()
  const [unbookmarked, setUnBookmarked] = useState(false)
  const [bookmarkedItems, setBookmarkedItems] = useState([])
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  fetchDetailActivity = async ()=>{
    let allDetail=[];
    firebase.database().ref('Activities/'+title+'/Venues').on('value', (snapshot)=> {
            snapshot.forEach((childSnapshot)=> {
            let item = childSnapshot.val();
            allDetail.push(item);
        });
        setDetailActivity(allDetail)
      })
    
    }
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
         });
         setBookmarkedItems(allBookmarks)
         console.log(bookmarkedItems.length)
       })
      } 

  useEffect(()=>{
       fetchDetailActivity()
       getUserId(user);
    },[])

    const user = value => {
      if (value !== null && value !== '') {
            console.log('value',value)
            setUserId(value)
            fetchBookmarks()
      }
    }

  if (!loaded) {
    return <AppLoading />;
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
            placeholder="Search"
            placeholderTextColor="#707070"
            onChangeText={(text) => setPass(text)}
            defaultValue={pass}
          />

          <TouchableWithoutFeedback
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Image
              style={{
                alignSelf: "center",
              }}
              source={require("../assets/icons/modal.png")}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>

      <ScrollView style={{ zIndex: -5 }}  showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.titleContainer}>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("GeneralCategoryScreen")}
            >
              <Image source={require("../assets/icons/backArrow.png")} />
            </TouchableWithoutFeedback>

            <Text style={styles.Recomend}>{title}</Text>
          </View>
          
          <FlatList
          data={detailActivity}
          renderItem={({item,index}) =>{
            // item search in (bookmarkitem)
            const response= bookmarkedItems.some((selectedItem)=> selectedItem.name === item.name);
            // const {image,name}=item
            console.log("componentDidMount on detail catagory",response) 
          return (
            // <View style={styles.cardFirstRow}>
              <HomeCard
                image={item.image}
                title={item.name}
                heart={response == true ? 'red' : null}
                item={item}
                index={index}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen",{
                    object: item,
                    response:response
                  }) 
               }
              />
            // </View>
           )
          }
          }
          extraData={detailActivity}
          numColumns={2}
          keyExtractor={(item, index) => index}
        />
        </View>
      </ScrollView>
      {/*Filter Modal */}

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.modalTopContainer}>
              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image source={require("../assets/icons/cross.png")} />
              </TouchableWithoutFeedback>
              <Text style={styles.filters}>Filters</Text>

              <TouchableWithoutFeedback
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image source={require("../assets/icons/check.png")} />
              </TouchableWithoutFeedback>
            </View>

            <View style={styles.separator} />

            <Text style={styles.sortBy}>Sort by</Text>

            <View style={styles.passwordContainer}>
            <View style={styles.passwordSubContainer}>
             

              <CityPicker2  color="#fff"/>
            </View>
          </View>

            <Text style={styles.price}>Price</Text>
            <PriceSegment />
             
             <View style={{marginTop:hp('1%')}}>

            <Text style={styles.feature}>Features</Text>

            <View style={{ flexDirection: "row" }}>
              <ModalButtons title="Accept Credit Cards" />
              <ModalButtons2 title="Parking" />
              <ModalButtons2 title="Wi-Fi" />
            </View>

            <View style={{ flexDirection: "row" }}>
              <ModalButtons title="Outdoors seatings" />
              <ModalButtons2 title="Live music" />
              <ModalButtons2 title="Delivery" />
            </View>
            </View>
          </View>
        </View>
      </Modal>
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
    marginLeft: wp("3%"),
  },

  titleContainer: {
    flexDirection: "row",
    marginHorizontal: wp("5%"),
    marginTop: hp("4%"),
    bottom: hp("1.3%"),
  },

  cardFirstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: wp("1.7%"),
    // backgroundColor:'grey',
    alignSelf:'center'
  },

  othersLike: {
    fontFamily: "MoskBold700",
    color: "#8338EB",
    fontSize: 16,
    marginVertical: wp("0%"),
    marginHorizontal: wp("7%"),
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
