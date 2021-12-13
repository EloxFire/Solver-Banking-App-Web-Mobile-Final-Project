import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { overviewStyles } from '../styles/overviewStyles';
import { operationsListStyles } from '../styles/operationsListStyles'
import { Icon } from 'react-native-elements';
import { red } from '../styles/variables';
import { getFirestore, doc, getDocs, collection, query, where, orderBy } from "firebase/firestore";
import ExpensesLite from '../components/ExpenseLite';


export default function OperationList(){

  const [operationsList, setOperationList] = useState([]);

  useEffect(() => {
    // console.log("MOUNT LIST");
    const db = getFirestore();
    const expenseRef = collection(db, 'expenses');

    const q1 = query(expenseRef,
      where("user_uid", "==", "5pxz72tpraNTsetbb3PXtRXmn6I3"),
      orderBy("expense_date", "asc")
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
            <Text style={overviewStyles.noExpensesText}>Aucune dépense enregistrée.</Text>
            <TouchableOpacity onPress={() => navigator.navigate("AddExpense")} style={overviewStyles.addExpenseTextButton}>
              <Icon name="add-outline" type="ionicon" color={red}/>
              <Text style={overviewStyles.addExpenseText}>Ajouter une dépense</Text>
            </TouchableOpacity>
          </View>
          :
          operationsList.map((expense, index) => {
            return(
              <ExpensesLite
                key={`expense-lite-${index}`}
                topBorder={index === 0 ? true : false}
                title={expense.market_name}
                date={expense.expense_date.toDate().toLocaleDateString('fr-FR')}
                hour={expense.expense_date.toDate().toLocaleTimeString('fr-FR')}
                state={expense.state}
                amount={expense.expense_amount}
              />
            )
          })
        }
      </ScrollView>
    </View>
  )
}
