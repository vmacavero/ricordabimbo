/*eslint global-require: off */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PixelRatio,
  Alert,
  Keyboard,
  Platform,
  Dimensions
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
         backgroundColor: '#d9b709'
         //52b152
       },
  title: 'RicordaBimbo',
  params: navigation.state.params,
  headerLeft: <Button
  icon={{name: 'keyboard-arrow-left', size: 32 }}
  buttonStyle={{ backgroundColor: 'transparent', borderRadius: 40, padding: 0, marginLeft: 0, marginRight: 0}}
  containerViewStyle={{ padding: 0, marginLeft: 0, marginRight: 0 }}
  textStyle={{ textAlign: 'left' }}
  onPress={() => navigation.goBack()}
  title={``}
/>,
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
      childNameText: 'Come si chiama il tuo ',
      childNameTextEnd: ' figlio? E quanti anni ha?',
      canInsertPhotoText: 'Aggiungi la foto di tuo figlio.',
      calendarTextPart1:
        'Fai \'Tap\' sul calendario e scegli i giorni.',
      calendarTextPart2:
        ' e l\'ora in cui accompagni tuo figlio.',
      nextOrEndText: 'Prossimo',
      calendarIcon: 'calendar-question',
      calendarColor: '#b30000' //green is '#1fff6a'
    };
}

componentDidMount() {
  //and let's check if we have an image 
  if (this.naviProps.dataStruct[this.naviProps.currentChild - 1].photoImage !== require('../../img/icon_empty_camera.png')) {
    this.setState({ canInsertPhotoText: 'Fai \'Tap\' sulla foto per sostituirla.' });
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
      calendarColor: '#997300' 
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
  const index = this.naviProps.currentChild;
   if ((this.naviProps.dataStruct[index - 1].name === null) || (this.naviProps.dataStruct[index - 1].name === '')) {
    Alert.alert('E\' obbligatorio inserire il nome prima di configurare il calendario.');
  } else {
    this.props.navigation.navigate('calendarselection', { 
      dataStruct: this.naviProps.dataStruct,
      currentChild: this.naviProps.currentChild,
      totalChild: this.naviProps.totalChild,
      calendarPage: true
    });  
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
      Alert.alert('E\' obbligatorio inserire il nome.');
      return;
    }

    if (this.naviProps.dataStruct[index - 1].calendarDone === false) {
      Alert.alert('E\' obbligatorio configurare il calendario.');
      return;
    }

    if (this.naviProps.dataStruct[this.naviProps.currentChild - 1].photoImage === require('../../img/icon_empty_camera.png')) {
      Alert.alert('E\' obbligatorio scegliere una foto.');
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
           buttonEditDisabled: false
         });
      }
}

isIpad = () => { 
  console.log('isIpad');
  if (Platform.OS === 'ios') {
    //this is a check for iPad to avoid bug in image picker !
    var {height, width} = Dimensions.get('window');
    switch (height) {
      case 1024 :
        return false;
        break;
      case 1112 :
        return false;
        break;
      case 1366 :
        return false;
        break;
      default: return true;
    }
  }
  return true; //on Android
}

accessCameraRoll = () => {
const ImagePicker = require('react-native-image-picker');

const options = {
  title: 'Seleziona immagine',
  allowsEditing: this.isIpad(),
  maxWidth: 800,
  maxHeight: 800,
  quality: 0,
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
        this.setState({ canInsertPhotoText: 'Fai \'Tap\' sulla foto per sostituirla.' });
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
        colors={['#d9b709', '#d9b709', '#d9b709']}
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
       // backgroundColor: 'rgba(52, 52, 52, 0)'
      }}
    >
      <View
        style={{
          paddingRight: 1,
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
         // backgroundColor: 'rgba(52, 52, 52, 0)',
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
          <Text>Nome</Text>
        </FormLabel>
        <FormInput
          onChangeText={(text) => this.validateName(text)}
          width={100}
          inputStyle={styles.buttonText}
          
          value={this.naviProps.dataStruct[this.naviProps.currentChild - 1].name}
          onSubmitEditing={() => { Keyboard.dismiss(); }}
          onEndEditing={() => { Keyboard.dismiss(); }}
        />
      </View>
  
    <View
      style={{
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        }}
    >
      <Text
        style={styles.nameInputTextStyle}
      >Eta'</Text>
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
        thumbTintColor='white'
        minimumTrackTintColor='gray'
        maximumTrackTintColor='white'
        step={0.5}
        style={{ backgroundColor: 'rgba(52, 52, 52, 0)', width: 107, marginRight: 20 }}
        onValueChange={(value) => {
          this.setSliderValue(value);
          }
        }
      />
  </View>
</View>
<View style={{ padding: 0 }} >
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
      onPress={() => this.goToCalendarConfig()}
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
      icon={{ name: 'keyboard-arrow-right', size: 26, flex: 1, color: '#ffffff'}}
      iconRight
      onPress={this.nextBtn}
      buttonStyle={styles.nextButtonStyle}
      backgroundColor='#00134d'
      textStyle={{ textAlign: 'center', color: '#ffffff', fontSize: 18 }}
      containerViewStyle={{ alignSelf: 'flex-end', padding: 10 }}
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
    fontSize: PixelRatio.getPixelSizeForLayoutSize(8),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 2,
    color: '#fffdfd',
    backgroundColor: 'transparent'
  },
  nameInputTextStyle: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(7),
    fontFamily: 'Gill Sans',
    color: '#fffdfd',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginLeft: 0,
  },
  nextButtonStyle: {
   // backgroundColor: 'rgba(52, 52, 52, 0)',
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
    paddingTop: 20,
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
