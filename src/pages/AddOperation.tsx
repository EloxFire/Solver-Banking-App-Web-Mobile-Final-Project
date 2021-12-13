import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Picker, Button } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { addExpenseStyle } from '../styles/addExpensesStyles';
import CustomFormInput from '../components/CustomFormInput';
import { collection, addDoc, getFirestore, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import ExpenseLite from '../components/ExpenseLite';
import { categoriesList, operationTypes } from '../utils/consts';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { v4 as uuidv4 } from 'uuid';

export default function AddExpense(){

  const navigation = useNavigation();

  const [operationName, setOperationName] = useState("");
  const [operationAmount, setOperationAmount] = useState("");
  const [operationCategories, setOperationCategories] = useState("");
  const [operationType, setOperationType] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const [addFeedback, setAddFeedback] = useState("");

  const addOperation = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    let categories = operationCategories.split(', ');
    let formatedOperationAmount = "";
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

    const db = getFirestore();
    const docRef = await addDoc(collection(db, "operations"), {
      operation_uid: uuidv4(),
      operation_name: operationName,
      operation_amount: parseFloat(formatedOperationAmount),
      operation_date: date,
      operation_state: operationType,
      operation_category: categories,
      user_uid: user.uid,
    })

    updateDoc(docRef, {
      operation_id: docRef.id
    })

    navigation.push("Overview");
  }

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={addExpenseStyle.title}><Text style={commonStyles.redSpan}>A</Text>jouter une nouvelle opération</Text>

      <View>
        <CustomFormInput onChangeText={(text) => setOperationName(text)} label="Nom" placeholder="Nom affiché" />
        <CustomFormInput onChangeText={(text) => setOperationAmount(text)} label="Montant" placeholder="Montant en euros"/>

        <Text style={commonStyles.textLabel}>Catégorie</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationCategories(value)}>
            {
              categoriesList.map((cat, index) => {
                return(
                  <Picker.Item key={index} label={`${cat.logo} ${cat.name}`} value={cat.name} />
                )
              })
            }
          </Picker>
        </View>

        <Text style={commonStyles.textLabel}>Type d'opération</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationType(value)}>
            {
              operationTypes.map((type, index) => {
                return(
                  <Picker.Item key={index} label={`${type.logo} ${type.name}`} value={type.value} />
                )
              })
            }
          </Picker>
        </View>

        <View>
          <Text style={commonStyles.textLabel}>Date de l'opération</Text>
          <TouchableOpacity onPress={() => showDatepicker()} style={[commonStyles.textInput, {height:30,padding:5}]}>
            <Text>Choisir une date - {date.toLocaleDateString()}</Text>
          </TouchableOpacity>

          <Text style={commonStyles.textLabel}>Heure de l'opération</Text>
          <TouchableOpacity onPress={() => showTimepicker()} style={[commonStyles.textInput, {height:30,padding:5}]}>
            <Text>Choisir une horaire - {date.toLocaleTimeString().slice(0, -3).replace(":", "h")}</Text>
          </TouchableOpacity>
          {
            show &&
            <DateTimePicker testID="dateTimePicker" value={date} mode={mode} is24Hour={true} display="default" onChange={onChange} />
          }
        </View>
        <TouchableOpacity onPress={() => addOperation()} style={[commonStyles.button, {marginTop: 20}]}>
          <Text style={commonStyles.buttonText}>Ajouter l'operation</Text>
        </TouchableOpacity>
        <Text style={commonStyles.failureText}>{addFeedback}</Text>


        <Text style={{marginBottom: 10, fontFamily: 'MontserratSemiBold', fontSize: 20}}> <Text style={commonStyles.redSpan}>A</Text>perçu de l'opération :</Text>
        <View style={{marginHorizontal: -30}}>
          <ExpenseLite
            topBorder
            title={operationName ? operationName : "No name"}
            date={date.toLocaleDateString().toString()}
            hour={date.toLocaleTimeString()}
            amount={operationAmount ? operationAmount : "No amount"}
            state={operationType ? true : false}
          />
        </View>
      </View>
    </View>
  )
}
