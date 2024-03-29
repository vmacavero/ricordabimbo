/*eslint global-require: off */
import React, { Component } from 'react';
import {
 PixelRatio,
 View,
 Alert,
 AsyncStorage,
 StyleSheet,
 Text
} from 'react-native';
import AppIntro from 'react-native-app-intro';
import { sizeNorm } from '../ScreenSizeHelper';

class HomeScreen extends Component {

  static navigationOptions = () => ({
      header: null
      // Note: By default the icon is only shown on iOS. Search the showIcon option below
    });

    constructor() {
      super();
      Text.defaultProps.allowFontScaling = false;
    }

    componentWillMount = () => {
      //will check if we have already saved our data in AsyncStorage
      this.reloadData();
      console.log('home : ');
      console.log(PixelRatio.getPixelSizeForLayoutSize(10));
      console.log(PixelRatio.get());
      console.log(PixelRatio.getFontScale());
     // console.log(PixelRatio.getPixelSizeForLayoutSize(6));
      console.log(PixelRatio.getPixelSizeForLayoutSize(10)/PixelRatio.getFontScale());
      console.log(sizeNorm(2, 1));
    }
    
    onSkipBtnHandle = (index) => {
      console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
      console.log(index, total);
    }
    doneBtnHandle = () => {
      //
      const { navigate } = this.props.navigation;
      navigate('config');
    }
    nextBtnHandle = (index) => {
      console.log(index);
    }
    
    async reloadData() {
      //with debug = true on restart the app deletes all the asyncstorage saved data
      const debug = false;
      console.log('debug is:' + debug);
      
      console.log('reloaddata');
         try {
          const dataReloaded = await AsyncStorage.getItem('allDataStruct');
          if (dataReloaded !== null) {
            console.log('loaded:');            
              const dataReloadedJson = JSON.parse(dataReloaded);
              console.log(dataReloadedJson);
              const { navigate } = this.props.navigation;  
             if (debug) { 
               console.log('debug');
              try {
                AsyncStorage.removeItem('allDataStruct');
                 console.log('removing all');
               //  Alert.alert('Debug: Events deleted');
              } catch (errore) {
                console.log('error remov item');
              }
            }
              navigate('endofconfig', {
                dataStruct: dataReloadedJson,
                buttonEditDisabled: true,
              });
          }
         } catch (error) {
          // Error retrieving data
          console.log('error retrieving dataStruct');
          console.log(error);
          Alert.alert('error in retrieving Data in Phone' + error);
         }
    }
    
    render() {
      const pageArray = [{
        title: 
          <Text style={{ fontSize: sizeNorm(8, 1) }}>
            RicordaBimbo
          </Text>,
        description: 
          <Text style={{ fontSize: sizeNorm(9, 1) }} >
            L'App piu' utile che ci sia!
          </Text>,
        img: require('../../img/child1.jpg'),
        imgStyle: {
          height: 80 * 3,
          width: 109 * 3,
        },
        backgroundColor: '#fa931d',
        fontColor: '#fff',
        level: 10,
        //
      }, {
        title: 
        <Text style={{ fontSize: sizeNorm(8, 1) }}> 
           La configurazione
        </Text>,
        description: 
        <Text style={{ fontSize: sizeNorm(9, 1) }}>
          Ti chiedero quanti bimbi hai, a che ora li accompagni, 
          in quali giorni della settimana e in quale periodo (inizio e fine)
        </Text>,
        img: require('../../img/child2.jpg'),
        imgStyle: {
          height: 93 * 3,
          width: 103 * 3,
        },
        backgroundColor: '#d9b709',
        fontColor: '#fff',
        level: 10, 
      }, {
        title: 
        <Text style={{ fontSize: sizeNorm(8, 1) }}> 
          Altre informazioni
        </Text>,
          description: 
          <Text style={{ fontSize: sizeNorm(10, 1) }}>
          Ripeteremo il tutto per ognuno dei tuoi figli. Sara' bello aggiungere
           anche le loro foto.</Text>,
          img: require('../../img/child3.jpg'),
          imgStyle: {
            height: 93 * 3,
            width: 103 * 3,
          },
          backgroundColor: '#a4b602',
          fontColor: '#fff',
          level: 10, },
          {
            title: 
            <Text style={{ fontSize: sizeNorm(9, 1) }}> 
              Iniziamo
            </Text>,
            description: 
            <Text style={{ fontSize: sizeNorm(8, 1) }}>
                Ricorda di autorizzare questa
              App ad accedere al calendario ed alle foto
              Ricorda anche che quest'app e' solo un aiuto,
                facci affidamento, ma non dimenticare 
                che sei unicamente tu
                responsabile dei tuoi figli.
            </Text>,
            img: require('../../img/child4.jpg'),
            imgStyle: {
              height: 93 * 3,
              width: 103 * 3,
            },
            backgroundColor: '#6699ff',
            fontColor: '#fff',
            level: 10,
        }];

      return (
        <View>
          <AppIntro
            onDoneBtnClick={this.doneBtnHandle}
            onSlideChange={this.onSlideChangeHandle}
            pageArray={pageArray}
            doneBtnLabel='Inizia'
            skipBtnLabel=''
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});


export default HomeScreen;
