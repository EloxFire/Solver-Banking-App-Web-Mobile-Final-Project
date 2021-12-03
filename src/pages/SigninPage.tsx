import React, {useState} from "react";
import CustomFormInput from '../components/CustomFormInput';
import { View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import {red, black, white, green} from '../styles/variables';
import { commonStyles } from '../styles/commonStyles';
import { signinPageStyles } from '../styles/signinPageStyles';

export default function SigninPage({ navigation }: any) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successfullLoginFeedback, setSuccessfullLoginFeedback] = useState("");
  const [unsuccessfullLoginFeedback, setUnsuccessfullLoginFeedback] = useState("");

  const loginUser = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // Signed in
      setSuccessfullLoginFeedback("Connexion réussie !");
      setInterval(() => {
        setSuccessfullLoginFeedback("");
        navigation.navigate("Overview");
      }, 1500);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      setUnsuccessfullLoginFeedback(`Erreur | ${errorMessage}`);
      setInterval(() => {
        setUnsuccessfullLoginFeedback("");
      }, 8000);
    });
  }

  return (
    <View style={commonStyles.viewStyle}>
      <Text style={signinPageStyles.title}><Text style={commonStyles.redSpan}>C</Text>onnexion</Text>

      <View style={signinPageStyles.signinFormContainer}>
        <CustomFormInput onChangeText={text => setUsername(text)} label="Nom d'utilisateur (email)" placeholder="Votre nom d'utilisateur (email)"/>
        <CustomFormInput onChangeText={pass => setPassword(pass)} secureTextEntry label="Mot de passe" placeholder="Votre mot de passe" />
      </View>
      <TouchableOpacity onPress={loginUser} style={[commonStyles.button, {backgroundColor: red}]}>
        <Text style={[commonStyles.buttonText, {color: white}]}>Connexion</Text>
      </TouchableOpacity>
      {
        successfullLoginFeedback !== "" &&
        <Text style={commonStyles.successText}>{successfullLoginFeedback}</Text>
      }
      {
        unsuccessfullLoginFeedback !== "" &&
        <Text style={commonStyles.failureText}>{unsuccessfullLoginFeedback}</Text>
      }
      <Text style={commonStyles.forgotPass}>Mot de passe oublié ?</Text>
    </View>
  );
}
