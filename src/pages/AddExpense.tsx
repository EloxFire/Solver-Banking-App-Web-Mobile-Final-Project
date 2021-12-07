import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { addExpenseStyle } from '../styles/addExpensesStyles';
import CustomFormInput from '../components/CustomFormInput';
import DatePicker from 'react-native-date-picker';

export default function AddExpense({ navigation }: any){

  const [operationName, setOperationName] = useState("");
  const [operationAmount, setOperationAmount] = useState("");
  const [operationCategories, setOperationCategories] = useState("");
  const [operationDate, setOperationDate] = useState(new Date());
  const [operationDateModalOpened, setOperationDateModalOpened] = useState(false);

  const addOperation = () => {

  }

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={addExpenseStyle.title}><Text style={commonStyles.redSpan}>A</Text>jouter une nouvelle opération</Text>

      <View>
        <CustomFormInput onChangeText={(text) => setOperationName(text)} label="Nom" placeholder="Nom affiché"/>
        <CustomFormInput onChangeText={(text) => setOperationAmount(text)} label="Montant" placeholder="Montant en euros"/>
        <CustomFormInput onChangeText={(text) => setOperationCategories(text)} label="Catégories" placeholder="Liste des catégories spérarées par une ','"/>
        <Text style={commonStyles.textLabel}>Date de l'opération</Text>
        <TouchableOpacity onPress={() => setOperationDateModalOpened(true)} style={commonStyles.datePickerOpenner}>
          <Text style={commonStyles.datePickerOpennerText}>Choisir une date</Text>
        </TouchableOpacity>
        <DatePicker
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
        />

      </View>
    </View>
  )
}
