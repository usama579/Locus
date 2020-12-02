import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default class ModalButtons extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      backgroundColor: "#7D34E3",
      color: "#fff",
    };
  }
  onClick() {
    {
      this.state.backgroundColor === "#fff"
        ? this.setState({ backgroundColor: "#7D34E3" })
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
        <TouchableHighlight onPress={this.onClick}>
          <View>
            <Text style={[styles.instructions, { color: this.state.color }]}>
              {this.props.title}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#fff",
    width: wp("38%"),
    height: hp("4%"),
    borderRadius: 20,
    marginRight: wp("2%"),
    marginTop: hp("1%"),
  },
  instructions: {
    color: "#7D34E3",
  },
});
AppRegistry.registerComponent("ModalButtons", () => ModalButtons);
