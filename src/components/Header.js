import React from 'react';
import { View, Text } from 'react-native';

const Header = () => (<View style={styles.viewStyle}>
                        <Text style={styles.textStyle}>
                          RicordaBimbo (never forget)
                        </Text>
                      </View>);

const styles = {
  viewStyle: {
    paddingTop: 20

  },
  textStyle: {
    fontSize: 50
  }
};

export default Header;
