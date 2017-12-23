import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-elements';
import RNCalendarEvents from 'react-native-calendar-events';

class ReminderOk extends Component {
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
  componentWillMount = () => {
    RNCalendarEvents.authorizationStatus()
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
          this.prepareEvents();
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
     Alert.alert(error);
    });
  }
  dateTimeFormatter = (myDate, myTime, iso) => {
    const noUTC = new Date(
        myDate.substr(6, 4), 
        myDate.substr(3, 2) - 1, 
        myDate.substr(0, 2),
        myTime.substr(0, 2),
        myTime.substr(3, 2),
    );
    if (iso === true) { 
      return noUTC.toISOString();
    } else {
      return noUTC;
    }
  }

  nextDayOfWeek = (key, startDate) => {
    let dayOfWeek = 1;
    //console.log(startDate.toISOString());
    switch (key) {
      case 'monday':
        dayOfWeek = 1;
        break;
      case 'tuesday':
        dayOfWeek = 2;
        break;
      case 'wednesday':
        dayOfWeek = 3;
        break;
      case 'thursday':
        dayOfWeek = 4;
        break;
      case 'friday':
        dayOfWeek = 5;
        break;
      case 'saturday':
        dayOfWeek = 6;
        break;
      case 'sunday':
        dayOfWeek = 0;
        break;
      default: break;
    }
    let dayNum = startDate.getDay();
    if (dayNum !== dayOfWeek) {
        //calculating next occurrence of the day of the week
        startDate.setDate(startDate.getDate() + (dayOfWeek - 1 - startDate.getDay() + 7) % 7 + 1);
    }
    return startDate.toISOString();
  }

  insertEvent = (name, start, end) => {
    RNCalendarEvents.saveEvent(
      `Hai lasciato ${name} a scuola ?`,
       {
        startDate: start,
        //'2016-08-19T19:26:00.000Z',
        endDate: start,
        //'2017-08-29T19:26:00.000Z',
        alarms: [{
          date: -1 
        }],
        recurrenceRule: {
          frequency: 'weekly',
          interval: 1,
          endDate: end
          //'2017-08-29T19:26:00.000Z'
      }
    })
    .then(id => {
      //Alert.alert('ok !');
    })
    .catch(error => {
      Alert.alert('errore gravissimo inserendo l\'evento!');
      Alert.alert(error);
    });
  } 
  
  prepareEvents = () => {
    const m = this.naviProps.dataStruct;
    m.map((item, i) => { 
      if (item.name !== '') { 
        Object.entries(item.daysOfWeekSchoolStarts).forEach(
          ([key, value]) => {
            //check if the day is effectively a scholastic one
            if (value.active === true) {
              //this means i have to find the next corresponding day of week for start
              const correspondingDayofWeek = this.nextDayOfWeek(key, this.dateTimeFormatter(item.schoolDateStart, value.start), false);
              this.insertEvent(
                item.name,
               // this.dateTimeFormatter(item.schoolDateStart, value.start, true),
                correspondingDayofWeek,
                this.dateTimeFormatter(item.schoolDateEnd, value.start, true)
              );
            }            
          }
       );
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
    <Text>
      ok inseriti correttamente !
      Puoi chiudere l'applicazione e rilassarti.
      Pensemo a tutto noi !
    </Text>
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

export default ReminderOk;
