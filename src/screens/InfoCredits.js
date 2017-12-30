/*eslint global-require: off */
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PixelRatio,
  AsyncStorage,
  Alert,
  Linking
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Icon } from 'react-native-elements';

class InfoCredits extends Component {
    static navigationOptions = ({ navigation }) => ({
    headerTintColor: 'white',
    headerStyle: {
          backgroundColor: '#4c669f'
        },
        params: navigation.state.params,
        headerLeft: <Button
        
        icon={{name: 'keyboard-arrow-left', size: 32}}
        buttonStyle={{backgroundColor: 'transparent', borderRadius: 40, padding: 0, marginLeft: 0, marginRight: 0}}
        containerViewStyle={{padding: 0, marginLeft: 0, marginRight: 0}}
        textStyle={{textAlign: 'left'}}
        onPress={() => navigation.goBack()}
        title={``}
      />,
    title: 'RicordaBimbo - Credits'
    });

    constructor(props) { 
      super(props);     
      this.state = {
        visible: false
      };
      global.counter = 0; 
      this.deleteData = this.deleteData.bind(this);
    }

    
deleteAll() {
  console.log('i ami ndelete all');
 global.counter++;
  if (global.counter > 19) {
    console.log('magg');
    global.counter = 0;
    this.setState({ visible: !this.state.visible });
  }
}
   
deleteData() {
  try {
    AsyncStorage.removeItem('allDataStruct');
     console.log('removing all');
   //  Alert.alert('Debug: Events deleted');
   Alert('Ho rimosso tutti i dati salvati, chiudi l\'app e riaprila');
  } catch (error) {
    console.log('error remov item'+error);
    Alert.alert('non sono riuscito a rimuovere i dati o non ve ne erano, chiudi l\'app e riaprila');
  }
}
  render() {
    const buttonVisible = this.state.visible;
        let button = null;
        if (buttonVisible) {
          button = <Button onPress={() => this.deleteData()} title='Delete All'/>;
        } else {
          button = null;
        }
   return (
      <LinearGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.linearGradient}
      >
          <View style={{ 
            flexDirection: 'row', 
            paddingTop: 20, 
            justifyContent: 'center', 
            alignItems: 'stretch', 
          }}>
          <Icon
               name='copyright'
               size={18}
               color='white'
              onPress={this.deleteAll.bind(this)}
            >
            </Icon>
            <Text style={styles.buttonText}>
              2018 Victor Macavero
            </Text>
            
          </View>
              <View>
            <Text style={styles.buttonText}>
              Images Copyright di Unsplash.com e dei rispettivi Autori
            </Text>
            <Text style={styles.buttonText}>
              Contatti : victor@macavero.com
            </Text>
            <Text style={styles.buttonText}>
              UX Testing di Francoise Lombardi
            </Text>
        {button} 
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
