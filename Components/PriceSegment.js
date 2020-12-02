import React, { useState } from "react";

// import all the components we are going to use
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import SegmentedControlTab from "react-native-segmented-control-tab";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function PriceSegment() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSingleIndexSelect = (index) => {
    setSelectedIndex(index);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SegmentedControlTab
          values={["$", "$$", "$$$", "$$$$"]}
          selectedIndex={selectedIndex}
          tabStyle={styles.tabStyle}
          activeTabStyle={styles.activeTabStyle}
          activeTabTextStyle={{ color: "#7D34E3" }}
          onTabPress={handleSingleIndexSelect}
          tabTextStyle={{ color: "#fff" }}
          firstTabStyle={{
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
          }}
          lastTabStyle={{
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
          }}
          tabsContainerStyle={{ height: hp("6%"), width: wp("90%") }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: wp("4%"),
    marginTop: hp("-1.5%"),
  },

  headerText: {
    padding: 8,
    fontSize: 14,
    color: "#444444",
    textAlign: "center",
  },
  tabContent: {
    color: "#444444",
    fontSize: 18,
    margin: 24,
  },
  seperator: {
    marginHorizontal: -10,
    alignSelf: "stretch",
    borderTopWidth: 1,
    borderTopColor: "#888888",
    marginTop: 24,
  },
  tabStyle: {
    borderColor: "#fff",
    backgroundColor: "#7D34E3",
  },
  activeTabStyle: {
    backgroundColor: "#fff",
  },
});
