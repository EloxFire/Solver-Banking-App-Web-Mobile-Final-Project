import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

import { commonStyles } from '../styles/commonStyles';

interface CustomFormInputInterface extends TextInputProps {
  label: string,
  width: string,
}

export default function CustomFormInput(props:CustomFormInputInterface){
  const {label, ...rest} = props;
  return(
    <View style={{width: props.width ? props.width : "100%"}}>
      <Text style={commonStyles.textLabel}>{label}</Text>
      <TextInput clearButtonMode="always" style={commonStyles.textInput} placeholder={props.placeholder} {...rest} />
    </View>
  )
}
