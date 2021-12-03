import React from "react";
import { View, Text } from 'react-native';
import CustomFormInput from '../components/CustomFormInput';
import Button from '../components/Button';
import {red, black, white, green} from '../styles/variables';

import { commonStyles } from '../styles/commonStyles';
import { signinPageStyles } from '../styles/signinPageStyles';

export default function SigninPage() {
  return (
    <View style={commonStyles.viewStyle}>
      <Text style={signinPageStyles.title}><Text style={commonStyles.redSpan}>C</Text>onnexion</Text>

      <View style={signinPageStyles.signinFormContainer}>
        <CustomFormInput label="Nom d'utilisateur" placeholder="Votre nom d'utilisateur"/>
        <CustomFormInput label="Mot de passe" placeholder="Votre mot de passe"/>
      </View>
      <Button title="Connexion" bg={red} text_color={white}/>
      <Text style={commonStyles.forgotPass}>Mot de passe oublié ?</Text>
    </View>
  );
}
