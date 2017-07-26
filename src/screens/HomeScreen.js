import React, { Component } from 'react';
import {
 Alert,
} from 'react-native';

import AppIntro from 'react-native-app-intro';

class HomeScreen extends Component {

  static navigationOptions = () => ({
    //tabBarVisible: false,
      header: null
      // Note: By default the icon is only shown on iOS. Search the showIcon option below
    });
    constructor(props) {
      super(props);
    }
    onSkipBtnHandle = (index) => {
      Alert.alert('Skip');
      console.log(index);
    }
    onSlideChangeHandle = (index, total) => {
      console.log(total);
    }
    doneBtnHandle = () => {
      //
      const { navigate } = this.props.navigation;
      navigate('config');
    }
    nextBtnHandle = (index) => {
      Alert.alert('Next');
      console.log(index);
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
        <AppIntro
          //onNextBtnClick={this.nextBtnHandle}
          onDoneBtnClick={this.doneBtnHandle}
          //onSkipBtnClick={this.onSkipBtnHandle}
          onSlideChange={this.onSlideChangeHandle}
          pageArray={pageArray}
          doneBtnLabel='Ok!'
          skipBtnLabel=''
        />
      );
    }
}

export default HomeScreen;
