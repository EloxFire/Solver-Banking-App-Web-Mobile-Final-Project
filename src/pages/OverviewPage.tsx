import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { commonStyles } from '../styles/commonStyles';
import { overviewStyles } from '../styles/overviewStyles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, query, where, orderBy, limit } from "firebase/firestore";
import { red } from '../styles/variables';
import ExpensesLite from '../components/ExpenseLite';
import HandleExpenseButton from '../components/HandleExpenseButton';
import { balanceCalculator } from '../utils/balance_calculator';

export default function OverviewPage({ navigation } : any) {

  const [user, setUser] = useState({});
  const [userOperations, setUserOperations] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [balance, setBalance] = useState("0");

  const monthsList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

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

    // uid = "5pxz72tpraNTsetbb3PXtRXmn6I3";

    const db = getFirestore();
    const operationsRef = collection(db, 'operations');

    // For month range
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);

    // console.log("GETIING OPERATIONS");

    // console.log('TYPEOF', typeof(user.uuid));

    //GET ALL OPERATIONS REGISTERED
    const q1 = query(operationsRef,
      where("user_uid", "==", uid),
      orderBy("operation_date", "asc"),
      limit(4)
    );
    // GET CURRENT MONTH EXPENSES
    const q2 = query(operationsRef,
      where("user_uid", "==", uid),
      where('operation_date', ">=", firstDay),
      where('operation_date', "<=", lastDay),
      where('operation_state', "==", false)
    );

    // GET CURRENT MONTH INCOMES
    const q3 = query(operationsRef,
      where("user_uid", "==", uid),
      where('operation_date', ">=", firstDay),
      where('operation_date', "<=", lastDay),
      where('operation_state', "==", true)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      setUserOperations(data);
    });

    // Getting user current month total amount
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
      setMonthlyExpenses(amounts);
    });

    // Getting user current month total amount
    getDocs(q3)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      const amounts = data.map((item, index) => {
        return item.operation_amount;
      })
      // console.log("Incomes :", amounts);
      setMonthlyIncomes(amounts);
    });
  }, []);

  useEffect(() => {
    // CALCULATING TOTAL BALANCE
    setBalance(balanceCalculator(monthlyExpenses, monthlyIncomes))
  }, [monthlyExpenses, monthlyIncomes]);

  return (
    <View style={commonStyles.viewStyle}>
      <Text style={overviewStyles.title}><Text style={commonStyles.redSpan}>B</Text>onjour {user.username} !</Text>

      <View style={overviewStyles.balanceContainer}>
        <View>
          <Text style={overviewStyles.balanceTitle}><Text style={commonStyles.redSpan}>V</Text>os dépenses de {monthsList[new Date().getMonth().toString().toLowerCase()]}</Text>
          <Text style={overviewStyles.balancePrice}>{balance} <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
      </View>

      <View style={overviewStyles.expensesContainer}>
        <Text style={overviewStyles.exepensesContainerTitle}><Text style={commonStyles.redSpan}>A</Text>perçu rapide</Text>

        {
          userOperations.length === 0 ?
          <View style={overviewStyles.addExpenseContainer}>
            <Text style={overviewStyles.noExpensesText}>Aucune opération enregistrée.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddOperation")} style={overviewStyles.addExpenseTextButton}>
              <Icon name="add-outline" type="ionicon" color={red}/>
              <Text style={overviewStyles.addExpenseText}>Ajouter une opération</Text>
            </TouchableOpacity>
          </View>
          :
          userOperations.map((operation, index) => {
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
      </View>

      <View style={overviewStyles.seeMoreContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('OperationList')}>
          <Text style={overviewStyles.seeMoreText}>Voir plus ></Text>
        </TouchableOpacity>
      </View>

      <View style={overviewStyles.handleExpensesContainer}>
        <Text style={overviewStyles.handleExpensesTitle}><Text style={commonStyles.redSpan}>G</Text>érer les opérations :</Text>

        <View style={overviewStyles.handleExpensesChoisesContainer}>
          <HandleExpenseButton icon="trash-outline" route="DeleteOperation"/>
          <HandleExpenseButton icon="add-outline" route="AddOperation"/>
          <HandleExpenseButton icon="share-social-outline" share/>
        </View>
      </View>
    </View>
  );
}
