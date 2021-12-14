import React, {useState} from "react";
import CustomFormInput from '../components/CustomFormInput';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


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

  const registerUser = () => {
    if(password !== passwordConfirmation){
      setUnsuccessfullRegisterFeedback("Les mot de passe ne correspondent pas...")
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      updateProfile(userCredential.user, {
        displayName: fullName
      });
    })
    .then((response) => {
      console.log("User successfully registed");
      setSuccessfullRegisterFeedback("Inscription réussie !");
      navigation.navigate("Overview");
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
