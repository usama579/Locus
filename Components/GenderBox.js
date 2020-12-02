import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class ModalButtons extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      backgroundColor: "#fff",
      color: "#fff",
    };
  }
  onClick() {
    {
      this.state.backgroundColor === "#fff"
        ? this.setState({ backgroundColor: "#cccccc" })
        : this.setState({ backgroundColor: "#fff" });
    }

    {
      this.state.color === "#fff"
        ? this.setState({ color: "#7D34E3" })
        : this.setState({ color: "#fff" });
    }
  }
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onClick}>
        <View
          style={[
            styles.maleContainer,
            { backgroundColor: this.state.backgroundColor },
          ]}
        >
          <View style={styles.maleSubContainer}>
            <Image source={this.props.male} />

            <Text
              style={{
                paddingHorizontal: wp("6%"),
                color: "#000",
                opacity: 0.8,
              }}
            >
              {this.props.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = StyleSheet.create({
  maleContainer: {
    width: wp("35%"),
    height: hp("7%"),
    borderWidth: 0.5,
    borderColor: "#707070",
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    padding: wp("5%"),
    marginTop: hp("1.3%"),
    marginLeft: 10,
  },

  maleSubContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  instructions: {},
});
AppRegistry.registerComponent("ModalButtons", () => ModalButtons);
