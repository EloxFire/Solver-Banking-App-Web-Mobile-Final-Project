import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import CustomFormInput from '../components/CustomFormInput';
import { getAuth } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where, updateDoc, doc, getDoc } from "firebase/firestore";
import {red, black, white, green, orange} from '../styles/variables';


export default function AccountUpdate({ navigation } : any){

  const [age, setAge] = useState("");
  const [town, setTown] = useState("");
  const [phone, setPhone] = useState("");
  const [mail, setMail] = useState("");

  const [addFeedback, setAddFeedback] = useState("");
  const [addFeedbackFail, setAddFeedbackFail] = useState("");
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
        console.log("UPDATE PAGE GET :", data[0]);
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

  const updateAccountInformations = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const db = getFirestore();

    const newInfos = {
      user_age: age !== "" ? parseInt(age) : user.age,
      user_mail: mail !== "" ? mail : user.mail,
      user_phone: phone !== "" ? phone : user.phone,
      user_town: town !== "" ? town : user.town,
      updated_at: new Date(),
    }

    const docRef = doc(db, 'users', user.ref);
    try {
      updateDoc(docRef, newInfos);
    } catch (e) {
      console.log(e);
      setAddFeedbackFail("Une erreur est survenue lors de la mise à jour de vos données...")
    } finally {
      setAddFeedback('Mise à jour réussie !');
      navigation.push('Profile');
    }
  }

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>M</Text>ettre à jour vos informations</Text>

      <View style={{marginTop: 30}}>
        {/* <CustomFormInput onChangeText={(text) => setUsername(text)} label="Nom" placeholder={`Valeur actuelle : ${user.username}`}/> */}
        <CustomFormInput onChangeText={(text) => setAge(text)} label="Âge" placeholder={`Valeur actuelle : ${user.age.toString()}`}/>
        <CustomFormInput onChangeText={(text) => setTown(text)} label="Ville" placeholder={`Valeur actuelle : ${user.town}`}/>
        <CustomFormInput onChangeText={(text) => setPhone(text)} label="Numéro de téléphone" placeholder={`Valeur actuelle : ${user.phone}`}/>
        <CustomFormInput onChangeText={(text) => setMail(text)} label="Adresse mail" placeholder={`Valeur actuelle : ${user.mail}`}/>
        <TouchableOpacity onPress={() => updateAccountInformations()} style={[commonStyles.button, {marginTop: 20}]}>
          <Text style={commonStyles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
        <Text style={commonStyles.failureText}>{addFeedbackFail}</Text>
        <Text style={commonStyles.successText}>{addFeedback}</Text>
      </View>
    </View>
  )
}
