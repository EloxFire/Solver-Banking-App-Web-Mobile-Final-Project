import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { overviewStyles } from '../styles/overviewStyles';
import { operationsListStyles } from '../styles/operationsListStyles'
import { Icon } from 'react-native-elements';
import { red } from '../styles/variables';
import { getFirestore, doc, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import ExpensesLite from '../components/ExpenseLite';


export default function OperationList(){

  const [operationsList, setOperationList] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    let uid;
    if (user !== null) {
      uid = user.uid;
    }


    const db = getFirestore();
    const operationsRef = collection(db, 'operations');

    const q1 = query(operationsRef,
      where("user_uid", "==", uid),
      orderBy("operation_date", "asc")
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      setOperationList(data);
    });
  }, []);


  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>V</Text>os opérations</Text>
      <Text style={operationsListStyles.subtitle}>Voici le détail de toutes vos opérations à ce jour.</Text>

      <ScrollView style={operationsListStyles.scrollView}>
        {
          operationsList.length === 0 ?
          <View style={overviewStyles.addExpenseContainer}>
            <Text style={overviewStyles.noExpensesText}>Aucune oprération enregistrée.</Text>
            <TouchableOpacity onPress={() => navigator.navigate("AddOperation")} style={overviewStyles.addExpenseTextButton}>
              <Icon name="add-outline" type="ionicon" color={red}/>
              <Text style={overviewStyles.addExpenseText}>Ajouter une opération</Text>
            </TouchableOpacity>
          </View>
          :
          operationsList.map((operation, index) => {
            return(
              <ExpensesLite
                key={`operation-lite-${index}`}
                topBorder={index === 0 ? true : false}
                title={operation.operation_name}
                date={operation.operation_date.toDate().toLocaleDateString('fr-FR')}
                hour={operation.operation_date.toDate().toLocaleTimeString('fr-FR')}
                state={operation.operation_state}
                amount={operation.operation_amount}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
}
