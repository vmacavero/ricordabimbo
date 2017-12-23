import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-elements';
import RNCalendarEvents from 'react-native-calendar-events';

class Reload extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
           backgroundColor: '#3b7077'
         },
    title: 'RicordaBimbo',
    headerRight: null,
    header: null,
    headerMode: 'none'
  /*  <Button
    icon={{ name: 'trending-flat', size: 12, flex: 1 }}
    iconRight
    onPress={null}
   // buttonStyle={styles.nextButtonStyle}
    //backgroundColor='orange'
    textStyle={{ textAlign: 'center' }}
    title={'FINE'}
    />*/
  });

  constructor(props) {
    super(props);
    this.reloadData=this.reloadData.bind(this);
  }

  async reloadData() {
      console.log('i am in reloadData');
         try {
          let dataReloaded = await AsyncStorage.getItem('allDataStruct');
          if (dataReloaded !== null){
            // We have data!!
      const dataReloadedJson = JSON.parse(dataReloaded);
            console.log('dataReloaded');
           console.log(dataReloadedJson);
          //  Alert.alert(dataReloadedJson);
          const { navigate } = this.props.navigation;
          console.log('nagigate');
          console.log(this.props);
          
          navigate('endofconfig', {
            dataStruct: dataReloadedJson,
          });
          }
        } catch (error) {
          // Error retrieving data
          console.log('error retrieving dataStruct');
          console.log(error);
          Alert.alert(error);
        }

    }


  render() {
    return (
      <LinearGradient
      colors={['#3b7077', '#499ff8', '#dabc6a']}
      style={styles.linearGradient}
      >
  <View style={{ paddingTop: 40 }}>
    
    <Button
    onPress={this.reloadData}
    title="Reload Data"
    color="#841584"
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
  }
});

export default Reload;
