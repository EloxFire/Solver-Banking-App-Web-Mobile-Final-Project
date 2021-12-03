import React from 'react';
import { TextInput, View, Text } from 'react-native';

import { commonStyles } from '../styles/commonStyles';

interface CustomFormInputInterface{
  placeholder: string,
}

export default function CustomFormInput(props:CustomFormInputInterface){
  return(
    <View>
      <Text style={commonStyles.textLabel}>{props.label}</Text>
      <TextInput style={commonStyles.textInput} placeholder={props.placeholder}/>
    </View>
  )
}
