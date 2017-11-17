import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, ListItem } from 'react-native-elements';

class EndOfConfig extends Component {
  constructor(props) {
    super(props);
    this.naviProps = this.props.navigation.state.params;
  }
  renderCards() {
    const m = this.naviProps.dataStruct;
    return m.map(item => { 
      if (item.name !== '') {
      return (
      <Card 
        title={item.name}
        image={item.photoImage}
      >
      <Text> Entra a scuola il 
      {(item.daysOfWeekSchoolStarts.monday.active===true)?  'lunedi' : 'nolun'}
      {(item.daysOfWeekSchoolStarts.tuesday.active===true)?  'lunedi' : 'nolun'}
      {(item.daysOfWeekSchoolStarts.m.active===true)?  'lunedi' : 'nolun'}
      {(item.daysOfWeekSchoolStarts.monday.active===true)?  'lunedi' : 'nolun'}
      {(item.daysOfWeekSchoolStarts.monday.active===true)?  'lunedi' : 'nolun'}
      {(item.daysOfWeekSchoolStarts.monday.active===true)?  'lunedi' : 'nolun'}
      {(item.daysOfWeekSchoolStarts.monday.active===true)?  'lunedi' : 'nolun'}
      </Text>
      </Card>);
      } else { 
        return null;
      }
    });

   
  }
  render() {
    return (
  <View>
    <View >
      <Text>
        Riepilogo:
      </Text>
    </View>
    <ScrollView>
    {this.renderCards()}
      
    </ScrollView>
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
});

export default EndOfConfig;
