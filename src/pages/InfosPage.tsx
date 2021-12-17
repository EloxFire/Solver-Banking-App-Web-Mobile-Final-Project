import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { infosPageStyles } from '../styles/infosPageStyles';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, query, where } from "firebase/firestore";
import { appVersion } from '../utils/consts';
import { addFromArray } from '../utils/balance_calculator';
import { Icon } from 'react-native-elements';
import {red, black, white, green} from '../styles/variables';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';
import * as Application from 'expo-application';

export default function StatisticsPage({ navigation } : any){
  const [batteryLevel, setBatteryLevel] = useState(0.1);
  const [batteryState, setBatteryState] = useState("");
  const [user, setUser] = useState({});
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

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
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    let displayName, email, photoURL, emailVerified, phone, uid;
    if (user !== null) {
      displayName = user.displayName;
      email = user.email;
      photoURL = user.photoURL;
      emailVerified = user.emailVerified;
      phone = user.phoneNumber;
      uid = user.uid;

      setUser({
        uuid: uid,
        username: displayName,
        mail: email,
        emailVerified: emailVerified,
        phone: phone,
      });
    }

    const db = getFirestore();
    const expenseRef = collection(db, 'operations');

    const q1 = query(expenseRef,
      where("user_uid", "==", uid),
      where("operation_state", "==", true)
    );

    const q2 = query(expenseRef,
      where("user_uid", "==", uid),
      where("operation_state", "==", false)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      const amounts = data.map((item, index) => {
        return item.operation_amount;
      })
      // console.log("Expenses :", amounts);
      setIncome(addFromArray(amounts));
    });

    getDocs(q2)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      const amounts = data.map((item, index) => {
        return item.operation_amount;
      })
      // console.log("Expenses :", amounts);
      setExpenses(addFromArray(amounts));
    });
  }, []);



  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>I</Text>nformations générales</Text>

      <View style={infosPageStyles.statsContainer}>
        <View style={infosPageStyles.statsCard}>
          <Text style={infosPageStyles.statTitle}><Text style={commonStyles.redSpan}>R</Text>evenus</Text>
          <Text style={infosPageStyles.statSubtitle}>{income} <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
        <View style={infosPageStyles.statsCard}>
          <Text style={infosPageStyles.statTitle}><Text style={commonStyles.redSpan}>D</Text>épenses</Text>
          <Text style={infosPageStyles.statSubtitle}>{expenses} <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
      </View>

      <View style={[infosPageStyles.applicationInfosContainer, {marginTop:-5}]}>
        <Text style={infosPageStyles.accountInfoTitle}><Text style={commonStyles.redSpan}>V</Text>otre appareil :</Text>
        <View style={infosPageStyles.accountInfosContainer}>
          <View style={infosPageStyles.row}>
            <View style={infosPageStyles.accountInfoCard}>
              <Icon style={{marginRight:5}} name="phone-portrait-outline" type="ionicon" color={black}/>
              <Text style={infosPageStyles.accountCardText}>{Device.designName}</Text>
            </View>
            <View style={infosPageStyles.accountInfoCard}>
              <Icon style={{marginRight:5}} name="battery-half-outline" type="ionicon" color={black}/>
              <Text style={infosPageStyles.accountCardText}>{Math.round((batteryLevel*100) * 100)/ 100}% - {batteryState}</Text>
            </View>
          </View>
          <View style={{width:'100%'}}>
            <View style={infosPageStyles.accountInfoCard}>
              <Icon style={{marginRight:5}} name="logo-android" type="ionicon" color={black}/>
              <Text style={infosPageStyles.accountCardText}>{Device.osName} {Device.osVersion}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={infosPageStyles.applicationInfosContainer}>
        <Text style={infosPageStyles.accountInfoTitle}><Text style={commonStyles.redSpan}>A</Text>pplication :</Text>
        <View style={{width:"100%"}}>
          <View style={infosPageStyles.accountInfoCard}>
            <Icon style={{marginRight:5}} name="copy-outline" type="ionicon" color={black}/>
            <Text style={infosPageStyles.accountCardText}>v{appVersion}</Text>
          </View>
          <View style={infosPageStyles.accountInfoCard}>
            <Text style={infosPageStyles.accountCardText}>Made with</Text>
            <Icon style={{marginHorizontal:5}} name="heart-outline" type="ionicon" color={black}/>
            <Text style={infosPageStyles.accountCardText}>by <Text style={{fontFamily:'MontserratSemiBold'}}>Enzo Avagliano</Text> and with </Text>
            <Icon style={{marginLeft:5}} name="logo-react" type="ionicon" color={black}/>
            <Icon style={{marginLeft:5}} name="logo-firebase" type="ionicon" color={black}/>
            <Icon style={{marginLeft:5}} name="logo-github" type="ionicon" color={black}/>
          </View>
        </View>
      </View>
    </View>
  )
}
