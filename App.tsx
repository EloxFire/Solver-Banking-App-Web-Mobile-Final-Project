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
import 'react-native-get-random-values'; //NEEDED FOR UUIDV4 TO WORK


import Navbar from './src/components/Navbar';
import LoginScreen from './src/pages/LoginScreen';
import SigninPage from './src/pages/SigninPage';
import SignupPage from './src/pages/SignupPage';
import AddOperation from './src/pages/AddOperation';
import OverviewPage from './src/pages/OverviewPage';
import OperationList from './src/pages/OperationList';
import InfosPage from './src/pages/InfosPage';
import DeleteOperation from './src/pages/DeleteOperation';
import ProfilePage from './src/pages/ProfilePage';
import AccountDeletion from './src/pages/AccountDeletion';
import AccountUpdate from './src/pages/AccountUpdate';
import OperationDetailed from './src/pages/OperationDetailed';

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
        <Stack.Screen name="AddOperation" component={AddOperation} />
        <Stack.Screen name="Infos" component={InfosPage} />
        <Stack.Screen name="DeleteOperation" component={DeleteOperation} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="AccountDeletion" component={AccountDeletion}/>
        <Stack.Screen name="AccountUpdate" component={AccountUpdate}/>
        <Stack.Screen name="OperationDetailed" component={OperationDetailed}/>
      </Stack.Navigator>
      <Navbar
        profilIconColor={black}
        homeIconColor={black}
        statsIconColor={black}
      />
    </NavigationContainer>
  );
}
