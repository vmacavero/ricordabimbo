import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Slider, Button } from 'react-native-elements';
import ChildrenIcon from '../components/ChildrenIcon';

class ConfigAge extends Component {
  static navigationOptions = ({ navigation }) => ({
  headerTintColor: 'white',
  headerStyle: {
         backgroundColor: '#4c669f'
       },
  title: 'RicordaBimbo',
});

state = {
  sliderNumber: 1
};
arr = [(<ChildrenIcon key={1} />)];
showIcons() {
   const iconNum = this.state.sliderNumber;
   this.arr = [];
   for (let i = 0; i < iconNum; i++) {
     this.arr.push(<ChildrenIcon key={i} />);
   }
 }
nextBtn = () => {
  //we should build the Array of children
  let childrenArray = [{ name: '', age: 0 }, 2, 3, 4];
  const { navigate } = this.props.navigation;
  navigate(
  'singlechildconfig',
    { totalChild: this.state.sliderNumber,
      currentChild: 1,
      childrenArray: childrenArray
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
    value={this.state.sliderNumber}
    minimumValue={1}
    maximumValue={5}
    step={1}
    onValueChange={(sliderNumber) => {
      this.setState({ sliderNumber });
      this.showIcons();
      }
    }
  />

  <View style={styles.childStyle}>
        { this.arr }
 </View>
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
    fontSize: 28,
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
