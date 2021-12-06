import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { commonStyles } from '../styles/commonStyles';
import { overviewStyles } from '../styles/overviewStyles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, query, where } from "firebase/firestore";
import { red } from '../styles/variables';
import ExpensesLite from '../components/ExpenseLite';
import HandleExpenseButton from '../components/HandleExpenseButton';

export default function OverviewPage({ navigation } : any) {

  const [user, setUser] = useState({});
  const [userExpenses, setUserExpenses] = useState([]);
  const monthsList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        console.log(user);
        setUser({
          uuid: user.uid,
          username: user.displayName ? user.displayName : "",
          mail: user.email,
          emailVerified: user.isEmailVerified,
          phone: user.phoneNumber ? user.phoneNumber : "",
        })
      }
    });

    const db = getFirestore();
    const expenseRef = collection(db, 'expenses');
    const q = query(expenseRef, where("user_uid", "==", "5pxz72tpraNTsetbb3PXtRXmn6I3"));

    getDocs(q)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      console.log(data);
      setUserExpenses(data);
    })
  }, []);

  const addNewExpense = () => {
    navigation.navigate("addExpense");
  }

  return (
    <View style={commonStyles.viewStyle}>
      <Text style={overviewStyles.title}><Text style={commonStyles.redSpan}>B</Text>onjour {user.username} !</Text>

      <View style={overviewStyles.balanceContainer}>
        <View>
          <Text style={overviewStyles.balanceTitle}><Text style={commonStyles.redSpan}>V</Text>os dépenses de {monthsList[new Date().getMonth().toString().toLowerCase()]}</Text>
          <Text style={overviewStyles.balancePrice}>537.58 <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
      </View>

      <View style={overviewStyles.expensesContainer}>
        <Text style={overviewStyles.exepensesContainerTitle}><Text style={commonStyles.redSpan}>A</Text>perçu rapide</Text>

        {
          userExpenses.length === 0 ?
          <View style={overviewStyles.addExpenseContainer}>
            <Text style={overviewStyles.noExpensesText}>Aucune dépense enregistrée.</Text>
            <TouchableOpacity onPress={() => addNewExpense()} style={overviewStyles.addExpenseTextButton}>
              <Icon name="add-outline" type="ionicon" color={red}/>
              <Text style={overviewStyles.addExpenseText}>Ajouter une dépense</Text>
            </TouchableOpacity>
          </View>
          :
          userExpenses.map((expense, index) => {
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
      </View>

      <View style={overviewStyles.seeMoreContainer}>
        <Text style={overviewStyles.seeMoreText}>Voir plus ></Text>
      </View>

      <View style={overviewStyles.handleExpensesContainer}>
        <Text style={overviewStyles.handleExpensesTitle}><Text style={commonStyles.redSpan}>G</Text>érer les dépenses :</Text>

        <View style={overviewStyles.handleExpensesChoisesContainer}>
          <HandleExpenseButton icon="trash-outline"/>
          <HandleExpenseButton icon="add-outline"/>
          <HandleExpenseButton icon="share-social-outline"/>
        </View>
      </View>
    </View>
  );
}
