import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Icon } from 'react-native-elements';

class ChildrenIcon extends Component {

  render() {
    return (<Icon
      raised
      name='child-friendly'
      size={32}
      //type='font-awesome'
      color='#192f6a'
      onPress={() => console.log('hello')}
    />);
  }
}

export default ChildrenIcon;
