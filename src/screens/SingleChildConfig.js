/*eslint global-require: off */
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
import * as Animatable from 'react-native-animatable';

/* Receives folllowing props from navigator:
totalChild: this.state.numberOfChildren,
      currentChild: 1,
      dataStruct: dataStructure
*/

class SingleChildConfig extends Component {
  static navigationOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: {
         backgroundColor: '#52b152'
       },
  title: 'RicordaBimbo',
  headerRight:
    <Text
     style={styles.headerRightTextStyle}
    >
     {navigation.state.params.currentChild}/{navigation.state.params.totalChild}
    </Text>
});

constructor(props) {
  super(props);
  this.naviProps = this.props.navigation.state.params;
  Text.defaultProps.allowFontScaling = false;
    this.state = {
      //currentImage: require('../../img/icon_empty_camera.png'),
      //currentChild: this.props.navigation.state.params.currentChild,
      //sliderValue: 0.5,
      requiredField: true,
      nameTextField: '',
      childNameText: 'Benissimo, come si chiama il tuo ',
      childNameTextEnd: ' figlio? e quanti anni ha ?',
      canInsertPhotoText: 'Puoi aggiungere una foto di tuo figlio o figlia, te lo consiglio !',
      calendarTextPart1:
        'Adesso fai \'Tap\' sul calendario e scegliamo i giorni',
      calendarTextPart2:
        ' e l\'ora in cui accompagni tuo figlio va a scuola',
      nextOrEndText: 'prossimo',
      calendarIcon: 'calendar-question',
      calendarColor: '#ff0000' //green is '#1fff6a'
    };
}

componentDidMount() {
  //and let's check if we have an image
  if (this.naviProps.photoImage !== require('../../img/icon_empty_camera.png')) {
    this.setState({ canInsertPhotoText: 'Ottimo! Fai tap sulla foto per sostituirla' });
  }
//let's check if name isn't empty
  if (this.naviProps.dataStruct[this.naviProps.currentChild - 1].name !== '') {
    this.setState({ requiredField: false });
  }
  
  //check if calendar is Done
   const index = this.naviProps.currentChild;
   if (this.naviProps.dataStruct[index - 1].calendarDone === true) {
    this.setState({ 
      calendarIcon: 'calendar-check', 
      calendarColor: '#1fff6a' 
    });
    //stop animation
    this.refs.calendarButton.stopAnimation();
   } else {
    //we should leave it false ?
   }
}

setSliderValue = (value) => { 
  this.naviProps.dataStruct[this.naviProps.currentChild - 1].age = value;
  this.setState({ sliderValue: value });
}

validateName = (text) => {
  if ((text === null) || (text === '')) {
        this.setState({ requiredField: true });
    } else {
        this.setState({ requiredField: false });
    }
  this.setState({ nameTextField: text });
 //
  this.naviProps.dataStruct[this.naviProps.currentChild - 1].name = text;
  console.log(this.naviProps);
}
goToCalendarConfig = () => {
   const { navigate } = this.props.navigation;
   if ((this.state.nameTextField !== null) && (this.state.nameTextField !== '')) {
    /* navigate('calendarselection',
      { imgUri: this.state.currentImage,
        childName: this.state.nameTextField,
        currentChildNum: this.props.navigation.state.params.currentChild,
        childAge: this.state.sliderValue
      });*/

    navigate('calendarselection',
      { arrayOfChildren: this.state.arrayOfChildren,
        currentChildNum: this.props.navigation.state.params.currentChild,

      });
  } else {
    Alert.alert('per favore inserisci un nome prima di configurare il calendario');
  }
}
nextBtn = () => {  
 /* if (this.naviProps.dataStruct[this.naviProps.currentChild - 1].name === '') {
      Alert.alert('per favore, inserisci il nome...');
  } else {
    console.log('else');
    console.log(this.naviProps);
      if (this.naviProps.currentChild < this.naviProps.totalChild) {
      this.props.navigation.navigate('singlechildconfig', {
      currentChild: this.naviProps.currentChild + 1,
      totalChild: this.naviProps.totalChild,
      dataStruct: this.naviProps.dataStruct,
      calendarPage: true
       }); 
      } else {
         this.props.navigation.navigate('endofconfig', {
           dataStruct: this.naviProps.dataStruct
         });
       }
    }*/
    const index = this.naviProps.currentChild;
    if (this.naviProps.dataStruct[index - 1].name === '') {
      Alert.alert('per favore, inserisci il nome...');
      return;
    }

    if (this.naviProps.dataStruct[index - 1].calendarDone === false) {
      Alert.alert('per favore fai tap sul calendario e configuralo!');
      return;
    }

    if (index < this.naviProps.totalChild) {
        this.props.navigation.navigate('singlechildconfig', {
        currentChild: this.naviProps.currentChild + 1,
        totalChild: this.naviProps.totalChild,
        dataStruct: this.naviProps.dataStruct,
        calendarPage: true
        }); 
    } else {
         this.props.navigation.navigate('endofconfig', {
           dataStruct: this.naviProps.dataStruct,
         });
      }
}

accessCameraRoll = () => {
const ImagePicker = require('react-native-image-picker');

const options = {
  title: 'Select Avatar',
  allowsEditing: 'true',
  takePhotoButtonTitle: 'Usa la Fotocamera',
  chooseFromLibraryButtonTitle: 'Scegli dall\'album Foto',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};
// Open Image Library:
  ImagePicker.showImagePicker(options, (response) => {
    if ((!response.didCancel) && (!response.error)) { 
        //const imageUriFromCamera = { uri: response.uri };
       // const imageUriFromCamera = { uri: 'data:image/jpeg;base64,' + response.data };
        const imageUriFromCamera = { uri: `data:image/jpeg;base64,${response.data}` };
        this.setState({ currentImage: imageUriFromCamera });
        this.setState({ canInsertPhotoText: 'Ottimo! Fai tap sulla foto per sostituirla' });
        this.naviProps.dataStruct[this.naviProps.currentChild - 1].photoImage = imageUriFromCamera;
        this.props.navigation.setParams();
    }
  });
}

  render() {
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
          value={this.naviProps.dataStruct[this.naviProps.currentChild - 1].name}
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
            color='red'
            onPress={null}
            backgroundColor='transparent'
          />
        campo richiesto
        <Icon
          raised
          name='arrow-upward'
          size={13}
          color='red'
          onPress={null}
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
        {this.naviProps.dataStruct[this.naviProps.currentChild - 1].age}
      </Text>
      <Slider
        value={this.naviProps.dataStruct[this.naviProps.currentChild - 1].age}
        minimumValue={0.5}
        maximumValue={15}
        step={0.5}
        style={{ backgroundColor: 'rgba(52, 52, 52, 0)', width: 107, marginRight: 20 }}
        onValueChange={(value) => {
          this.setSliderValue(value);
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
      source={this.naviProps.dataStruct[this.naviProps.currentChild - 1].photoImage}
      onPress={this.accessCameraRoll}
      activeOpacity={0.7}
  />
  </View>
  <Animatable.View 
    animation="swing" 
    iterationCount="infinite" 
    duration={1500} 
    ref="calendarButton"
  >
  <View style={styles.calendarButtonStyle}>
 
    <Icon
      raised
      name={this.state.calendarIcon}
      size={36}
      type='material-community'
      color={this.state.calendarColor}
      //color='#192f6a'
      onPress={() => {
        this.props.navigation.navigate('calendarselection', { 
          dataStruct: this.naviProps.dataStruct,
          currentChild: this.naviProps.currentChild,
          totalChild: this.naviProps.totalChild,
          calendarPage: true
        });
      }}
    />
     </View>
  </Animatable.View>
 

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
      title={this.state.nextOrEndText}
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
  calendarButtonStyle: {
    flex: 0,
    paddingTop: 30,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#fffdfd'
  },
  headerRightTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    paddingRight: 15
  }
});

export default SingleChildConfig;
