import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { handleExpenseButtonStyles } from '../styles/handleExpenseButtonStyles';
import { white } from '../styles/variables';
import { useNavigation } from '@react-navigation/native';

interface HandleExpenseButton {
  icon: string,
  route: string,
}

export default function HandleExpenseButton(props:HandleExpenseButton){
  const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={() => navigation.navigate(props.route)} style={handleExpenseButtonStyles.button}>
      <Icon name={props.icon} type="ionicon" color={white} size={40}/>
    </TouchableOpacity>
  )
}
