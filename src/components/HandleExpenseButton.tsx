import React, {useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { handleExpenseButtonStyles } from '../styles/handleExpenseButtonStyles';
import { white } from '../styles/variables';
import { useNavigation } from '@react-navigation/native';

interface HandleExpenseButtonInterface {
  icon: string,
  route: string,
}

export default function HandleExpenseButton(props:HandleExpenseButtonInterface){
  const navigation = useNavigation();

  useEffect(() => {
    console.log(navigation);
  })

  return(
    <TouchableOpacity onPress={() => navigation.push(props.route)} style={handleExpenseButtonStyles.button}>
      <Icon name={props.icon} type="ionicon" color={white} size={40}/>
    </TouchableOpacity>
  )
}
