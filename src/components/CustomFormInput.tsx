import React from 'react';
import { TextInput, View, Text, TextInputProps } from 'react-native';

import { commonStyles } from '../styles/commonStyles';

interface CustomFormInputInterface extends TextInputProps {
  label: string,
}

export default function CustomFormInput(props:CustomFormInputInterface){
  const {label, ...rest} = props;
  return(
    <View>
      <Text style={commonStyles.textLabel}>{label}</Text>
      <TextInput style={commonStyles.textInput} placeholder={props.placeholder} {...rest}
      />
    </View>
  )
}
