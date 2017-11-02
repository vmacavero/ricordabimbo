import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Alert
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage,
  Icon,
  Avatar,
  Slider
} from 'react-native-elements';

class SingleChildConfig extends Component {
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
       fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
       paddingRight: 15
     }}
    >
     {navigation.state.params.currentChild}/{navigation.state.params.totalChild}
    </Text>
});
constructor(props) {
  super(props);
  Text.defaultProps.allowFontScaling = false;
  console.log('sono nel costruttore di singlechildconfig, costruisco lo stato');
    this.state = {
      currentImage: require('../../img/icon_empty_camera.png'),
      currentChild: this.props.navigation.state.params.currentChild,
      sliderValue: 0.5,
      requiredField: true,
      //ARRAY WILL START FROM 1 and not 0 FOR CONVENIENCE !
      arrayOfChildren: this.props.navigation.state.params.arrayOfChildren,
      nameTextField: '',
      childNameText: 'Benissimo, come si chiama il tuo ',
      childNameTextEnd: ' figlio? e quanti anni ha ?',
      canInsertPhotoText: 'Puoi aggiungere una foto di tuo figlio o figlia, te lo consiglio !',
      calendarTextPart1:
        'Adesso fai \'Tap\' sul calendario e scegliamo i giorni',
      calendarTextPart2:
        ' e l\'ora in cui accompagni tuo figlio va a scuola',
    };

    console.log('fatto. lo stato e : ');
    console.log(this.state);
}
validateName = (text) => {
  console.log('validatename');
  if ((text === null) || (text === '')) {
        this.setState({ requiredField: true });
    } else {
        this.setState({ requiredField: false });
    }
  this.setState({ nameTextField: text });
}
goToCalendarConfig = () => {
  console.log('cal pressed go to calendarconfig');
   const { navigate } = this.props.navigation;
   if ((this.state.nameTextField !== null) && (this.state.nameTextField !== '')) {
    /* navigate('calendarselection',
      { imgUri: this.state.currentImage,
        childName: this.state.nameTextField,
        currentChildNum: this.props.navigation.state.params.currentChild,
        childAge: this.state.sliderValue
      });*/

    let arrayCopy = this.state.arrayOfChildren;

    const currentIndex = this.props.navigation.state.params.currentChild;
    arrayCopy[currentIndex].photoImage = this.state.currentImage;
    arrayCopy[currentIndex].name = this.state.nameTextField;
    arrayCopy[currentIndex].age = this.state.sliderValue;

    this.setState({ arrayOfChildren: arrayCopy });

    navigate('calendarselection',
      { arrayOfChildren: this.state.arrayOfChildren,
        currentChildNum: this.props.navigation.state.params.currentChild,

      });
  } else {
    Alert.alert('per favore metti un nome ?');
  }
}
nextBtn = () => {
  //we should build the Array of children
  console.log('sono in nexBtn di singlechildconfig');
  const currentProps = this.props.navigation.state.params;
  console.log('currentprops = ');
  console.log(currentProps);
  const currentIndex = currentProps.currentChild;
  const totalPages = currentProps.totalChild;
  let arrayOfChildrenCopy = this.state.arrayOfChildren;
  arrayOfChildrenCopy[currentIndex].photoImage = this.state.currentImage;
  arrayOfChildrenCopy[currentIndex].name = this.state.nameTextField;
  arrayOfChildrenCopy[currentIndex].age = this.state.sliderValue;
  this.setState({ arrayOfChildren: this.arrayOfChildrenCopy });

  //FIXME !
  let currentarrayOfChildren = currentProps.arrayOfChildren;
   const { navigate } = this.props.navigation;
   if ((this.state.nameTextField !== null) && (this.state.nameTextField !== '')) {
     if (currentIndex < totalPages) {
       navigate(
         'singlechildconfig',
         { totalChild: totalPages,
           currentChild: currentIndex + 1,
           arrayOfChildren: this.state.arrayOfChildren
         }
       );
     } else {
       //this should be changed !!! will go to finalize !
       navigate(
         'calendarselection',
         { totalChild: totalPages,
           currentChild:  1,
           arrayOfChildren: this.state.arrayOfChildren
         }
       );
     }
 } else {
    Alert.alert('per favore, inserisci il nome...');
  }
}
accessCameraRoll = () => {
const ImagePicker = require('react-native-image-picker');
// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'RicordaBimbo',
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
    <View
      style={{
        paddingRight: 1,
        flex: 0,
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(52, 52, 52, 0)'
      }}
    >
      <View
        style={{
          paddingRight: 1,
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          backgroundColor: 'rgba(52, 52, 52, 0)',
          marginBottom: 15,
        }}
      >
        <FormLabel
          labelStyle={styles.nameInputTextStyle}
          containerStyle={{
            flex: 1,
            padding: 0,
            margin: 0,
            justifyContent: 'space-between',
          }}
        >
          Nome
        </FormLabel>
        <FormInput
          onChangeText={(text) => this.validateName(text)}
          width={100}
          inputStyle={styles.buttonText}
          value={this.state.nameTextField}
        />
      </View>
      { ((this.state.requiredField === true) || (this.state.requiredField === '')) &&

    <View>
        <FormValidationMessage
          containerStyle={{
            flex: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
          labelStyle={{
            flex: 0,
            color: 'red',
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            padding: 0,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}

        >
          <Icon
            raised
            name='arrow-upward'
            size={13}
            //type='font-awesome'
            color='red'
            onPress={console.log('richiest')}
            backgroundColor='transparent'
          />
        campo richiesto
        <Icon
          raised
          name='arrow-upward'
          size={13}
          //type='font-awesome'
          color='red'
          onPress={console.log('richiest')}
          backgroundColor='transparent'
        />
      </FormValidationMessage>
    </View>
  }
    <View
      style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 30,
        }}
    >
      <Text
        style={styles.nameInputTextStyle}
      >
        Eta'
      </Text>
      <Text
        style={styles.buttonText}
        width={100}
      >
        {this.state.sliderValue}
      </Text>
      <Slider
        value={this.state.sliderValue}
        minimumValue={0.5}
        maximumValue={15}
        step={0.5}
        style={{ backgroundColor: 'rgba(52, 52, 52, 0)', width: 107, marginRight: 20 }}
        onValueChange={(sliderValue) => {
          this.setState({ sliderValue });
          }
        }
      />
  </View>
</View>
<View style={{ padding: 5 }} >
  <Text style={styles.buttonText}>
    {this.state.canInsertPhotoText}
  </Text>
</View>
  <View style={styles.childStyle}>
  <Avatar
      xlarge
      rounded
      source={this.state.currentImage}
      onPress={this.accessCameraRoll}
      activeOpacity={0.7}
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
    fontSize: 22,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 2,
    color: '#fffdfd',
    backgroundColor: 'transparent'
  },
  nameInputTextStyle: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    color: '#fffdfd',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  nextButtonStyle: {
    backgroundColor: 'rgba(52, 52, 52, 0)',
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

export default SingleChildConfig;
