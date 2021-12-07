import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { navbarStyles } from '../styles/navbarStyle';

interface NavbarPropsInterface {
  profilIconColor: string,
  homeIconColor: string,
  statsIconColor: string,
}

export default function Navbar(props:NavbarPropsInterface){
  return(
    <View style={navbarStyles.navbarContainer}>
      <Icon name="person-outline" type="ionicon" color={props.profilIconColor}/>
      <Icon name="home" type="material" color={props.homeIconColor}/>
      <Icon name="analytics-outline" type="ionicon" color={props.statsIconColor}/>
    </View>
  )
}
