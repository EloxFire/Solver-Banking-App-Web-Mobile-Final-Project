import React, { useState, useEffect } from 'react';
import { View, Text, Picker } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { getAuth } from 'firebase/auth';

export default function DeleteOperation(){

  const [operations, setOperations] = useState([]);
  const [operationToDelete, setOperationToDelete] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    let uid;
    if (user !== null) {
      uid = user.uid;
    }

    const db = getFirestore();
    const expenseRef = collection(db, 'expenses');

    const q1 = query(expenseRef,
      where("user_uid", "==", uid),
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      setOperations(data);
    });
  }, []);

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>S</Text>upprimer une opération</Text>

      <View>
        <Text style={commonStyles.textLabel}>Catégorie</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationToDelete(value)}>
            {
              operations.map((operation, index) => {
                return(
                  <Picker.Item key={index} label={`${operation.market_name} (${operation.state ? "+" : "-"}${operation.amount}) - ${operation.expense_date.toLocaleDateString()}`} value={operation.uid} />
                )
              })
            }
          </Picker>
        </View>
      </View>
    </View>
  )
}
