import React, { useState, useEffect } from 'react';
import { View, Text, Picker, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { getAuth } from 'firebase/auth';
import { getFirestore, deleteDoc, doc, collection, where, query, getDocs } from 'firebase/firestore';

export default function DeleteOperation({ navigation } : any){

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
    const operationsRef = collection(db, 'operations');

    const q1 = query(operationsRef,
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

  const deleteOperation = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    let uid;
    if (user !== null) {
      uid = user.uid;
    }

    console.log(operationToDelete);
    console.log(uid);

    const db = getFirestore();
    deleteDoc(doc(db, "operations", operationToDelete));

    navigation.navigate("Overview");
  }

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>S</Text>upprimer une opération</Text>

      <View>
        <Text style={commonStyles.textLabel}>Opération à supprimer :</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationToDelete(value)}>
            {
              operations.map((operation, index) => {
                return(
                  <Picker.Item key={index} label={`${operation.operation_state ? "📈" : "📉"} ${operation.operation_name} (${operation.operation_state ? "+" : "-"}${operation.operation_amount}€) - ${operation.operation_date.toDate().toLocaleDateString()}`} value={`${operation.operation_id}`} />
                )
              })
            }
          </Picker>
        </View>
        <TouchableOpacity onPress={() => deleteOperation()} style={[commonStyles.button, {marginTop: 20}]}>
          <Text style={commonStyles.buttonText}>Suppriemer l'operation</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
