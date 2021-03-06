import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { expensesLiteStyles } from '../styles/expensesLite';
import { commonStyles } from '../styles/commonStyles';
import { Icon } from 'react-native-elements';
import { black, red, green } from '../styles/variables';
import { useNavigation } from '@react-navigation/native';

interface ExpenseLiteInterface {
  topBorder: Boolean,
  title: string,
  date: string,
  hour: string,
  amount: number,
  state: Boolean, //True = Positive, False = negative,
  id: string,
}

export default function ExpenseLite(props:ExpenseLiteInterface){
  const navigation = useNavigation();

  return(
    <TouchableOpacity onPress={() => navigation.push("OperationDetailed", {operation_id: props.id,})} style={[expensesLiteStyles.container, props.topBorder && {borderTopWidth: .5, borderTopColor: black}]}>
      <View>
        <Text style={expensesLiteStyles.expenseTitle}>{props.title}</Text>
        <Text style={expensesLiteStyles.expenseSubitle}>{props.date} - {props.hour.slice(0, -3).replace(':', 'h')}</Text>
      </View>
      <View style={[expensesLiteStyles.amountContainer]}>
        {
          props.state ?
          <Text style={[expensesLiteStyles.expenseStateText, props.state ? {color: green} : {color: red}]}>+</Text>
          :
          <Text style={[expensesLiteStyles.expenseStateText, props.state ? {color: green} : {color: red}]}>-</Text>
        }
        <Text style={[expensesLiteStyles.expenseAmount, props.state ? {color: green} : {color: red}]}>{props.amount} €</Text>
      </View>
    </TouchableOpacity>
  )
}
