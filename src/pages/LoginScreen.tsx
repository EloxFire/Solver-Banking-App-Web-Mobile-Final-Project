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
        {/* <Text style={commonStyles.forgotPass}>Mot de passe oublié ?</Text> */}
      </View>
      {/* <View style={{position:'absolute',height:80,bottom: 0,backgroundColor:'rgb(96, 5, 57)'}}>
        <Text>DDD</Text>
      </View> */}
    </View>
  );
}
