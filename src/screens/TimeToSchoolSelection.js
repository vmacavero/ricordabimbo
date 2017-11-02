import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Avatar, Icon } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

class TimeToSchoolSelection extends Component {
  static navigationOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: {
         backgroundColor: '#1c669f'
       },
  title: 'RicordaBimbo',
  headerRight:
    <Text
      style={this.headerRightStyle}
    >
      Cal
    </Text>
});
constructor(props, context) {
  super(props, context);


this.state = {
  checked: [true, true, true, true, true, false, false],
  sliderNumber1: 1,
  isDateTimePickerVisible: false,
  };
}

 navi() {

 }
 _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

 _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

 _handleDatePicked = (date) => {
   console.log('A date has been picked: ', date);
   this._hideDateTimePicker();
 };
  render() {
   return (
      <LinearGradient
        colors={['#1c669f', '#9a9e1d', '#9a9e1d']}
        style={styles.linearGradient}
      >
        <Avatar
            large
            rounded
            source={''}
            onPress={console.log('avatpressed')}
            activeOpacity={0.7}
        />

          <View style={styles.calendarIconsStyle}>
            <Icon
              raised
              name='date-range'
              size={22}
              //type='font-awesome'
              color='#192f6a'
              onPress={this._showDateTimePicker}
            />

       <DateTimePicker
         isVisible={this.state.isDateTimePickerVisible}
         onConfirm={this._handleDatePicked}
         onCancel={this._hideDateTimePicker}
       />
     </View>
 <Button
   icon={{ name: 'trending-flat', size: 32 }}
   iconRight
   onPress={this.nextBtn}
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
  nextButtonStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
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
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
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


export default TimeToSchoolSelection;
