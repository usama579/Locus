import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

export default function ActivityCard({
  image,
  title,
  star1,
  star2,
  star3,
  star4,
  star5,
  subTitle1,
  subTitle2,
  heart,
  onPress2,
}) {
  const [loaded] = useFonts({
    MoskMedium500: require("../assets/fonts/MoskMedium500.ttf"),
    MoskBold700: require("../assets/fonts/MoskBold700.ttf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <TouchableWithoutFeedback onPress={onPress2}>
      <View style={styles.container}>
        <Image source={image} style={styles.cardImage} />

        <View>
          <View style={styles.ratingsContainer}>
            <Text style={styles.cardTextTitle}>{title}</Text>

            <View style={styles.starContainer}>
              <Image
                source={star1}
                style={{ width: wp("3.5%"), height: hp("1.8%") }}
              />
              <Image
                source={star2}
                style={{ width: wp("3.5%"), height: hp("1.8%") }}
              />
              <Image
                source={star3}
                style={{ width: wp("3.5%"), height: hp("1.8%") }}
              />
              <Image
                source={star4}
                style={{ width: wp("3.5%"), height: hp("1.8%") }}
              />

              <Text style={styles.ratingText}>4/5</Text>
            </View>
          </View>

          <View style={styles.subtitle1Container}>
            <Image
              source={require("../assets/icons/location2.png")}
              style={{ marginTop: hp("-1.5%") }}
            />
            <Text style={styles.subtitle1}>{subTitle1}</Text>
          </View>

          <View style={styles.subtitle2Container}>
            <Image source={require("../assets/icons/plate2.png")} />
            <Text style={styles.subtitle2}>{subTitle2}</Text>
          </View>

          <View style={styles.subtitle3Container}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.subtitle3}>Family Freindly</Text>
            </View>

            <TouchableOpacity>
              <Image source={heart} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


const styles = StyleSheet.create({
  container: {
    width: wp("90%"),
    height: hp("51%"),
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 3,
    alignSelf: "center",
  },

  cardImage: {
    width: wp("90%"),
    height: hp("29%"),
    resizeMode: "cover",
    borderRadius: 12,
  },

  cardTextTitle: {
    fontFamily: "MoskBold700",
    fontSize: 28,
    color: "#454F63",
  },

  ratingsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: hp("1%"),
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
    marginTop: hp(".5%"),
  },

  subtitle1: {
    fontSize: 16,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
    marginBottom: hp("1.5%"),
  },

  subtitle2Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginBottom: hp("1%"),
  },

  subtitle2: {
    fontSize: 16,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
  },

  subtitle3: {
    fontSize: 16,
    fontFamily: "MoskMedium500",
    marginLeft: wp(".5%"),
    marginRight: 3,
  },

  subtitle3Container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: wp("2%"),
    marginTop: hp(".5%"),
    justifyContent: "space-between",
  },
});
