import React, { Component } from 'react';
import {
 PixelRatio,
 StyleSheet,
 Text,
 Platform,
 Dimensions
} from 'react-native';

//this is an helper function to set size/font/accordingly to screen size
//android was the n.1 cause for me to create this function :)


//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

function sizeNorm(num, type) {
  console.log('sizeNormn');
  //this function will be fixed for iPAD, sometime !

  //type === 1 for Fonts
  //type === 2 for Padding (different behaviour)
  //type === 3 for Icons


   //=> width / guidelineBaseWidth * num;
   //console.log(Dimensions.get('screen'));
   if ((Platform.OS === 'ios') && (type === 1)) {
    return PixelRatio.getPixelSizeForLayoutSize(num);
   }
   if ((Platform.OS === 'ios') && (type === 2)) {
    return PixelRatio.getPixelSizeForLayoutSize(num);
   }
   if ((Platform.OS === 'ios') && (type === 3)) {
    return PixelRatio.getPixelSizeForLayoutSize(num);
   }


  // console.log(Dimensions.get('window'));
   return(num*2);
}

//const verticalScale = size => height / guidelineBaseHeight * size;
//const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export { sizeNorm };
