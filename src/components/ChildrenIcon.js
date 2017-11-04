import React, { Component } from 'react';
import { Icon } from 'react-native-elements';

class ChildrenIcon extends Component {

  render() {
    return (<Icon
      raised
      name='child-friendly'
      size={32}
      color='#192f6a'
      onPress={/*i could fire some animations?? */null}
    />);
  }
}

export default ChildrenIcon;
