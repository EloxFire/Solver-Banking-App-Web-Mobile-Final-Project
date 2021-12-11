export function balanceCalculator(expensesArray: Array, incomesArray: Array){
  // Calculate expenses total
  const totalExpenses = expensesArray.reduce((a, b) => a + b, 0);
  const totalIncomes = incomesArray.reduce((a, b) => a + b, 0);

  // console.log("Calculator expenses :", totalExpenses);
  // console.log("Calculator incomes :", totalIncomes);

  let balance = totalIncomes - totalExpenses;
  // console.log("Total balance :", balance);

  if(totalIncomes > totalExpenses){
    return `+${Math.round(balance * 100)/100}`;
  }else{
    return `${Math.round(balance * 100)/100}`;
  }
}

export function addFromArray(array: Array){
  const total = array.reduce((a, b) => a + b, 0);

  return Math.round(total * 100)/100;
}
