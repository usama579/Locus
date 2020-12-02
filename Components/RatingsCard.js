import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function RatingsCard({ title, image }) {
  return (
    <View style={styles.ratingsContainer}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: hp("3%"),
        }}
      >
        <Image
          style={{ width: 36, height: 36, marginLeft: wp("4%") }}
          source={image}
        />
        <View style={{ marginRight: wp("25%") }}>
          <Text style={{ fontSize: 16, fontFamily: "MoskMedium500" }}>
            {title}
          </Text>
          <Text style={{ fontSize: 8, fontFamily: "MoskMedium500" }}>
            Teble Reserved December 6,2018
          </Text>
          <Text style={{ fontSize: 6, fontFamily: "MoskMedium500" }}>
            North Namabad (Karachi)
          </Text>
        </View>
        <Image source={require("../assets/icons/downbig.png")} />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: hp("2.5%"),
          marginLeft: wp("8.5%"),
        }}
      >
        <Image
          style={{ marginRight: wp("1%") }}
          source={require("../assets/icons/bigstary.png")}
        />
        <Image
          style={{ marginRight: wp("1%") }}
          source={require("../assets/icons/bigstary.png")}
        />
        <Image
          style={{ marginRight: wp("1%") }}
          source={require("../assets/icons/bigstary.png")}
        />
        <Image
          style={{ marginRight: wp("1%") }}
          source={require("../assets/icons/bigstary.png")}
        />
        <Image
          style={{ marginRight: wp("1%") }}
          source={require("../assets/icons/bigstare.png")}
        />
      </View>

      <View>
        <Text
          style={{ fontSize: 10, marginLeft: wp("8.5%"), marginTop: hp("2%") }}
        >
          Superb Experience.The Hunter Menu was excellent{"\n"}
          along with the wine pairing. Anna, who served us,{"\n"}
          was incredible.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ratingsContainer: {
    width: wp("90%"),

    elevation: 3,
    backgroundColor: "#fff",
    bottom: hp("5%"),
    borderRadius: 10,
    paddingBottom: hp("5%"),
    marginBottom: wp("4%"),
  },
});
