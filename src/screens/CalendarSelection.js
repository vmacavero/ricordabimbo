import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Avatar, Icon, CheckBox } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';
import * as Animatable from 'react-native-animatable';

/* Receives :
dataStruct: naviProps.dataStruct,
currentChild: naviProps.currentChild,
totalChild: naviProps.totalChild,
calendarPage: true
*/

class CalendarSelection extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
    headerMode: 'none',
    navigationOptions: {
      header: null
    }
});
constructor(props, context) {
  super(props, context);
  this.showDatePicker = this.showDatePicker.bind(this);
  this.showTimePicker = this.showTimePicker.bind(this);
  this.naviProps = this.props.navigation.state.params;

  this.state = {
    checked: [true, true, true, true, true, false, false],
    sliderNumber1: 1,
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    whichCalendar: '',
    startDate: '11/11/11',
    endDate: '99/99/99',
    weekDay: 0
    //currentChild: this.props.navigation.state.params.currentChild,
    //arrayOfChildren: this.props.navigation.state.params.arrayOfChildren
  };
}
  changeCheckBox(num) {
    const index = this.naviProps.currentChild;
    const week = this.naviProps.dataStruct[index - 1].daysOfWeekSchoolStarts;
    switch (num) {
      default:
        return;
      case 0:
        week.monday.active = !(week.monday.active);
        break;
      case 1:
        week.tuesday.active = !(week.tuesday.active);
        break;
      case 2:
        week.wednesday.active = !(week.wednesday.active);
        break;
      case 3:
        week.thursday.active = !(week.thursday.active);
        break;
      case 4:
        week.friday.active = !(week.friday.active);
        break;
      case 5:
        week.saturday.active = !(week.saturday.active);
        break;
      case 6:
        week.sunday.active = !(week.sunday.active);
        break;
    }
    this.props.navigation.setParams(); //FORCES - TRIGGERS RE-RENDER
  }
  showDatePicker = (startOrEndCalendar) => {
    //we set the calendar (start or end)
    this.setState({ whichCalendar: startOrEndCalendar });
    this.setState({ isDatePickerVisible: true });
  }

  hideDatePicker = () => this.setState({ isDatePickerVisible: false });

  handleDatePicked = (date) => {
    //const naviProps = this.props.navigation.state.params;
    //alert('A date has been picked: ', date);
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 101).toString().slice(-2);
    const dd = (date.getDate() + 100).toString().slice(-2);
    const dateString = `${dd}/${mm}/${yyyy}`;
    if (this.state.whichCalendar === 'start') {
      //this.setState({ startDate: dateString });
      this.naviProps.dataStruct[this.naviProps.currentChild - 1].schoolDateStart = dateString;
    } else {
      this.naviProps.dataStruct[this.naviProps.currentChild - 1].schoolDateEnd = dateString;
    }
    this.hideDatePicker();
  };

  showTimePicker = (num) => {
    //we set the calendar (start or end)
    console.log('showtimepicker e num = ');
    console.log(num);
    this.setState({ isTimePickerVisible: true });
    this.setState({ weekDay: num });
  }

  hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  handleTimePicked = (date) => {
    //alert('A date has been picked: ', date);
    console.log('sono in handletimepickd');
    let hh = date.getHours().toString();
    hh = (hh < 10 ? '0' : '') + hh;
    let mm = date.getMinutes().toString();
    mm = (mm < 10 ? '0' : '') + mm;
    const timeString = `${hh}:${mm}`;
    console.log(timeString);
    console.log(this.state.weekDay);
    const index = this.naviProps.currentChild;
    const week = this.naviProps.dataStruct[index - 1].daysOfWeekSchoolStarts;
    switch (this.state.weekDay) {
      default:
        return;
      case 0:
        week.monday.start = timeString;
        break;
      case 1:
        week.tuesday.start = timeString;
        break;
      case 2:
        week.wednesday.start = timeString;
        break;
      case 3:
        week.thursday.start = timeString;
        break;
      case 4:
        week.friday.start = timeString;
        break;
      case 5:
        week.saturday.start = timeString;
        break;
      case 6:
        week.sunday.start = timeString;
        break;
    }
    this.hideTimePicker();
    this.props.navigation.setParams(); //FORCES - TRIGGERS RE-RENDER
  };
backBtn = () => {
    //let currentChildrenArray = currentProps.childrenArray;

    // I'll check if the calendar is correct ! (date/times, etc) so
    //we can pass to other child (or to final config);

     const { navigate } = this.props.navigation;
    navigate(
           'singlechildconfig',
           {
            totalChild: this.naviProps.totalChild,
            currentChild: this.naviProps.currentChild,
            dataStruct: this.naviProps.dataStruct
           }
         );
}
  render() {
   return (
      <LinearGradient
        colors={['#1c669f', '#9a9e1d', '#9a9e1d']}
        style={styles.linearGradient}
      >
      <View
        style={{
          flexDirection: 'row',
          flex: 0,
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 40
        }}
      >
        <Avatar
            large
            rounded
            source={this.naviProps.dataStruct[this.naviProps.currentChild - 1].photoImage}
            activeOpacity={1}
        />
        <Text style={styles.childInfoStyle}>

          {this.naviProps.dataStruct[this.naviProps.currentChild - 1].name}
        </Text>
        <Text style={styles.childInfoStyle}>
          {this.naviProps.dataStruct[this.naviProps.currentChild - 1].age} { ' anni '}
        </Text>
      </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.buttonText}>
            Per favore scegli la data in cui inizia la scuola di{' '}
            {this.naviProps.dataStruct[this.naviProps.currentChild - 1].name}
            {' '}e quando termina
          </Text>

        </View>
        <View style={styles.startEndStyle}>
            <Text>Inizio</Text>
            <View>{}</View>
            <Text>Fine</Text>
        </View>
      <View style={styles.calendarIconsStyle}>
        <Icon
          raised
          name='date-range'
          size={22}
          //type='font-awesome'
          color='#192f6a'
          onPress={this.showDatePicker.bind(this, 'start')}
        />
      <Text
        style={{
          color: 'white',
          fontSize: 12,
          fontWeight: 'bold',
          backgroundColor: 'rgba(52, 52, 52, 0)',
          alignSelf: 'center',
        }}
      >
        {this.naviProps.dataStruct[this.naviProps.currentChild - 1].schoolDateStart}
      </Text>
        <Icon
          raised
          name='trending-flat'
          size={22}
          color='#192f6a'
          onPress={() => console.log('arrowicon')}
        />
        <Text
          style={{
            color: 'white',
            fontSize: 12,
            fontWeight: 'bold',
            backgroundColor: 'rgba(52, 52, 52, 0)',
            alignSelf: 'center',
          }}
        >
          {this.naviProps.dataStruct[this.naviProps.currentChild - 1].schoolDateEnd}
        </Text>
        <Icon
          raised
          name='date-range'
          size={22}
          //type='font-awesome'
          color='#192f6a'
          onPress={this.showDatePicker.bind(this, 'end')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
        />
        <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
          mode='time'
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.buttonText}>
          In basso scegli i giorni in
           cui {' '}{this.naviProps.dataStruct[this.naviProps.currentChild - 1].name}
           {' '}va a scuola e l'orario in cui dovrebbe entrare
        </Text>
      </View>
      <View style={styles.calendarIconsStyleCheckBox}>
        <View style={styles.daysOfWeekRowStyle}>
          <CheckBox
            title='Lun'
            //checked={this.state.checked[0]}
            checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.monday.active}
            containerStyle={styles.daysOfWeekStyle}
            textStyle={styles.daysOfWeekTextStyle}
            onPress={this.changeCheckBox.bind(this, 0)}
          />
          <Text
            style={styles.timeToSchoolTextStyle}
          >
             {'alle '}
          </Text>
          <Text
            style={styles.timeToSchoolTextStyle}
          >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.monday.start}</Text>
          <Button
            icon={{ name: 'alarm', size: 28 }}
            onPress={this.showTimePicker.bind(this,0)}
            title={'(cambia)'}
            buttonStyle={styles.nextButtonStyle}
            backgroundColor='blue'
          />
        </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Mar'
          checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                      .daysOfWeekSchoolStarts.tuesday.active
            }
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 1)}
        />
        <Text
          style={styles.timeToSchoolTextStyle}
        >
           {'alle '}
        </Text>
        <Text
          style={styles.timeToSchoolTextStyle}
        >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.tuesday.start}</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={this.showTimePicker.bind(this,1)}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
      <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Mer'
          checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                      .daysOfWeekSchoolStarts.wednesday.active
            }
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 2)}
        />
        <Text
          style={styles.timeToSchoolTextStyle}
        >
           {'alle '}
        </Text>
        <Text
          style={styles.timeToSchoolTextStyle}
        >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.wednesday.start}</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={this.showTimePicker.bind(this ,2)}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Gio'
          checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                      .daysOfWeekSchoolStarts.thursday.active
            }
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 3)}
        />
        <Text
          style={styles.timeToSchoolTextStyle}
        >
           {'alle '}
        </Text>
        <Text
          style={styles.timeToSchoolTextStyle}
        >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.thursday.start}</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={this.showTimePicker.bind(this,3)}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Ven'
          checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                      .daysOfWeekSchoolStarts.friday.active
            }
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 4)}
        />
        <Text
          style={styles.timeToSchoolTextStyle}
        >
           {'alle '}
        </Text>
        <Text
          style={styles.timeToSchoolTextStyle}
        >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.friday.start}</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={this.showTimePicker.bind(this,4)}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Sab'
          checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                      .daysOfWeekSchoolStarts.saturday.active
            }
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 5)}
        />
        <Text
          style={styles.timeToSchoolTextStyle}
        >
           {'alle '}
        </Text>
        <Text
          style={styles.timeToSchoolTextStyle}
        >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.saturday.start}</Text>
        <Animatable.View animation="swing" iterationCount={15}>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={this.showTimePicker.bind(this,5)}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
        </Animatable.View>
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Dom'
          checked={this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                      .daysOfWeekSchoolStarts.sunday.active
            }
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 6)}
        />
        <Text
          style={styles.timeToSchoolTextStyle}
        >
           {'alle '}
        </Text>
        <Text
          style={styles.timeToSchoolTextStyle}
        >{this.naviProps.dataStruct[this.naviProps.currentChild - 1]
                .daysOfWeekSchoolStarts.sunday.start}</Text>
        
        <Animatable.View animation="swing" iterationCount="infinite">
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={this.showTimePicker.bind(this,6)}
          
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
        </Animatable.View>


      </View>
      </View>
        <View
         style={{
           flex: 1,
           alignItems: 'stretch',
          justifyContent: 'flex-start' }}
        >
    <Text
      style={styles.buttonText}
    >
      {this.state.sliderNumber}
    </Text>
 </View>
 <Button
   icon={{ name: 'trending-flat', size: 32 }}
   iconLeft
   onPress={this.backBtn}
   buttonStyle={styles.nextButtonStyle}
   backgroundColor='blue'
   textStyle={{ textAlign: 'center' }}
   title={'Ritorna'}
 />
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
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,
    color: '#fffdfd',
    backgroundColor: 'transparent',
  },
  childInfoStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,
    color: '#fffdfd',
    backgroundColor: 'transparent',
    alignItems: 'center',

  },
  nextButtonStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
    borderRadius: 10

  },
  calendarIconsStyle: {
    flex: 0,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  calendarIconsStyleBackGroundAlpha: {
    flex: 0,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  startEndStyle: {
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(52, 52, 52, 0)',
    paddingLeft: 18,
    paddingRight: 22,
  },
  calendarIconsStyleCheckBox: {
    flex: -1,
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
    padding: 0,
    margin: 0,
  },
  daysOfWeekStyle: {
    padding: 0,
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderWidth: 0,
    paddingRight: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)',
    width: '20%',
  },
  daysOfWeekTextStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,
    color: '#fffdfd',
    backgroundColor: 'transparent',
},
daysOfWeekRowStyle: {
  flex: 0,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between'
},
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  headerRightStyle:
  {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingRight: 15,
  },
  timeToSchoolTextStyle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  }
});


export default CalendarSelection;
