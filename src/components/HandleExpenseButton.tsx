import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { handleExpenseButtonStyles } from '../styles/handleExpenseButtonStyles';
import { white } from '../styles/variables';


interface HandleExpenseButton {
  icon: string,
  route: string,
}

export default function HandleExpenseButton(props:HandleExpenseButtonInterface, { navigation }:any){
  return(
    <TouchableOpacity onPress={() => goToRoute(props.route)} style={handleExpenseButtonStyles.button}>
      <Icon name={props.icon} type="ionicon" color={white} size={40}/>
    </TouchableOpacity>
  )
}
