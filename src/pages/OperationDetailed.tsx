import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";

export default function OperationDetailed({ route, navigation } : any) {

  const { operation_id } = route.params;
  const [operation, setOperation] = useState({
    operation_name: "Chargement",
    operation_category: ["⌛ Chargement"],
    operation_date: "Chargement",
    operation_state: false,
    operation_amount: "Chargement",
    operation_date: 1607110465663,
  });

  useEffect(() => {
    const db = getFirestore();
    const operationsRef = collection(db, 'operations');
    const q1 = query(operationsRef,
      where("operation_id", "==", operation_id)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });

      if(data[0] === undefined){
        return;
      }

      console.log("OPERATION DATA DETAILED :", data);
      setOperation(data[0]);
    });
  }, []);

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>{operation.operation_name[0]}</Text>{operation.operation_name.slice(1)}</Text>

      <View style={{marginTop: 50}}>
        <Text style={{fontSize: 25, fontFamily: 'MontserratSemiBold'}}><Text style={commonStyles.redSpan}>M</Text>ontant de l'opération :</Text>
        <Text style={{fontSize: 65, fontFamily: 'MontserratBold'}}><Text>{operation.operation_state ? "+" : "-"}</Text>{operation.operation_amount}<Text style={commonStyles.redSpan}>€</Text></Text>
      </View>

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 25, fontFamily: 'MontserratSemiBold'}}><Text style={commonStyles.redSpan}>C</Text>atégorie de l'opération :</Text>
        <Text style={{fontSize: 30, fontFamily: 'MontserratBold'}}>{operation.operation_category[0]}</Text>
      </View>

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 25, fontFamily: 'MontserratSemiBold'}}><Text style={commonStyles.redSpan}>D</Text>ate de l'opération :</Text>
        <Text style={{fontSize: 30, fontFamily: 'MontserratBold'}}>{new Date(operation.operation_date).toLocaleDateString()} - {new Date(operation.operation_date * 1000).toLocaleTimeString()}</Text>
      </View>

      <View style={{marginTop: 30}}>
        <Text style={{fontSize: 25, fontFamily: 'MontserratSemiBold'}}><Text style={commonStyles.redSpan}>T</Text>ype de l'opération :</Text>
        <Text style={{fontSize: 30, fontFamily: 'MontserratBold'}}>{operation.operation_state ? "Revenu" : "Dépense"}</Text>
      </View>
    </View>
  )
}
