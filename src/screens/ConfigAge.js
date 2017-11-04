import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio
} from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import { Slider, Button } from 'react-native-elements';
import ChildrenIcon from '../components/ChildrenIcon';
import { setNumberOfChildren } from '../actions';
import dataStructure from '../dataStructure.json';

class ConfigAge extends Component {
    static navigationOptions = () => ({
    headerTintColor: 'white',
    headerStyle: {
          backgroundColor: '#4c669f'
        },
    title: 'RicordaBimbo',
    });
    constructor(props) {
    super(props);
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
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}
      >
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.buttonText}>
              Inserisci qui il numero dei tuoi Bimbi !
            </Text>
          </View>
          <View
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start' }}
          >
    <Slider
      value={this.state.numberOfChildren}
      minimumValue={1}
      maximumValue={5}
      step={1}
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
    fontSize: PixelRatio.getPixelSizeForLayoutSize(12),
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
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
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },

});


export default ConfigAge;
