import React, {useState} from "react";
import CustomFormInput from '../components/CustomFormInput';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { collection, addDoc, getFirestore, updateDoc } from "firebase/firestore";


import {red, black, white, green} from '../styles/variables';
import { commonStyles } from '../styles/commonStyles';
import { signinPageStyles } from '../styles/signinPageStyles';

export default function SignupPage({ navigation }: any) {

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [successfullRegisterFeedback, setSuccessfullRegisterFeedback] = useState("");
  const [unsuccessfullRegisterFeedback, setUnsuccessfullRegisterFeedback] = useState("");

  const registerUser = async () => {
    if(password !== passwordConfirmation){
      setUnsuccessfullRegisterFeedback("Les mot de passe ne correspondent pas...")
      return;
    }

    const new_user = {
      user_display_name: fullName,
      user_mail: username,
      user_mail_verified: false,
      user_photoUrl: null,
      user_phone: "N/A",
      user_age: "N/A",
      user_town: "N/A",
      created_at: new Date(),
      updated_at: new Date(),
    }

    console.log("NEW USER :", new_user);

    const db = getFirestore();
    const docRef = await addDoc(collection(db, "users"), new_user);

    updateDoc(docRef, {
      user_ref: docRef.id
    })

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // console.log("USER CREDENTIAL", userCredential);
      console.log("User successfully registered");
      setSuccessfullRegisterFeedback("Inscription réussie !");

      updateDoc(docRef, {
        user_uuid: userCredential.user.uid
      });

      signOut(auth)
      .then(() => {
        navigation.push('Login');
      });
      // navigation.push("Overview");
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log(`Erreur d'inscription | ${errorMessage}`);
      setUnsuccessfullRegisterFeedback(`Erreur | ${errorMessage}`);
    });

  }

  return (
    <View style={commonStyles.viewStyle}>
      <Text style={signinPageStyles.title}><Text style={commonStyles.redSpan}>I</Text>nscription</Text>

      <View style={signinPageStyles.signinFormContainer}>
        <CustomFormInput onChangeText={(text) => setUsername(text)} label="Email" placeholder="Votre email vous servira d'identifiant"/>
        <CustomFormInput onChangeText={(text) => setFullName(text)} label="Nom complet" placeholder="Nom de famille puis prénom de préférence"/>
        <CustomFormInput onChangeText={(pass) => setPassword(pass)} secureTextEntry label="Mot de passe" placeholder="Votre mot de passe" />
        <CustomFormInput onChangeText={(pass) => setPasswordConfirmation(pass)} secureTextEntry label="Mot de passe (confirmation)" placeholder="Votre mot de passe" />
      </View>
      <TouchableOpacity onPress={() => registerUser()} style={[commonStyles.button, {backgroundColor: black}]}>
        <Text style={[commonStyles.buttonText, {color: white}]}>Inscription</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.push("SignIn")}>
        <Text style={commonStyles.forgotPass}>Vous avez un compte ? <Text style={commonStyles.redSpan}>Connectez-vous</Text></Text>
      </TouchableOpacity>
      {
        successfullRegisterFeedback !== "" &&
        <Text style={commonStyles.successText}>{successfullRegisterFeedback}</Text>
      }
      {
        unsuccessfullRegisterFeedback !== "" &&
        <Text style={commonStyles.failureText}>{unsuccessfullRegisterFeedback}</Text>
      }
    </View>
  );
}
