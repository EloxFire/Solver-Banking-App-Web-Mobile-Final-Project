import React, {useState, useEffect} from 'react';
import { View, Text } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { infosPageStyles } from '../styles/infosPageStyles';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, query, where } from "firebase/firestore";
import { appVersion } from '../utils/consts';
import { addFromArray } from '../utils/balance_calculator';
import * as Device from 'expo-device';
import * as Battery from 'expo-battery';

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
    const expenseRef = collection(db, 'expenses');

    const q1 = query(expenseRef,
      where("user_uid", "==", uid),
      where("state", "==", true)
    );

    const q2 = query(expenseRef,
      where("user_uid", "==", uid),
      where("state", "==", false)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      const amounts = data.map((item, index) => {
        return item.expense_amount;
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
        return item.expense_amount;
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

      <View style={infosPageStyles.applicationInfosContainer}>
        <Text style={infosPageStyles.applicationInfosTitle}><Text style={commonStyles.redSpan}>I</Text>nformations sur l'application :</Text>
        <Text style={infosPageStyles.littleAppText}>Version : {appVersion}</Text>
        <Text style={infosPageStyles.littleAppText}>Version d'Android : {Device.osName} {Device.osVersion}</Text>

        <Text style={infosPageStyles.applicationInfosTitle}><Text style={commonStyles.redSpan}>I</Text>nformations sur l'appareil :</Text>
        <Text style={infosPageStyles.littleAppText}>Niveau de la batterie : {Math.round((batteryLevel*100) * 100)/ 100}% - {batteryState}</Text>
        <Text style={infosPageStyles.littleAppText}>Marque de l'appareil : {Device.manufacturer}</Text>
        <Text style={infosPageStyles.littleAppText}>Modèle de l'appareil : {Device.modelName}</Text>


      </View>
    </View>
  )
}
