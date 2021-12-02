import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {loginStyles} from '../styles/loginScreen';
import {Icon} from 'react-native-elements';
import {red, black, white, green} from '../styles/variables';


import Button from '../components/Button';

export default function LoginScreen({ navigation }: any) {
  // console.log(StatusBar.currentHeight);
  return (
    <View style={commonStyles.viewStyle}>
      <StatusBar style="dark" />
      <View style={loginStyles.titleContainer}>
        <Text style={loginStyles.title}><Text style={loginStyles.titleSpan}>S</Text>olver</Text>
        <Text style={loginStyles.subtitle}>Une nouvelle façon {"\n"}de faire ses comptes</Text>
      </View>
      <View>
        <View style={loginStyles.signinContainer}>
          <Button
            width="78.5%"
            title="Connexion"
            text_color={white}
            bg={red}
            nav={navigation}
            nav_direction="SignIn"
          />
          <Button
            width="20%"
            // title="Connexion"
            text_color={white}
            icon icon_name="finger-print-outline"
            icon_type="ionicon"
            icon_color={white}
            bg={red}
          />
        </View>
        <View style={loginStyles.signupContainer}>
          <Button
            width="100%"
            title="Inscription"
            text_color={white}
            bg={black}
          />
        </View>
        <Text style={commonStyles.forgotPass}>Mot de passe oublié ?</Text>
      </View>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
      <Button onPress={() => navigation.navigate("Start")} title="Aller a la index page"/> */}
    </View>
  );
}
