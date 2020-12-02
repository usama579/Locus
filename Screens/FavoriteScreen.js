import React, { useState } from "react";
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

export default function FavoriteScreen({ navigation, route }) {
  const [pass, setPass] = useState("");

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

      <ScrollView style={{ zIndex: -5 }} showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.Recomend}>Favorites</Text>
          </View>
          <View style={{ marginTop: hp("-5%") }}>
            <View style={styles.cardFirstRow}>
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
                heart={Heart2}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen")
                }
              />

              <HomeCard
                image={kabab}
                title="Kababjees"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={Heart2}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen")
                }
              />
            </View>
          </View>
        </View>

        {/* Second Cards rows */}
        <View>
          <View style={{ marginTop: hp("0%") }}>
            <View style={styles.cardFirstRow}>
              <HomeCard
                image={tandoor}
                title="Tandoor"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={Heart2}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen")
                }
              />

              <HomeCard
                image={cafe}
                title="Cafe Bogie"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={Heart2}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen")
                }
              />
            </View>
          </View>
        </View>

        {/* Third Cards rows */}

        <View>
          <View style={{ marginTop: hp("0%") }}>
            <View style={styles.cardFirstRow}>
              <HomeCard
                image={spice}
                title="Spice"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={Heart2}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen")
                }
              />

              <HomeCard
                image={hardees}
                title="Hardees"
                star1={star}
                star2={star}
                star3={star}
                star4={star}
                star5={halfstar}
                subTitle1="Khayaban shahbaz (Karachi)"
                subTitle2="Burgers Beverage Italian American Fast Food"
                heart={Heart2}
                onPress2={() =>
                  navigation.navigate("ActivityInformationScreen")
                }
              />
            </View>
          </View>
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

  searchContainer: {
    width: wp("90%"),
    height: hp("5%"),
    backgroundColor: "#fff",
    elevation: 5,
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
    fontSize: 10,
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
    marginVertical: hp("4%"),
    bottom: hp("1.3%"),
  },

  cardFirstRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    padding: wp("4%"),
    left: wp("2%"),
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
});
