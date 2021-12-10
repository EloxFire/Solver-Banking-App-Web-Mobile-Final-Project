import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Picker } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { addExpenseStyle } from '../styles/addExpensesStyles';
import CustomFormInput from '../components/CustomFormInput';
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import ExpenseLite from '../components/ExpenseLite';
import { categoriesList, operationTypes } from '../utils/consts';
import { useNavigation } from '@react-navigation/native';

export default function AddExpense(){

  // console.log((new Date().getMinutes()).toString());
  // console.log(new Date("1870-12-10").toLocaleDateString('fr-FR'));

  const navigation = useNavigation();

  const [operationName, setOperationName] = useState("");
  const [operationAmount, setOperationAmount] = useState("");
  const [operationCategories, setOperationCategories] = useState("");
  const [operationType, setOperationType] = useState(false);
  const [operationDay, setOperationDay] = useState(new Date().getDate().toString());
  const [operationMonth, setOperationMonth] = useState((new Date().getMonth()+1).toString());
  const [operationYear, setOperationYear] = useState(new Date().getFullYear().toString());
  const [operationHour, setOperationHour] = useState(new Date().getHours().toString());
  const [operationMinutes, setOperationMinutes] = useState(new Date().getMinutes().toString());

  const [addFeedback, setAddFeedback] = useState("");

  // useEffect(() => {
  //   console.log(new Date(`${operationYear}-${operationMonth}-${operationDay}`).toLocaleDateString('fr-FR').toString());
  //   // console.log(new Date('2021-12-09').toLocaleDateString('fr-FR').toString());
  // })

  // const setYear = (year) => {
  //
  // }
  //
  // const selectType = (type) => {
  //   if(type === "true" || type === "True"){
  //     console.log(true);
  //     setOperationType(true);
  //   }else if(type === "false" || type === "False"){
  //     console.log(false);
  //     setOperationType(false);
  //   }
  // }


  const addOperation = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    let categories = operationCategories.split(', ');
    let formatedOperationAmount;
    if(operationAmount.includes(",")){
      formatedOperationAmount = operationAmount.replace(',', '.');
    }

    // BIZZARE MAIS NECESSAIRE....
    if(operationAmount.includes(".")){
      formatedOperationAmount = operationAmount.replace('.', '.');
    }

    if(operationName === ""){
      setAddFeedback("Nom d'opération requis !");
      return;
    }

    if(operationAmount === ""){
      setAddFeedback("Montant requis !");
      return;
    }

    // console.log("Amount", parseFloat(formatedOperationAmount));
    // console.log("Catergory", categories);
    // console.log("Date", new Date(`${operationYear}-${operationMonth}-${operationDay}`).toLocaleDateString().toString());
    // console.log("Name", operationName);
    // console.log("Type", operationType);
    // console.log("UID", user.uid);

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
        navigation.navigate("Overview");
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

        <CustomFormInput onChangeText={(text) => setOperationName(text)} label="Nom" placeholder="Nom affiché" />
        <CustomFormInput onChangeText={(text) => setOperationAmount(text)} label="Montant" placeholder="Montant en euros"/>
        {/* <CustomFormInput onChangeText={(text) => setOperationCategories(text)} label="Catégories" placeholder="Liste des catégories spérarées par une ','"/> */}
        <Text style={commonStyles.textLabel}>Catégorie</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationCategories(value)}>
            {
              categoriesList.map((cat, index) => {
                return(
                  <Picker.Item label={`${cat.logo} ${cat.name}`} value={cat.name} />
                )
              })
            }
          </Picker>
        </View>
        {/* <CustomFormInput onChangeText={(type) => selectType(type)} label="Type d'opération" placeholder="Ecrivez 'true' pour un revenu, 'false' pour une dépense"/> */}
        <Text style={commonStyles.textLabel}>Type d'opération</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationType(value)}>
            {
              operationTypes.map((type, index) => {
                return(
                  <Picker.Item label={`${type.logo} ${type.name}`} value={type.value} />
                )
              })
            }
          </Picker>
        </View>
        {/* <View style={addExpenseStyle.dateFormContainer}>
          <CustomFormInput onChangeText={(text) => setOperationDay(text)} label="Jour" placeholder="09" width="40%"/>
          <CustomFormInput onChangeText={(text) => setOperationMonth(text)} label="Mois" placeholder="11" width="40%"/>
          <CustomFormInput onChangeText={(text) => setOperationYear(text)} label="Année" placeholder="2021" width="40%"/>
        </View> */}
        <TouchableOpacity onPress={() => addOperation()} style={[commonStyles.button, {marginTop: 20}]}>
          <Text style={commonStyles.buttonText}>Ajouter l'operation</Text>
        </TouchableOpacity>
        <Text style={commonStyles.failureText}>{addFeedback}</Text>


        <Text style={{marginBottom: 10, marginTop: 10, fontFamily: 'MontserratSemiBold', fontSize: 20}}> <Text style={commonStyles.redSpan}>A</Text>perçu de l'opération :</Text>
        <View style={{marginHorizontal: -30}}>
          <ExpenseLite
            topBorder
            title={operationName ? operationName : "No name"}
            date={new Date(`${operationYear}-${operationMonth}-${operationDay}`).toLocaleDateString().toString()}
            hour={new Date().toLocaleTimeString('fr-FR')}
            amount={operationAmount ? operationAmount : "No amount"}
            state={operationType ? operationType : false}
          />
        </View>
      </View>
    </View>
  )
}
