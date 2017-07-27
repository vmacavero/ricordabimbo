import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
  Avatar
} from 'react-native-elements';

class ConfigAge extends Component {
  static navigationOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: {
         backgroundColor: '#52b152'
       },
  title: 'RicordaBimbo',
  headerRight:
    <Text
     style={{
       color: 'white',
       fontWeight: 'bold',
       fontSize: 16,
       paddingRight: 15,
     }}
    >
     {navigation.state.params.currentChild}/{navigation.state.params.totalChild}
    </Text>
});
state = {
  currentImage: require('../../img/icon_empty_camera.png'),
  currentChildNum: 1,
  childNameText: 'Benissimo, come si chiama il tuo ',
  childNameTextEnd: ' figlio?',
  canInsertPhotoText: 'Puoi aggiungere una foto di tuo figlio o figlia, se ti va',
  calendarTextPart1:
    'Adesso fai \'Tap\' sul calendario e scegliamo i giorni',
  calendarTextPart2:
    ' e l\'ora in cui accompagni tuo figlio va a scuola',
};


validateName = (text) => {
  console.log('vaildate name ');
  console.log(text);
  //TO DO : VALIDATION OF NAME !!!
}
goToCalendarConfig = () => {
  console.log('cal pressed go to calendarconfig');
   const { navigate } = this.props.navigation;
   navigate('calendarselection',
    { imgUri: this.state.currentImage });

}
nextBtn = () => {
  //we should build the Array of children
  const currentProps = this.props.navigation.state.params;
  const currentPage = currentProps.currentChild;
  const totalPage = currentProps.totalChild;
  let currentChildrenArray = currentProps.childrenArray;
   const { navigate } = this.props.navigation;
   if (currentPage < totalPage) {
     navigate(
       'singlechildconfig',
       { totalChild: totalPage,
         currentChild: currentPage + 1,
         childrenArray: currentChildrenArray
       }
     );
   } else {
     navigate('home');
   }
}
accessCameraRoll = () => {
const ImagePicker = require('react-native-image-picker');
// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb',
      title: 'Choose Photo ' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
// Open Image Library:
ImagePicker.launchImageLibrary(options, (response) => {
  const imageUriFromCamera = { uri: response.uri };
      this.setState({ currentImage: imageUriFromCamera });
      this.setState({ canInsertPhotoText: 'Ottimo! Fai tap sulla foto per sostituirla' });
  });
}
  render(props) {
      const { navigate } = this.props.navigation;
      const { currentChild } = this.props.navigation.state.params;
let ordinal = '';
switch (currentChild) {
  case 2 : ordinal = 'secondo';
    break;
  case 3 : ordinal = 'terzo';
    break;
  case 4 : ordinal = 'quarto';
    break;
  case 5 : ordinal = 'quinto';
    break;
  default : ordinal = 'primo';

}

   return (
    <LinearGradient
        colors={['#52b152', '#399ff8', '#1abc6a']}
        style={styles.linearGradient}
    >
      <View style={{ paddingTop: 1 }}>
        <Text style={styles.buttonText}>
            {this.state.childNameText}
            {ordinal}
            {this.state.childNameTextEnd}
        </Text>
      </View>
      <View>
        <FormLabel>Nome</FormLabel>
        <FormInput
          onChangeText={(text) => this.validateName(text)}
        />
        <FormValidationMessage>
  {'Campo Richiesto'}
</FormValidationMessage>
</View>
<View style={{ padding: 5 }} >
  <Text style={styles.buttonText}>
    {this.state.canInsertPhotoText}
  </Text>
</View>
  <View style={styles.childStyle}>
  <Avatar
      large
      rounded
      source={this.state.currentImage}
      onPress={this.accessCameraRoll}
      activeOpacity={0.7}
  />
  </View>
  <View style={{ padding: 5 }} >
    <Text style={styles.buttonText}>
      {this.state.calendarTextPart1}
      {this.state.calendarTextPart2}
    </Text>
  </View>
  <View style={styles.childStyle}>
  <Icon
    raised
    name='date-range'
    size={22}
    //type='font-awesome'
    color='#192f6a'
    onPress={this.goToCalendarConfig}
  />
</View>
<View
  style={{
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
    alignItems: 'center', }}
>
  <Button
    icon={{ name: 'trending-flat', size: 32, flex: 1 }}
    iconRight
    onPress={this.nextBtn}
    buttonStyle={styles.nextButtonStyle}
    backgroundColor='blue'
    textStyle={{ textAlign: 'center' }}
    title={'Prossimo'}
  />
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
  buttonText: {
    fontSize: 24,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 4,
    color: '#fffdfd',
    backgroundColor: 'transparent',
  },
  nextButtonStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0.01)',
    borderRadius: 10

  },
  childStyle: {
    flex: 0,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#fffdfd'
  },
});

export default ConfigAge;
