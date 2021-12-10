import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { infosPageStyles } from '../styles/infosPageStyles';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';

export default function StatisticsPage({ navigation } : any){
  const [batteryLevel, setBatteryLevel] = useState(0.1);
  const [batteryState, setBatteryState] = useState("");

  useEffect(() => {
    Battery.getBatteryLevelAsync()
    .then((batteryLvl) => {
      setBatteryLevel(batteryLvl);
    });

    Battery.getBatteryStateAsync()
    .then((state) => {
      switch (state) {
        case 1:
        setBatteryState("En décharge");
        break;
        case 2:
        setBatteryState("En charge");
        break;
      }
    });
  }, [])


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
        <Text style={infosPageStyles.littleAppText}>Version : </Text>
        <Text style={infosPageStyles.littleAppText}>Version de React Native : </Text>
        <Text style={infosPageStyles.littleAppText}>Version d'Android : {Device.osName} {Device.osVersion}</Text>
        <Text style={infosPageStyles.applicationInfosTitle}>Informations sur l'appareil :</Text>
        <Text style={infosPageStyles.littleAppText}>Niveau de la batterie : {batteryLevel*100}% - {batteryState}</Text>
        <Text style={infosPageStyles.littleAppText}>Marque de l'appareil : {Device.manufacturer}</Text>
        <Text style={infosPageStyles.littleAppText}>Modèle de l'appareil : {Device.modelName}</Text>


      </View>
    </View>
  )
}
