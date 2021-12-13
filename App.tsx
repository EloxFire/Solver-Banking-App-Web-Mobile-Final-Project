import React, { Fragment, useState, useEffect } from 'react';
import useFonts from './src/hooks/useFonts';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
import { doc, onSnapshot, getFirestore } from "firebase/firestore";
import { red, black, white, green } from './src/styles/variables';
import * as LocalAuthentication from 'expo-local-authentication';


import Navbar from './src/components/Navbar';
import LoginScreen from './src/pages/LoginScreen';
import SigninPage from './src/pages/SigninPage';
import SignupPage from './src/pages/SignupPage';
import AddExpense from './src/pages/AddExpense';
import OverviewPage from './src/pages/OverviewPage';
import OperationList from './src/pages/OperationList';
import InfosPage from './src/pages/InfosPage';
import DeleteOperation from './src/pages/DeleteOperation';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  const loadFonts = async () => {
    await useFonts(); // We have to await this call here
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();

    // handleBiometricAuth();
  });

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    // console.log(parseFloat(722));

    // const db = getFirestore();
    // const unsub = onSnapshot(doc(db, 'expenses'), (document) => {
    //   console.log("Current data: ", doc.data());
    // });
  }, []);


  const handleBiometricAuth = async () => {
    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Vérifiez votre identité.",
      disableDeviceFallback: true,
      cancelLabel: "Cancel"
    });
  }

  if(!fontsLoaded){
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(error) => console.log(error)}
      />
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignIn" component={SigninPage} />
        <Stack.Screen name="SignUp" component={SignupPage} />
        <Stack.Screen name="Overview" component={OverviewPage} />
        <Stack.Screen name="OperationList" component={OperationList} />
        <Stack.Screen name="AddExpense" component={AddExpense} />
        <Stack.Screen name="Infos" component={InfosPage} />
        <Stack.Screen name="DeleteOperation" component={DeleteOperation} />
      </Stack.Navigator>
      <Navbar
        profilIconColor={black}
        homeIconColor={black}
        statsIconColor={black}
      />
    </NavigationContainer>
  );
}
