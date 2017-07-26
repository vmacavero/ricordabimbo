import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Avatar, Icon, CheckBox } from 'react-native-elements';
import DateTimePicker from 'react-native-modal-datetime-picker';

class CalendarSelection extends Component {
  static navigationOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: {
         backgroundColor: '#1c669f'
       },
  title: 'RicordaBimbo',
  headerRight: <Text
   style={this.headerRightStyle}
  >
   Cal
  </Text>
});
constructor(props, context) {
  super(props, context);
  this.changeCheckBox = this.changeCheckBox.bind(this);

this.state = {
  checked: [true, true, true, true, true, false, false],
  sliderNumber1: 1,
  isDateTimePickerVisible: false,
  };
}
openCal = () => {

};
  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = (date) => {
    //alert('A date has been picked: ', date);
    alert('');
    alert(date);
    this.hideDateTimePicker();
  };

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
        <Avatar
            large
            rounded
            source={this.props.navigation.state.params.imgUri}
            onPress={console.log('avatpressed')}
            activeOpacity={0.7}
        />
        <View style={{ paddingTop: 20 }}>
          <Text style={styles.buttonText}>
            Per favore scegli la data in cui inizia la scuola di
            "Nome figlio/a" e quando termina
          </Text>

        </View>
        <View style={styles.calendarIconsStyleBackGroundAlpha}>
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
          onPress={this.showDateTimePicker}
        />
        <Icon
          raised
          name='trending-flat'
          size={22}
          color='#192f6a'
          onPress={() => console.log('hello')}
        />
        <Icon
          raised
          name='date-range'
          size={22}
          //type='font-awesome'
          color='#192f6a'
          onPress={() => console.log('hello')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
        />
      </View>
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.buttonText}>
          In basso scegli i giorni in
           cui tuo figlio/a va a scuola
           e l'orario
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
            onPress={console.log('f')}
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
          onPress={console.log('f')}
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
   iconRight
   onPress={this.nextBtn}
   buttonStyle={styles.nextButtonStyle}
   backgroundColor='blue'
   textStyle={{ textAlign: 'center' }}
   title={'Prossimo'}
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


export default CalendarSelection;
