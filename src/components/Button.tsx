import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import {commonStyles} from '../styles/commonStyles';
import {red, black, white, green} from './variables';


interface ButtonPropsInterface {
  icon: Boolean,
  icon_name: string,
  icon_type: string,
  icon_color: string,
  title: string,
  text_color: string,
  width: string,
  bg: string,
  nav: any,
  nav_direction: string,
}

export default function Button(props:ButtonPropsInterface){
  return(
    <TouchableOpacity onPress={() => {props.nav.navigate(props.nav_direction)}} style={[commonStyles.button, {width:props.width, backgroundColor: props.bg}]}>
      {
        props.title !== "" &&
        <Text style={[commonStyles.buttonText, {color: props.text_color}]}>{props.title}</Text>
      }
      {
        props.icon &&
        <Icon name={props.icon_name} type={props.icon_type} color={props.icon_color}/>
      }
    </TouchableOpacity>
  )
}
