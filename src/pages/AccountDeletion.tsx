import React from "react";
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, deleteUser } from 'firebase/auth';
import { commonStyles } from "../styles/commonStyles";

export default function AccountDeletion({ navigation } : any){
  return(
    <View style={commonStyles.viewStyle}>
      <Text><Text style={commonStyles.redSpan}>S</Text>upprimer votre compte</Text>
    </View>
  )
}
