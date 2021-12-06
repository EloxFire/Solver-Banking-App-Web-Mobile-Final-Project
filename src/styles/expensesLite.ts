import {red, black, white, green} from './variables';

export const expensesLiteStyles = {
  container:{
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 5,
    paddingBottom: 5,
    height: 70,
    borderBottomColor: black,
    borderBottomWidth: .5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expenseTitle:{
    fontSize: 20,
    color: black,
    fontFamily: 'MontserratBold',
    marginBottom: 5,
  },
  expenseSubtitle:{
    fontSize: 20,
    color: black,
    fontFamily: 'MontserratBold',
  },
  expenseAmount:{
    fontSize: 20,
    fontFamily: 'MontserratBold',
  },
  amountContainer:{
    flexDirection: 'row'
  },
  expenseStateText:{
    fontSize: 20,
    fontFamily: 'MontserratBold',
  },
}
