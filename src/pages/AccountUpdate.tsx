import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';

export default function AccountUpdate({ navigation } : any){
  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>M</Text>ettre à jour vos informations</Text>

    </View>
  )
}
