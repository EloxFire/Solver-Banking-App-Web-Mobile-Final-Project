import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { addExpenseStyle } from '../styles/addExpensesStyles';
import CustomFormInput from '../components/CustomFormInput';
import { collection, addDoc, getFirestore } from "firebase/firestore";
// import DatePicker from 'react-native-date-picker';

export default function AddExpense({ navigation }: any){

  const [operationName, setOperationName] = useState("");
  const [operationAmount, setOperationAmount] = useState("");
  const [operationCategories, setOperationCategories] = useState("");
  const [operationDate, setOperationDate] = useState(new Date());
  const [operationDateModalOpened, setOperationDateModalOpened] = useState(false);

  const addOperation = () => {
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
      user_uid: '5pxz72tpraNTsetbb3PXtRXmn6I3'
    })
    .then((response) => {
      console.log(response);
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
        {/* <DatePicker //NOT WORKING
          modal
          open={operationDateModalOpened}
          date={operationDate}
          onConfirm={(date) => {
            setOperationDateModalOpened(false)
            setOperationDate(date)
          }}
          onCancel={() => {
            setOperationDateModalOpened(false)
          }}
        /> */}
        <TouchableOpacity onPress={() => addOperation()} style={[commonStyles.button, {marginTop: 20}]}>
          <Text style={commonStyles.buttonText}>Ajouter l'operation</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}