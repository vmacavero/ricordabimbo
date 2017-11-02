import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Avatar, Icon, CheckBox } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

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
  this.changeCheckBox = this.changeCheckBox.bind(this);
  this.showDatePicker = this.showDatePicker.bind(this);
  this.state = {
    checked: [true, true, true, true, true, false, false],
    sliderNumber1: 1,
    isDatePickerVisible: false,
    isTimePickerVisible: false,
    whichCalendar: '',
    startDate: '11/11/11',
    endDate: '99/99/99',
    currentChild: this.props.navigation.state.params.currentChild,
    arrayOfChildren: this.props.navigation.state.params.arrayOfChildren
  };
}
  showDatePicker = (startOrEndCalendar) => {
    //we set the calendar (start or end)
    this.setState({ whichCalendar: startOrEndCalendar });
    this.setState({ isDatePickerVisible: true });
  }
  hideDatePicker = () => this.setState({ isDatePickerVisible: false });
  handleDatePicked = (date) => {
    //alert('A date has been picked: ', date);
    const yyyy = date.getFullYear().toString();
    const mm = (date.getMonth() + 101).toString().slice(-2);
    const dd = (date.getDate() + 100).toString().slice(-2);
    const dateString = `${dd}/${mm}/${yyyy}`;
    if (this.state.whichCalendar === 'start') {
      this.setState({ startDate: dateString });
    } else {
      this.setState({ endDate: dateString });
    }
    this.hideDatePicker();
  };
  showTimePicker = () => {
    //we set the calendar (start or end)
    this.setState({ isTimePickerVisible: true });
  }
  hideTimePicker = () => this.setState({ isTimePickerVisible: false });
  handleTimePicked = (date) => {
    //alert('A date has been picked: ', date);
    console.log(date);
    this.hideTimePicker();
  };
backBtn = () => {
    //we should build the Array of children
    //let currentChildrenArray = currentProps.childrenArray;
     const { navigate } = this.props.navigation;
    navigate(
           'singlechildconfig',
           {
             arrayOfChildren: this.state.arrayOfChildren,
             currentChildNum: this.state.currentChildNum
           }
         );
}
  changeCheckBox(num) {
     const previousState = this.state.checked;
     previousState[num] = !this.state.checked[num];
     this.setState({
      checked: previousState
    });
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
            source={this.state.arrayOfChildren[this.state.currentChild].photoImage}
            activeOpacity={1}
        />
        <Text style={styles.childInfoStyle}>

          {this.state.arrayOfChildren[this.state.currentChild].name}
        </Text>
        <Text style={styles.childInfoStyle}>
          {this.state.arrayOfChildren[this.state.currentChild].age} { ' anni '}
        </Text>
      </View>
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.buttonText}>
            Per favore scegli la data in cui inizia la scuola di{' '}
            {this.state.arrayOfChildren[this.state.currentChild].name}
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
        {this.state.startDate}
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
          {this.state.endDate}
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
           cui {' '}{this.state.arrayOfChildren[this.state.currentChild].name}
           {' '}va a scuola e l'orario
        </Text>
      </View>
      <View style={styles.calendarIconsStyleCheckBox}>
        <View style={styles.daysOfWeekRowStyle}>
          <CheckBox
            title='Lun'
            checked={this.state.checked[0]}
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
          > 08:32 am</Text>
          <Button
            icon={{ name: 'alarm', size: 28 }}
            onPress={this.showTimePicker}
            title={'(cambia)'}
            buttonStyle={styles.nextButtonStyle}
            backgroundColor='blue'
          />
        </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Mar'
          checked={this.state.checked[1]}
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
        > 08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={console.log('iconclock')}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
      <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Mer'
          checked={this.state.checked[2]}
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
        > 08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={console.log('f')}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Gio'
          checked={this.state.checked[3]}
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
        > 08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={console.log('f')}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Ven'
          checked={this.state.checked[4]}
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
        > 08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={console.log('f')}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Sab'
          checked={this.state.checked[5]}
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
        > 08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={console.log('f')}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
      </View>
        <View style={styles.daysOfWeekRowStyle}>
        <CheckBox
          title='Dom'
          checked={this.state.checked[6]}
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
        > 08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 28 }}
          onPress={console.log('f')}
          title={'(cambia)'}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
        />
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
