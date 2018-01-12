/*eslint global-require: off */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native';
//import { connect } from 'react-redux';
//import { setNumberOfChildren } from '../actions';
import LinearGradient from 'react-native-linear-gradient';
import { Slider, Button } from 'react-native-elements';
import ChildrenIcon from '../components/ChildrenIcon';
import dataStructure from '../dataStructure.json';
import { sizeNorm } from '../ScreenSizeHelper';

class ConfigAge extends Component {
    static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
          backgroundColor: '#fa931d'
          //955104
        },
        params: navigation.state.params,
        headerLeft: <Button
        
        icon={{name: 'keyboard-arrow-left', size: sizeNorm(10,1)}}
        buttonStyle={{backgroundColor: 'transparent', borderRadius: 40, padding: 0, marginLeft: 0, marginRight: 0}}
        containerViewStyle={{padding: 0, marginLeft: 0, marginRight: 0}}
        textStyle={{textAlign: 'left'}}
        onPress={() => navigation.goBack()}
        title={``}
      />,
    title: 'RicordaBimbo',
    });
    constructor(props) {
      super(props);
      Text.defaultProps.allowFontScaling = false;
      for (const d of dataStructure) {
        //setting all images to the empty image
        d.photoImage = require('../../img/icon_empty_camera.png');
      }
      this.state = {
        numberOfChildren: 1,
      };
}

showIcons() {
   const arr = [];
   for (let i = 0; i < this.state.numberOfChildren; i++) {
     arr.push(<ChildrenIcon key={i} />);
   }
   return arr;
 }

nextBtn = () => {
  const { navigate } = this.props.navigation;
  navigate(
  'singlechildconfig',
    { totalChild: this.state.numberOfChildren,
      currentChild: 1,
      dataStruct: dataStructure
    }
  );
}

  render() {
   return (
      <LinearGradient
          //colors={['#4c669f', '#3b5998', '#192f6a']}
          colors={['#fa931d', '#fa931d', '#fa931d']}
          
          style={styles.linearGradient}
      >
          <View style={{ paddingTop: sizeNorm(1,2) }}>
            <Text allowFontScaling={false} style={styles.buttonText}>
              Quanti bambini hai?
            </Text>
            
            <Text style={styles.buttonText}>
              Muovi il pallino lungo la linea.
            </Text>
          </View>
       <View
          style={styles.gradientStyle}
       >
        <Slider
          value={this.state.numberOfChildren}
          minimumValue={1}
          maximumValue={5}
          step={1}
          thumbTintColor='white'
          minimumTrackTintColor='gray'
          maximumTrackTintColor='white'
          onValueChange={(numberOfChildren) => {
            this.setState({ numberOfChildren });
            }
          }
        />

    <View style={styles.childStyle}>
        { this.showIcons() }
  </View>
      <Text
        style={styles.buttonText}
      >
        {this.state.numberOfChildren}
      </Text>
  </View>
  <Button
    icon={{ name: 'keyboard-arrow-right', size: sizeNorm(10, 1), color: '#ffffff' }}
    iconRight
    onPress={this.nextBtn}
    buttonStyle={styles.nextButtonStyle}
    backgroundColor='#00134d'
    textStyle={{ textAlign: 'center', color: '#ffffff', fontSize: sizeNorm(10, 1) }}
    title={'Prossimo'}
    containerViewStyle={{ alignSelf: 'flex-end', padding: 10 }}
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
  gradientStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  buttonText: {
    fontSize: sizeNorm(10, 1),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#fffdfd',
    backgroundColor: 'transparent',
  },
  nextButtonStyle: {
    //backgroundColor: 'rgba(52, 52, 52, 0.01)',
    borderRadius: 10,
    
  },
  childStyle: {
    flex: 0,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: sizeNorm(7,1),
  },
});

export default ConfigAge;
