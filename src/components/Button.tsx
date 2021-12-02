import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import {commonStyles} from '../styles/commonStyles';

interface ButtonPropsInterface {
  icon: Boolean,
  icon_name: string,
  icon_type: string,
  icon_color: string,
  title: string,
  text_color,
  width: string,
}

export default function Button(props:ButtonPropsInterface){
  return(
    <TouchableOpacity style={[commonStyles.button, {width:props.width}]}>
      {
        props.icon &&
        <Icon style={{paddingTop:14}} name={props.icon_name} type={props.icon_type} color={props.icon_color}/>
      }
      {
        props.title !== "" &&
        <Text style={{color: props.text_color}}>{props.title}</Text>
      }
    </TouchableOpacity>
  )
}
