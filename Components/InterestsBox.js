import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
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
      <View
        style={[
          styles.container,
          { backgroundColor: this.state.backgroundColor },
        ]}
      >
        <TouchableWithoutFeedback onPress={this.onClick}>
          <View>
            <Text style={{ color: "#000" }}>{this.props.text}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: wp("35%"),
    height: hp("15%"),
    borderWidth: 0.1,
    borderColor: "#707070",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp("4%"),
    marginLeft: wp("5%"),
  },
  instructions: {},
});
AppRegistry.registerComponent("ModalButtons", () => ModalButtons);


