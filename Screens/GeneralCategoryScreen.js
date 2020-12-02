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
  Alert,
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

//images
import backImage from "../assets/cafeCat.png";
import centerImage from "../assets/icons/cup.png";

import artImage from "../assets/artImage.png";
import art from "../assets/icons/art.png";

import RestoImage from "../assets/restoImage.png";
import resto from "../assets/icons/resturent.png";

import ShopImage from "../assets/shopImage.png";
import shop from "../assets/icons/shopping.png";

import SportsImage from "../assets/sportsImage.png";
import sports from "../assets/icons/sports.png";
import {getAllActvities} from "../firebase/ActivityFunctions"
import ModalButtons from "../Components/ModalButtons";
import ModalButtons2 from "../Components/ModalButton2";
import CityPicker2 from "../Components/CityPicker2";

export default function GeneralCategoryScreen({ navigation }) {
  const [pass, setPass] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  let Activities;
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });
    
    useEffect(()=>{
        console.log("componentDidMount on catagory")
        getAllActvities().then((res)=>{
          Activities=res
         }).catch(e=>{alert("Error:",e)})
      },[])

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
            placeholder="What are you looking for"
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

      <View style={styles.categortConteiner}>
        <Text style={styles.Recomend}>Browse Activities in</Text>
        
        <View style={{width:wp('30%'),borderRadius:10,borderWidth:0.5,
        height:hp('5%'),justifyContent:'center',borderColor:"#cccccc",}}>
        <CityPicker />
        </View>
       
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.catRow1}>
          <CategoryBox
            centerImage={centerImage}
            backImage={backImage}
            text={"Cafaes"}
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Cafes",
              })
            }
          />

          <CategoryBox
            centerImage={art}
            backImage={artImage}
            text="Art Galleries"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Art Galleries",
              })
            }
          />
        </View>

        <View style={styles.catRow2}>
          <CategoryBox
            centerImage={resto}
            backImage={RestoImage}
            text="Resturents"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Resturents",
              })
            }
          />

          <CategoryBox
            centerImage={centerImage}
            backImage={ShopImage}
            text="Shopping Malls"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Shopping Malls",
              })
            }
          />
        </View>

        <View style={styles.catRow2}>
          <CategoryBox
            centerImage={sports}
            backImage={SportsImage}
            text="Campgrounds"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Campgrounds",
              })
            }
          />

          <CategoryBox
            centerImage={sight}
            backImage={SightImage}
            text="Tourist Attraction"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Tourist Attraction",
              })
            }
          />
        </View>
        <View style={styles.catRow2}>
          <CategoryBox
            centerImage={resto}
            backImage={RestoImage}
            text="Bowling Alleys"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Bowling Alleys",
              })
            }
          />

          <CategoryBox
            centerImage={centerImage}
            backImage={ShopImage}
            text="Gyms"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Gyms",
              })
            }
          />
        </View>
        <View style={styles.catRow2}>
          <CategoryBox
            centerImage={sports}
            backImage={SportsImage}
            text="Libraries"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Libraries",
              })
            }
          />

          <CategoryBox
            centerImage={sight}
            backImage={SightImage}
            text="Movie Theaters"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Movie Theaters",
              })
            }
          />
        </View>
        <View style={styles.catRow2}>
          <CategoryBox
         centerImage={centerImage}
         backImage={backImage}
            text="Parks"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Parks",
              })
            }
          />

          <CategoryBox
           centerImage={art}
           backImage={artImage}
            text="Parks"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Parks",
              })
            }
          />
        </View>
        <View style={styles.catRow2}>
          <CategoryBox
            centerImage={resto}
            backImage={RestoImage}
            text="Events"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "Events",
              })
            }
          />

          <CategoryBox
            centerImage={centerImage}
            backImage={ShopImage}
            text="All"
            onPress={() =>
              navigation.navigate("CategoryClickScreen", {
                title: "All",
              })
            }
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
    flexDirection: "row",
    alignItems: "center",
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
