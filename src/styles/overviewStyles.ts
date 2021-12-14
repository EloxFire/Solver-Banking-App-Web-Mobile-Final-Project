import {red, black, white, green} from './variables';

export const overviewStyles = {
  title:{
    marginTop: 20,
    marginBottom: 40,
    fontSize: 40,
    fontFamily: 'MontserratBold',
    color: black,
  },
  balanceContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  balanceTitle: {
    margin: 0,
    fontSize: 15,
    fontFamily: 'MontserratBold',
    color: black,
  },
  balancePrice:{
    marginTop: -15,
    fontSize: 70,
    fontFamily: 'MontserratExtraBold',
    color: black,
  },
  expensesContainer:{
    marginTop: 30,
    marginLeft: -30,
    marginRight: -30,
  },
  exepensesContainerTitle:{
    fontSize: 25,
    paddingLeft: 30,
    fontFamily: 'MontserratSemiBold',
    color: black,
    marginBottom: 25,
  },
  noExpensesText:{
    color: black,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  addExpenseContainer:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  addExpenseText:{
    fontSize: 20,
    textDecorationLine: 'underline',
    color: red,
  },
  addExpenseTextButton:{
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  seeMoreContainer:{
    alignItems: 'flex-end',
  },
  seeMoreText:{
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'MontserratBold',
  },
  handleExpensesContainer:{
    marginTop: 10,
  },
  handleExpensesTitle:{
    fontSize: 20,
    fontFamily: 'MontserratBold',
  },
  handleExpensesChoisesContainer:{
    marginTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}
