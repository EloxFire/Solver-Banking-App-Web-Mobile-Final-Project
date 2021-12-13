import React, {useEffect} from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { handleExpenseButtonStyles } from '../styles/handleExpenseButtonStyles';
import { white } from '../styles/variables';
import { useNavigation } from '@react-navigation/native';
import * as Sharing from 'expo-sharing';

interface HandleExpenseButtonInterface {
  icon: string,
  route: string,
  share: Boolean,
}

export default function HandleExpenseButton(props:HandleExpenseButtonInterface){
  const navigation = useNavigation();

  const share = () => {
    // Sharing.shareAsync("../utils/test.txt", {dialogTitle: "Test"})
    // .then((response) => {
    //   console.log(response);
    // });
    console.log("SHARING");
  }

  if(props.share){
    return(
      <TouchableOpacity onPress={() => share()} style={handleExpenseButtonStyles.button}>
        <Icon name={props.icon} type="ionicon" color={white} size={40}/>
      </TouchableOpacity>
    )
  }

  return(
    <TouchableOpacity onPress={() => navigation.push(props.route)} style={handleExpenseButtonStyles.button}>
      <Icon name={props.icon} type="ionicon" color={white} size={40}/>
    </TouchableOpacity>
  )
}
