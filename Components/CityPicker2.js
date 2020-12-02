import React, { Component } from "react";
import { Container, Header, Content, Icon, Picker, Form } from "native-base";

export default class CityPicker2 extends Component {
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
              style={{ width: undefined,color:this.props.color }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="UK" value="key0" />
              <Picker.Item label="USA" value="key1" />
              <Picker.Item label="Pakistan" value="key2" />
              <Picker.Item label="Saudi Arabia" value="key3" />
              <Picker.Item label="Spain" value="key4" />
            </Picker>
         
      
    
    );
  }
}