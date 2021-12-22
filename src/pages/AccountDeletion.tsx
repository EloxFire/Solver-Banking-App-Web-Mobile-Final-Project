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
  const [user, setUser] = useState({
    uuid: "Chargement",
    username: "Chargement",
    created_at: "Chargement",
    updated_at: "Chargement",
    mail: "Chargement",
    emailVerified: "Chargement",
    phone: "Chargement",
    age: "Chargement",
    town: "Chargement",
    photoUrl: null,
  });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const db = getFirestore();
    const usersRef = collection(db, 'users');

    let uid, emailVerified;
    if (currentUser !== null) {
      uid = currentUser.uid;
      emailVerified = currentUser.emailVerified;
      const q1 = query(usersRef,
        where("user_uuid", "==", uid)
      );

      getDocs(q1)
      .then((response) => {
        const data = response.docs.map((doc, index) => {
          return doc.data();
        });
        console.log("DELETE PAGE GET :", data[0]);
        setUser({
          uuid: data[0].user_uuid,
          username: data[0].user_display_name,
          created_at: data[0].created_at.toDate().toDateString(),
          updated_at: data[0].updated_at.toDate().toDateString(),
          mail: data[0].user_mail,
          emailVerified: data[0].user_mail_verified,
          phone: data[0].user_phone,
          age: data[0].user_age,
          town: data[0].user_town,
          photoUrl: null,
          ref: data[0].user_ref,
        });
      });
    }
  }, []);


  const deleteUserAccount = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    console.log("USER REF IN DELETE PAGE :", user.ref);

    deleteUser(user);
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
          <TouchableOpacity onPress={() => navigation.push('Profile')} style={[commonStyles.button, {width: "100%", backgroundColor: black, marginTop: 10}]}>
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
