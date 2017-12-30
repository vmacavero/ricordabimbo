import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage,
  Platform
} from 'react-native';

import RNCalendarEvents from 'react-native-calendar-events';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card, Icon } from 'react-native-elements';

class EndOfConfig extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
           backgroundColor: '#3b7077'
         },
    title: 'Riepilogo',
    headerRight:
    <Icon
    name='info'
    size={18}
    color='white'
    onPress={navigation.state.params.handleInfo}
    backgroundColor='transparent'
    />,
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
    this.buttonEditDisabled = this.props.navigation.state.params.buttonEditDisabled;
    this.deleteEvents = this.deleteEvents.bind(this);
    this.removeWithId = this.removeWithId.bind(this);
    this.goToInfo = this.goToInfo.bind(this);
    this.iterateAndDelete = this.iterateAndDelete.bind(this);
      //this.props.navigation.setParams();
  }

  componentDidMount = () => {
    this.props.navigation.setParams({ handleInfo: this.goToInfo });
  }
  
  goToInfo() {
    this.props.navigation.navigate('infocredits');
  }

 removeWithId(id) {
    if (Platform.os==='ios') {
        console.log('removing on ios');
        RNCalendarEvents.removeFutureEvents(id)
        .then(success => {
          console.log('removed event with id' + id + ':' + success);
        })
        .catch(error => {
            console.log('error removing event: ' + error);
        });
    } else {
      console.log('removing on Android');
      RNCalendarEvents.removeEvent(id)
        .then(success => {
          console.log('removed event with id' + id + ':' + success);
        })
        .catch(error => {
          console.log('error removing event: ' + error);
        });
     }      
}

   iterateAndDelete= (day) => {
      console.log('i am in iterteAndDelete'); 
      console.log(day); 
     Object.keys(day).forEach(function (key) {
          if (day[key].eventId !== '0') { 
          console.log('ho trovato evento: ');
          console.log(day[key].eventId);
          //deleting events
          //this.removeWithId(day[key].eventId);
          // BLOCK start
          if (Platform.OS==='ios') {
            console.log('removing on ios');
            RNCalendarEvents.removeFutureEvents(day[key].eventId)
            .then(success => {
              console.log('removed event with id' +day[key].eventId + ':' + success);
            })
            .catch(error => {
                console.log('error removing event: ' + error);
            });
        } else {
          console.log('removing on Android');
          RNCalendarEvents.removeEvent(day[key].eventId)
            .then(success => {
              console.log('removed event with id' + day[key].eventId + ':' + success);
            })
            .catch(error => {
              console.log('error removing event: ' + error);
            });
         } 
         //Block end
        }
    });
    console.log('out from iterateAndDelete');
  }

  async deleteEvents() {
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
            'Devi autorizzare l\'APP all\'uso del calendario.'
          );
          break;
        case 'restricted' :
          Alert.alert(
           'Devi autorizzare l\'APP all\'uso del calendario.'
        );
          break;
        case 'authorized' :
        //in this place we check if we have already events in calendar (via AsyncStorage)
        //we call delete events, in wich we check if there's something saved
        //and in that case, the app wipes everything and inserts all new events at once
        //this it maybe the only convenient way to modify recurring events without
        //presenting the user a LONG list of event for every child for every day of the
        //week. 
        //
        console.log('calling dlete events');
        this.deleteEvents();
        //console.log('not going to reminderOf');
       // console.log('now we do not call navigate, so nothuing happens');
         this.props.navigation.navigate('reminderok', {
            dataStruct: this.naviProps.dataStruct
          });
          break;
        case 'undetermined' :
          Alert.alert('Devi autorizzare l\'APP all\'uso del calendario.');
          break;
        default: 
          Alert.alert('default');
          break;
      }
    })
    .catch(error => {
     // handle error
     Alert.alert('Errore in authorize event store, riferiscilo al creatore dell\'App.');
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
  renderConditionalButton() {
    //FIXME !
      if (this.buttonEditDisabled) {
          return (<Button
            icon={{ name: 'event', size: 32, color:'#cccccc' }}
            iconRight
            backgroundColor='white'
            textStyle={{ textAlign: 'center' , color: '#cccccc', fontSize: 18}}
            buttonStyle={styles.buttonStyle}
            title='Inserisci i Promemoria'
            onPress={this.insertEvents} 
            disabled={true}  
            containerViewStyle={{ alignSelf:'flex-end', padding:10}}
            />);
      } else {
          return (<Button
          icon={{ name: 'event', size: 32, color:'#00008B' }}
          iconRight
          backgroundColor='white'
          textStyle={{ textAlign: 'center' , color: '#00008B', fontSize: 18}}
          buttonStyle={styles.buttonStyle}
          title='Inserisci i Promemoria'
          onPress={this.insertEvents} 
          disabled={this.buttonEditDisabled}  
          containerViewStyle={{ alignSelf:'flex-end', padding:10}}
          />);
       }
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
        icon={{ name: 'mode-edit', size: 32, color:'#00008B' }}
        iconRight
        backgroundColor='white'
        textStyle={{ textAlign: 'center' , color: '#00008B', fontSize: 18}}
        buttonStyle={styles.centeredButtonStyle}
        title='Modifica' 
        onPress={() => this.backToConfig(i)}
        containerViewStyle={{ alignSelf:'flex-end', padding:10}} 
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
      {this.renderConditionalButton()}
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
    borderRadius: 10/*, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0,
    marginTop: 40*/
  },
  centeredButtonStyle: {
    borderRadius: 10/*, 
    marginLeft: 0, 
    marginRight: 0, 
    marginBottom: 0, 
    height: 20, 
    width: 100,
    alignSelf: 'center'*/
  }
  
});

export default EndOfConfig;
