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

class InfoCredits extends Component {
    static navigationOptions = () => ({
    headerTintColor: 'white',
    headerStyle: {
          backgroundColor: '#4c669f'
        },
    title: 'RicordaBimbo - Credits',
    });
    constructor(props) {
      super(props); 
    }
  render() {
   return (
      <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}
      >
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.buttonText}>
              Copyright 2018 Victor Macavero
            </Text>
            <Text style={styles.buttonText}>
              Images Copyright di Unsplash.com e dei rispettivi Autori
            </Text>
            <Text style={styles.buttonText}>
              Contatti : victor@macavero.com
            </Text>
            <Text style={styles.buttonText}>
              Testing di Francoise Lombardi
            </Text>


            
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
  gradientStyle: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  buttonText: {
    fontSize: PixelRatio.getPixelSizeForLayoutSize(10),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#fffdfd',
    backgroundColor: 'transparent',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
});

export default InfoCredits;
