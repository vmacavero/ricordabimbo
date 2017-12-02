import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-elements';

class EndOfConfig extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
           backgroundColor: '#3b7077'
         },
    title: 'RicordaBimbo',
    headerRight: null,
    header: null,
    headerMode: 'none'
  /*  <Button
    icon={{ name: 'trending-flat', size: 12, flex: 1 }}
    iconRight
    onPress={null}
   // buttonStyle={styles.nextButtonStyle}
    //backgroundColor='orange'
    textStyle={{ textAlign: 'center' }}
    title={'FINE'}
    />*/
  });

  constructor(props) {
    super(props);
    this.naviProps = this.props.navigation.state.params;
    this.dataStruct = this.props.navigation.state.params.dataStruct;
    this.index = this.props.navigation.state.params;
  }

  insertEvents() {
    this.props.navigation.navigate('reminderok', {
      currentChild: this.naviProps.currentChild + 1,
      totalChild: this.naviProps.totalChild,
      dataStruct: this.naviProps.dataStruct,
   
    });
  }
  renderCards() {
    const m = this.naviProps.dataStruct;
    return m.map((item, i) => { 
      if (item.name !== '') {
      return (
      <Card 
        containerStyle={{ backgroundColor: 'transparent' }}
        titleStyle={{ color: 'white' }}
        title={item.name}
        imageProps={{ resizeMode: 'center' }}
        image={item.photoImage}
        key={i}
      >
      <Text style={{ color: 'white' }}>{'Va a scuola il : \n'}
      {(item.daysOfWeekSchoolStarts.monday.active === true) ? 
        `Lunedi' alle ${item.daysOfWeekSchoolStarts.monday.start} \n` : ''}
      {(item.daysOfWeekSchoolStarts.tuesday.active === true) ? 
        `Martedi' alle ${item.daysOfWeekSchoolStarts.tuesday.start} \n` : ''}
      {(item.daysOfWeekSchoolStarts.wednesday.active === true) ? 
         `Mercoledi' alle ${item.daysOfWeekSchoolStarts.wednesday.start} \n` : ''}
      {(item.daysOfWeekSchoolStarts.thursday.active === true) ? 
         `Giovedi' alle ${item.daysOfWeekSchoolStarts.thursday.start} \n` : ''}
      {(item.daysOfWeekSchoolStarts.friday.active === true) ? 
         `Venerdi' alle ${item.daysOfWeekSchoolStarts.friday.start} \n` : ''}
      {(item.daysOfWeekSchoolStarts.saturday.active === true) ? 
         `Sabato alle ${item.daysOfWeekSchoolStarts.saturday.start} \n` : ''}
      {(item.daysOfWeekSchoolStarts.sunday.active === true) ? 
         `Domenica alle ${item.daysOfWeekSchoolStarts.sunday.start} \n` : ''}
      </Text>
      <Button
        icon={{ name: 'code' }}
        backgroundColor='#3b7077'
        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
        title='Modifica' 
      />
      </Card>
    );
      } else { 
        return null;
      }
    });
  }

  render() {
    return (
      <LinearGradient
      colors={['#3b7077', '#499ff8', '#dabc6a']}
      style={styles.linearGradient}
      >
  <View style={{ paddingTop: 40 }}>
    <ScrollView>
      {this.renderCards()}
      <Button
          icon={{ name: 'code' }}
          backgroundColor='#86592d'
          buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
          title='Inserisci i Promemoria !'
          onPress={this.insertEvents}  
      />
    </ScrollView>
  </View>
  
  </LinearGradient>
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
