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
  dateTimeFormatter = (myDate, myTime) => {
    //2016-08-19T19:26:00.000Z' UTC time format,
    const dataString = myDate.substr(6, 4) + '-' + datamia.substr(3, 2) + 
                '-' + datamia.substr(0, 2) + 'T' + myTime + ':00.000Z';
    return dataString;
  }

  insertEvent = (name, start, end) => {
    RNCalendarEvents.saveEvent(
      'Hai lasciato '+ name +' a scuola ?',
       {
      startDate: start,
      //'2016-08-19T19:26:00.000Z',
      endDate: end,
      //'2017-08-29T19:26:00.000Z',
      alarms: [{
        date: -1 
      }],
      recurrenceRule: {
        frequency: 'week',
        interval: 1,
        endDate: end
        //'2017-08-29T19:26:00.000Z'
      }
    })
    .then(id => {
      Alert.alert('ok !');
    })
    .catch(error => {
      Alert.alert('errore gravissimo !');
      Alert.alert(error);
    });
  } 
  }

  prepareEvents = () => {
    const m = this.naviProps.dataStruct;
    m.map((item, i) => { 
      if (item.name !== '') { 
        console.log(i);
        console.log(item.name);
        console.log(item.id);
        //console.log(item.schoolDateStart);
        //console.log(item.schoolDateEnd);
        const day = item.daysOfWeekSchoolStarts;

        // so events in every week 
        //starting in schooldatestart and ending in schooldateend
        //WATCH OUT : 00:00 = 12:00 AM  ????
        // 12:00 = 12:00 PM  
        if (day.monday.active) {
          insertEvent(
            item.name,
            dateTimeFormatter(item.schoolDateStarts),
            dateTimeFormatter(item.schoolDateEnd),
          )
        }
        
        console.log(
          item.daysOfWeekSchoolStarts.tuesday.active ? 
            item.daysOfWeekSchoolStarts.tuesday.start : 'noMar'); 
        console.log(
          item.daysOfWeekSchoolStarts.wednesday.active ? 
            item.daysOfWeekSchoolStarts.wednesday.start : 'noMer');
        console.log(
          item.daysOfWeekSchoolStarts.thursday.active ? 
            item.daysOfWeekSchoolStarts.thursday.start : 'noGio');
        console.log(
          item.daysOfWeekSchoolStarts.friday.active ? 
            item.daysOfWeekSchoolStarts.friday.start : 'noVen');
        console.log(
          item.daysOfWeekSchoolStarts.saturday.active ? 
            item.daysOfWeekSchoolStarts.saturday.start : 'noSab');
        console.log(
          item.daysOfWeekSchoolStarts.sunday.active ? 
            item.daysOfWeekSchoolStarts.sunday.start : 'noDom');   
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
