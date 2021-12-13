import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth } from 'firebase/auth';
import { commonStyles } from '../styles/commonStyles'

export default function ProfilePage({ navigation } : any){
  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>V</Text>otre profil</Text>

      <View>

      </View>
    </View>
  )
}
