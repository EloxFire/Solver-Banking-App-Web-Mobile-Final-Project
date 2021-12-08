import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import {commonStyles} from '../styles/commonStyles';
import {loginStyles} from '../styles/loginScreen';
import {Icon} from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import {red, black, white, green} from '../styles/variables';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import NavigationButton from '../components/NavigationButton';


export default function LoginScreen({ navigation }: any) {
  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if(user){
  //       console.log(user);
  //       navigation.navigate("Overview");
  //     }
  //   });
  // }, []);

  return (
    <View style={commonStyles.viewStyle}>
      <StatusBar style="dark" />
      <View style={loginStyles.titleContainer}>
        <Text style={loginStyles.title}><Text style={commonStyles.redSpan}>S</Text>olver</Text>
        <Text style={loginStyles.subtitle}>Une nouvelle façon {"\n"}de faire ses comptes</Text>
      </View>
      <View>
        <View style={loginStyles.signinContainer}>
          <NavigationButton
            width="100%"
            title="Connexion"
            text_color={white}
            bg={red}
            nav={navigation}
            nav_direction="SignIn"
          />
          {/* <NavigationButton
            width="20%"
            // title="Connexion"
            text_color={white}
            icon icon_name="finger-print-outline"
            icon_type="ionicon"
            icon_color={white}
            bg={red}
          /> */}
        </View>
        <View style={loginStyles.signupContainer}>
          <NavigationButton
            width="100%"
            title="Inscription"
            text_color={white}
            bg={black}
            nav={navigation}
            nav_direction="SignUp"
          />
        </View>
        <Text style={commonStyles.forgotPass}>Mot de passe oublié ?</Text>
      </View>
      {/* <Text>Open up App.tsx to start working on your app!</Text>
        <Button onPress={() => navigation.navigate("Start")} title="Aller a la index page"/> */}
      </View>
    );
  }
