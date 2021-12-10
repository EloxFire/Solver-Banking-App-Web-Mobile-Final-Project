import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { infosPageStyles } from '../styles/infosPageStyles';

export default function StatisticsPage({ navigation } : any){
  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>I</Text>nformations générales</Text>

      <View style={infosPageStyles.statsContainer}>
        <View style={infosPageStyles.statsCard}>
          <Text style={infosPageStyles.statTitle}><Text style={commonStyles.redSpan}>R</Text>evenus</Text>
          <Text style={infosPageStyles.statSubtitle}>554 <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
        <View style={infosPageStyles.statsCard}>
          <Text style={infosPageStyles.statTitle}><Text style={commonStyles.redSpan}>D</Text>épenses</Text>
          <Text style={infosPageStyles.statSubtitle}>5254 <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
      </View>

      <View style={infosPageStyles.applicationInfosContainer}>
        <Text style={infosPageStyles.applicationInfosTitle}>Informations sur l'application :</Text>
        <Text style={infosPageStyles.littleAppText}>Version: </Text>
      </View>
    </View>
  )
}
