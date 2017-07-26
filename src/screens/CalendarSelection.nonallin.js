import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Avatar, Icon, CheckBox } from 'react-native-elements';

class ConfigAge extends Component {
  static navigationOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: {
         backgroundColor: '#1c669f'
       },
  title: 'RicordaBimbo',
  headerRight: <Text
   style={{
     color: 'white',
     fontWeight: 'bold',
     fontSize: 16,
     paddingRight: 15,
   }}
  >
   Cal
  </Text>
});
constructor(props, context) {
  super(props, context);
  this.changeCheckBox = this.changeCheckBox.bind(this);
}
state = {
  checkedMon: true,
  checkedTue: true,
  checkedWed: true,
  checkedThu: true,
  checkedFri: true,
  checkedSat: false,
  checkedSun: false,
  sliderNumber1: 1,
};
 changeCheckBox(num) {
  switch (num) {
     case 1 : this.setState({ checkedMon: !this.state.checkedMon });
     break;
     case 2 : this.setState({ checkedTue: !this.state.checkedTue });
     break;
     case 3 : this.setState({ checkedWed: !this.state.checkedWed });
     break;
     case 4 : this.setState({ checkedThu: !this.state.checkedThu });
     break;
     case 5 : this.setState({ checkedFri: !this.state.checkedFri });
     break;
     case 6 : this.setState({ checkedSat: !this.state.checkedSat });
     break;
     default: this.setState({ checkedSun: !this.state.checkedSun });
     break;
   }
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
          onPress={() => console.log('hello')}
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
      <View style={{ paddingTop: 20 }}>
        <Text style={styles.buttonText}>
          In basso scegli i giorni in cui tuo figlio/a va a scuola
        </Text>
      </View>
      <View style={styles.calendarIconsStyleCheckBox}>
        <View style={styles.dayOfWeekRowStyle}>
          <CheckBox
            title='Lun'
            checked={this.state.checkedMon}
            containerStyle={styles.daysOfWeekStyle}
            textStyle={styles.daysOfWeekTextStyle}
              onPress={this.changeCheckBox.bind(this, 1)}
          />
          <Text style={styles.daysOfWeekTextStyle}>alle</Text>
          <Text style={styles.daysOfWeekTextStyle}>08:32 am</Text>
          <Button
            icon={{ name: 'alarm', size: 24 }}
            onPress={this.nextBtn}
            buttonStyle={styles.nextButtonStyle}
            backgroundColor='blue'
            textStyle={{ textAlign: 'center' }}
            title={'(cambia)'}
          />
      </View>
      <View style={styles.dayOfWeekRowStyle}>
        <CheckBox
          title='Mar'
          checked={this.state.checkedTue}
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 2)}
        />
        <Text style={styles.daysOfWeekTextStyle}>alle</Text>
        <Text style={styles.daysOfWeekTextStyle}>08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 24 }}
          onPress={this.nextBtn}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
          textStyle={{ textAlign: 'center' }}
          title={'(cambia)'}
        />
      </View>
        <View style={styles.dayOfWeekRowStyle}>
        <CheckBox
          title='Mer'
          checked={this.state.checkedWed}
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 3)}
        />
        <Text style={styles.daysOfWeekTextStyle}>alle</Text>
        <Text style={styles.daysOfWeekTextStyle}>08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 24 }}
          onPress={this.nextBtn}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
          textStyle={{ textAlign: 'center' }}
          title={'(cambia)'}
        />
    </View>
        <View style={styles.dayOfWeekRowStyle}>
        <CheckBox
          title='Gio'
          checked={this.state.checkedThu}
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 4)}
        />
        <Text style={styles.daysOfWeekTextStyle}>alle</Text>
        <Text style={styles.daysOfWeekTextStyle}>08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 24 }}
          onPress={this.nextBtn}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
          textStyle={{ textAlign: 'center' }}
          title={'(cambia)'}
        />
    </View>
        <View style={styles.dayOfWeekRowStyle}>
        <CheckBox
          title='Ven'
          checked={this.state.checkedFri}
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 5)}
        />
        <Text style={styles.daysOfWeekTextStyle}>alle</Text>
        <Text style={styles.daysOfWeekTextStyle}>08:32 am</Text>
        <Button
          icon={{ name: 'alarm', size: 24 }}
          onPress={this.nextBtn}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
          textStyle={{ textAlign: 'center' }}
          title={'(cambia)'}
        />
    </View>
        <View style={styles.dayOfWeekRowStyle}>
        <CheckBox
          title='Sab'
          checked={this.state.checkedSat}
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 6)}
        />
        <Text style={styles.daysOfWeekTextStyle}>{}</Text>
        <Text style={styles.daysOfWeekTextStyle}>{}</Text>
        <Button
          icon={{ name: 'alarm-off', size: 24 }}
          onPress={this.nextBtn}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
          textStyle={{ textAlign: 'center' }}
          title={'(cambia)'}
        />
    </View>
        <View style={styles.dayOfWeekRowStyle}>
        <CheckBox
          title='Dom'
          checked={this.state.checkedSun}
          containerStyle={styles.daysOfWeekStyle}
          textStyle={styles.daysOfWeekTextStyle}
          onPress={this.changeCheckBox.bind(this, 7)}
        />
        <Text style={styles.daysOfWeekTextStyle}>{}</Text>
        <Text style={styles.daysOfWeekTextStyle}>{}</Text>
        <Button
          icon={{ name: 'alarm-off', size: 24 }}
          onPress={this.nextBtn}
          buttonStyle={styles.nextButtonStyle}
          backgroundColor='blue'
          textStyle={{ textAlign: 'center' }}
          title={'(cambia)'}
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
    flex: 0,
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
    padding: 0,
  },
  daysOfWeekStyle: {
    padding: 0,
    flex: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderWidth: 0,
    paddingRight: 0,
    backgroundColor: 'rgba(52, 52, 52, 0)',
  },
  daysOfWeekTextStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 5,
    color: '#fffdfd',
    backgroundColor: 'transparent',
},
dayOfWeekRowStyle: {
  flex: 0,
  justifyContent: 'flex-start',
  flexDirection: 'row',
  alignItems: 'flex-start',
},
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },

});


export default ConfigAge;
