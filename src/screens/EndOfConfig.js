import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';

import RNCalendarEvents from 'react-native-calendar-events';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-elements';

class EndOfConfig extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
           backgroundColor: '#3b7077'
         },
    title: 'Riepilogo',
    headerRight: null,
    headerLeft: null,
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
    this.deleteEvents = this.deleteEvents.bind(this);
    this.buttonEditDisabled = this.props.navigation.state.params.buttonEditDisabled;
  }

  async iterateAndDelete(day) {
    console.log('i am in iterateAndDelete');
    console.log(day);
    Object.keys(day).forEach(function (key) {
        if (day[key].eventId !== '0') {
          //delete event;
          console.log(eventId);
        }
    });
    console.log('out from iterateAndDelete');
  }

  async deleteEvents() {

    //DELETE ME 
  /*
    console.log('i am in deletevents');
    try {
      AsyncStorage.removeItem('allDataStruct');
      console.log('removing all');
    } catch (errore) {
      console.log('error remov item');
    }
  */
//DELETE ME


    try {
     const dataReloaded = await AsyncStorage.getItem('allDataStruct');
     if (dataReloaded !== null) {
        //we must iterate to find the id and delete all.
        //this will be hard.
        const m = this.naviProps.dataStruct;
        return m.map((item, i) => { 
          if (item.name!=='') {
            this.iterateAndDelete(item.daysOfWeekSchoolStarts);
          }
        });
     }
   } catch (error) {
     // Error retrieving data
     console.log('error retrieving dataStruct for Events, in EndOfConfig');
     console.log(error);
     Alert.alert(error);
   }
}

  insertEvents = () => { 
    RNCalendarEvents.authorizeEventStore()
    .then(status => {
      switch (status) {
        case 'denied' : 
          Alert.alert(
            'Per favore vai nelle impostazioni e autorizza all\'uso del calendario'
          );
          break;
        case 'restricted' :
          Alert.alert(
           'Per favore vai nelle impostazioni e autorizza all\'uso del calendario'
        );
          break;
        case 'authorized' :
        //in this place we check if we have already events in calendar (via AsyncStorage)
        //we call delete events, in wich we check if there's something saved
        //and in that case, the app wipes everything and inserts all new events at once
        //this it maybe the only convenient way to modify recurring events without
        //presenting the user a LONG list of event for every child for every day of the
        //week. 
        //still don't know the behaviour in android, we'll see.
        console.log('calling dlete events');
        this.deleteEvents();
        //console.log('not going to reminderOf');
         this.props.navigation.navigate('reminderok', {
            dataStruct: this.naviProps.dataStruct
          });
      
          break;
        case 'undetermined' :
          Alert.alert('Per favore autorizza');
          break;
        default: 
          Alert.alert('default');
          break;
      }
    })
    .catch(error => {
     // handle error
     Alert.alert('Errore in authorize event store, riferiscilo al creatore dell\'app');
    });
  }
  backToConfig = (param) => {
    const { navigate } = this.props.navigation;
    this.buttonEditDisabled = false;
    navigate(
      'singlechildconfig',
        { totalChild: 1, //or param ?
          currentChild: param +1,
          dataStruct: this.dataStruct
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
      <Text style={{ color: 'white' }}>{'Va a scuola/asilo/nido : \n'}
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
        icon={{ name: 'mode-edit' }}
        backgroundColor='#3b7077'
        buttonStyle={styles.centeredButtonStyle}
        title='Modifica' 
        onPress={() => this.backToConfig(i)}
         
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
          icon={{ name: 'event' }}
          backgroundColor='#3b7077'
          buttonStyle={styles.buttonStyle}
          title='Inserisci i Promemoria !'
          onPress={this.insertEvents} 
          disabled={this.buttonEditDisabled}  
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
  },
  buttonStyle: {
    borderRadius: 0, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0,
    marginTop: 40
  },
  centeredButtonStyle: {
    borderRadius: 0, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0, 
    height: 20, 
    width: 100,
    alignSelf: 'center'
  }
  
});

export default EndOfConfig;
