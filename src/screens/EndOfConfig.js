import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Slider, Button } from 'react-native-elements';
import { setNumberOfChildren } from '../actions';


class EndOfConfig extends Component {

  render() {
    return (
    <View style={{ align: 'center' }}>
    <Text>
      Riepilogo:
    </Text>
    <Text>
      </Text>
      <Text>{this.props.navigation.state.params.dataStruct[0].name}</Text>
      <Text>{this.props.navigation.state.params.dataStruct[1].name}</Text>
      <Text>{this.props.navigation.state.params.dataStruct[2].name}</Text>
      <Text>{this.props.navigation.state.params.dataStruct[3].name}</Text>
      <Text>{this.props.navigation.state.params.dataStruct[4].name}</Text>
    </View>
    ); 
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 0
  }

export default EndOfConfig;
