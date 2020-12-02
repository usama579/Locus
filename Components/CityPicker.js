import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";
import {View} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export default class CityPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "key1"
    };
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
              
            <Picker
              mode="dropdown"
              
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="UK" value="key0" />
              <Picker.Item label="USA" value="key1" />
              <Picker.Item label="Pak" value="key2" />
              <Picker.Item label="KSA" value="key3" />
              <Picker.Item label="Aus" value="key4" />
            </Picker>
            
         
      
    
    );
  }
}