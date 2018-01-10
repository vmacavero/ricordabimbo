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

function size(num, type) {
   //=> width / guidelineBaseWidth * num;
   //console.log(Dimensions.get('screen'));
   if (Platform.OS==='ios') {
    return num;
    //NOOP FOR iOS (for now everything seems ok on iOS)
   }


   console.log(Dimensions.get('window'));
   return(2399);
}

//const verticalScale = size => height / guidelineBaseHeight * size;
//const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export { size };
