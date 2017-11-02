import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio
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
constructor(props) {
  super(props);
  this.state = {
    numberOfChildren: 1,
    arrayOfChildren: [
      {
        name: String,
        age: String,
        photoImage: null,
        calendarData:
         {
          mon: Date, tue: Date, wed: Date, thu: Date, fri: Date, sat: Date, sun: Date
         }
       },
       {
         name: String,
         age: String,
         photoImage: String,
         calendarData:
          {
           mon: Date, tue: Date, wed: Date, thu: Date, fri: Date, sat: Date, sun: Date
          }
        },
        {
          name: String,
          age: String,
          photoImage: null,
          calendarData:
           {
            mon: Date, tue: Date, wed: Date, thu: Date, fri: Date, sat: Date, sun: Date
           }
         },
         {
           name: String,
           age: String,
           photoImage: null,
           calendarData:
            {
             mon: Date, tue: Date, wed: Date, thu: Date, fri: Date, sat: Date, sun: Date
            }
          },
          {
            name: String,
            age: String,
            photoImage: null,
            calendarData:
             {
              mon: Date, tue: Date, wed: Date, thu: Date, fri: Date, sat: Date, sun: Date
             }
           },
           {
             name: String,
             age: String,
             photoImage: null,
             calendarData:
              {
               mon: Date, tue: Date, wed: Date, thu: Date, fri: Date, sat: Date, sun: Date
              }
            }
      ],
  };
}
arr = [(<ChildrenIcon key={1} />)];
showIcons() {
   const iconNum = this.state.numberOfChildren;
   this.arr = [];
   for (let i = 0; i < iconNum; i++) {
     this.arr.push(<ChildrenIcon key={i} />);
   }
 }
nextBtn = () => {
  //we should build the Array of children
  const { navigate } = this.props.navigation;
  console.log('sono in configage nextBtn e quest e stato: =');
  console.log(this.state);
  navigate(
  'singlechildconfig',
    { totalChild: this.state.numberOfChildren,
      currentChild: 1,
      arrayOfChildren: this.state.arrayOfChildren
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
