import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { navbarStyles } from '../styles/navbarStyle';
import { useNavigation, useRoute } from '@react-navigation/native';

interface NavbarPropsInterface {
  profilIconColor: string,
  homeIconColor: string,
  statsIconColor: string,
}

export default function Navbar(props:NavbarPropsInterface){

  const navigation = useNavigation();
  // const route = useRoute();

  const goTo = (destination) => {
    // if(route.name !== "Login" || route.name !== "SignIn" || route.name !== "SignUp"){
    //   navigation.navigate(destination);
    // }
    // return;
    navigation.navigate(destination);

  }

  return(
    <View style={navbarStyles.navbarContainer}>
      <TouchableOpacity onPress={() => goTo("Profile")}>
        <Icon name="person-outline" type="ionicon" color={props.profilIconColor} size={35}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo("Overview")}>
        <Icon name="home" type="material" color={props.homeIconColor} size={40}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goTo("Infos")}>
        <Icon name="information-circle-outline" type="ionicon" color={props.statsIconColor} size={40}/>
      </TouchableOpacity>
    </View>
  )
}
