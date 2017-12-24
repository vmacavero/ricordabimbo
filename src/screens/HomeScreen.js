/*eslint global-require: off */
import React, { Component } from 'react';
import {
 PixelRatio,
 View,
 Alert,
 AsyncStorage
} from 'react-native';
import AppIntro from 'react-native-app-intro';

class HomeScreen extends Component {

  static navigationOptions = () => ({
      header: null
      // Note: By default the icon is only shown on iOS. Search the showIcon option below
    });

    componentDidMount = () => {
      //will check if we have already saved our data in AsyncStorage
      this.reloadData();
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
      const debug = true;
         try {
          const dataReloaded = await AsyncStorage.getItem('allDataStruct');
          if (dataReloaded !== null) {
            console.log('loaded:');
            
              const dataReloadedJson = JSON.parse(dataReloaded);
              console.log(dataReloadedJson);
              const { navigate } = this.props.navigation;  
             if (debug) { 
              try {
                AsyncStorage.removeItem('allDataStruct');
                 console.log('removing all');
                 Alert.alert('Debug: Events deleted');
              } catch (errore) {
                console.log('error remov item');
              }
            }

              navigate('endofconfig', {
                dataStruct: dataReloadedJson,
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
        title: 'RicordaBimbo ',
        description: 'L\'App piu\' utile che ci sia !',
        img: require('../../img/child1.jpg'),
        imgStyle: {
          height: 80 * 3,
          width: 109 * 3,
        },
        backgroundColor: '#fa931d',
        fontColor: '#fff',
        level: 10,
        fontSize: PixelRatio.getPixelSizeForLayoutSize(6)
      }, {
        title: 'Iniziamo la Configurazione!',
        description: 'Adesso ti chiedero\' quanti bimbi hai, ' +
                      'a che ora li accompagni, in quali giorni ' +
                      'della settimana e in quale periodo (inizio e fine)',
        img: require('../../img/child2.jpg'),
        imgStyle: {
          height: 93 * 3,
          width: 103 * 3,
        },
        backgroundColor: '#d9b709',
        fontColor: '#fff',
        level: 10, },
        {
          title: 'Ancora qualche informazione',
          description: 'Faremo questo per ognuno dei tuoi figli.' +
          ' Potrai aggiungere anche le loro foto, se vorrai !',
          img: require('../../img/child3.jpg'),
          imgStyle: {
            height: 93 * 3,
            width: 103 * 3,
          },
          backgroundColor: '#a4b602',
          fontColor: '#fff',
          level: 10, },
          {
            title: 'Ok !',
            description: 'Siamo Pronti ? Via!',
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
        <View allowFontScaling={false}>
          <AppIntro
            onDoneBtnClick={this.doneBtnHandle}
            onSlideChange={this.onSlideChangeHandle}
            pageArray={pageArray}
            doneBtnLabel='Ok!'
            skipBtnLabel=''
          />
        </View>
      );
    }
}

export default HomeScreen;
