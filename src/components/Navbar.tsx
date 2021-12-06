import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { navbarStyles } from '../styles/navbarStyle';

export default function Navbar(){
  return(
    <View style={navbarStyles.navbarContainer}>
      <Text>TEST navabr</Text>
    </View>
  )
}
