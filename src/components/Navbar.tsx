import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { navbarStyles } from '../styles/navbarStyle';
import { useNavigation } from '@react-navigation/native';

interface NavbarPropsInterface {
  profilIconColor: string,
  homeIconColor: string,
  statsIconColor: string,
}

export default function Navbar(props:NavbarPropsInterface){
  const navigation = useNavigation();
  return(
    <View style={navbarStyles.navbarContainer}>
      <TouchableOpacity onPress={() => {navigation.navigate("profile")}}>
        <Icon name="person-outline" type="ionicon" color={props.profilIconColor} size={35}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate("Overview")}}>
        <Icon name="home" type="material" color={props.homeIconColor} size={40}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {navigation.navigate("Statistics")}}>
        <Icon name="analytics-outline" type="ionicon" color={props.statsIconColor} size={40}/>
      </TouchableOpacity>
    </View>
  )
}
