import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth, deleteUser } from 'firebase/auth';
import { getFirestore, deleteDoc, doc, collection, where, query, getDocs } from 'firebase/firestore';
import { commonStyles } from "../styles/commonStyles";
import {red, black, white, green} from '../styles/variables';
import { accountDeletionStyles } from '../styles/accountDeletion';

export default function AccountDeletion({ navigation } : any){

  const [deletionError, setDeletionError] = useState("");
  const [userAccountRef, setUserAccountRef] = useState("");

  useEffect(() => {
    getCurrentUser();
  })

  const getCurrentUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    let uid;
    if (user !== null) {
      uid = user.uid;
    }

    const db = getFirestore();
    const operationsRef = collection(db, 'users');

    //GET ALL OPERATIONS REGISTERED
    const q1 = query(operationsRef,
      where("user_uuid", "==", uid)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      setUserAccountRef(data[0].user_ref);
    });
  }


  const deleteUserAccount = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    deleteUser(user).then(() => {
      const db = getFirestore();
      deleteDoc(doc(db, "users", userAccountRef));
      navigation.push("Login");
      ToastAndroid.show('Request sent successfully!', ToastAndroid.SHORT);
    }).catch((error) => {
      console.log(error);
    })
  }


  return(
    <View style={[commonStyles.viewStyle, {height: "100%"}]}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>S</Text>upprimer votre compte</Text>

      <View style={accountDeletionStyles.container}>
        <Text style={accountDeletionStyles.confirmationTitle}>Etes vous sur de vouloir supprimer votre compte ?</Text>

        <View style={{flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
          {/* <Icon name="alert-circle-outline" type="ionicon" color={red} size={20}/> */}
          <Text style={accountDeletionStyles.confirmationSubtitle}>Cette action est irréversible</Text>
          {/* <Icon name="alert-circle-outline" type="ionicon" color={red} size={20}/> */}
        </View>

        <View style={{marginTop: 30, width: "100%"}}>
          <TouchableOpacity onPress={() => deleteUserAccount()} style={[commonStyles.button, {width: "100%"}]}>
            <Text style={accountDeletionStyles.buttonText}>Oui, procédez</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[commonStyles.button, {width: "100%", backgroundColor: black, marginTop: 10}]}>
            <Text style={accountDeletionStyles.buttonText}>Non, abandon de la mission</Text>
          </TouchableOpacity>
        </View>
        <Text style={{color:red, fontSize: 20, marginTop:20}}>{deletionError}</Text>
      </View>

      <View style={accountDeletionStyles.disclaimerContainer}>
        <Text style={accountDeletionStyles.disclaimerText}>Supprimer votre compte efface toute trace de ce dernier dans les bases de données de Solver. Toute opération enregistrée sera perdue. Toutes les données relatives à vos informations personnelles seront supprimées.</Text>
      </View>
    </View>
  )
}
