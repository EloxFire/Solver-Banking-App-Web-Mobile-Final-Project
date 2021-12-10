import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { addExpenseStyle } from '../styles/addExpensesStyles';
import CustomFormInput from '../components/CustomFormInput';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

export default function AddExpense(){

  const [operationName, setOperationName] = useState("");
  const [operationAmount, setOperationAmount] = useState("");
  const [operationCategories, setOperationCategories] = useState("");
  const [operationDate, setOperationDate] = useState(new Date());
  const [operationDateModalOpened, setOperationDateModalOpened] = useState(false);

  const [addFeedback, setAddFeedback] = useState("");

  useEffect(() => {
    console.log("MOUNTING ADDEXPENSE");
    // console.log(navigation);

    return () => {
      console.log("UNMOUNTING ADDEXPENSE");
    }
  });

  const addOperation = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    let categories = operationCategories.split(',');
    let formatedOperationAmount;
    if(operationAmount.includes(",")){
      formatedOperationAmount = operationAmount.replace(',', '.');
    }

    const db = getFirestore();
    addDoc(collection(db, "expenses"), {
      expense_amount: parseFloat(formatedOperationAmount),
      expensesCategories: categories,
      expense_date: new Date(),
      market_name: operationName,
      state: false,
      user_uid: user.uid,
    })
    .then((response) => {
      if(response){
        setAddFeedback("Opération ajoutée");
        setInterval(() => {
          setAddFeedback("");
        }, 4000);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={addExpenseStyle.title}><Text style={commonStyles.redSpan}>A</Text>jouter une nouvelle opération</Text>

      <View>
        <CustomFormInput onChangeText={(text) => setOperationName(text)} label="Nom" placeholder="Nom affiché"/>
        <CustomFormInput onChangeText={(text) => setOperationAmount(text)} label="Montant" placeholder="Montant en euros"/>
        <CustomFormInput onChangeText={(text) => setOperationCategories(text)} label="Catégories" placeholder="Liste des catégories spérarées par une ','"/>
        <Text style={commonStyles.textLabel}>Date de l'opération <Text style={commonStyles.smallLabel}>(date actuelle par défaut)</Text></Text>
        <TouchableOpacity onPress={() => setOperationDateModalOpened(true)} style={commonStyles.datePickerOpenner}>
          <Text style={commonStyles.datePickerOpennerText}>Choisir une date</Text>
        </TouchableOpacity>
        <Text style={commonStyles.textLabel}>Heure de l'opération <Text style={commonStyles.smallLabel}>(heure actuelle par défaut)</Text></Text>
        <TouchableOpacity onPress={() => setOperationDateModalOpened(true)} style={commonStyles.datePickerOpenner}>
          <Text style={commonStyles.datePickerOpennerText}>Choisir une heure</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => addOperation()} style={[commonStyles.button, {marginTop: 20}]}>
          <Text style={commonStyles.buttonText}>Ajouter l'operation</Text>
        </TouchableOpacity>
        <Text style={commonStyles.successText}>{addFeedback}</Text>
      </View>
    </View>
  )
}
