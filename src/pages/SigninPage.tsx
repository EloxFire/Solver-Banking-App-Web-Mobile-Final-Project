import React from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { signinPageStyles } from '../styles/signinPageStyles';

export default function SigninPage(){
  return(
    <View style={commonStyles.viewStyle}>
      <Text style={signinPageStyles.title}><Text style={commonStyles.redSpan}>C</Text>onnexion</Text>
    </View>
  )
}
