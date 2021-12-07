import React, { Fragment, useState, useEffect } from 'react';
import useFonts from './src/hooks/useFonts';
import { StatusBar } from 'expo-status-bar';
import AppLoading from 'expo-app-loading';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from './firebaseConfig';
import { red, black, white, green } from './src/styles/variables';


import Navbar from './src/components/Navbar';
import LoginScreen from './src/pages/LoginScreen';
import SigninPage from './src/pages/SigninPage';
import SignupPage from './src/pages/SignupPage';
import AddExpense from './src/pages/AddExpense';
import OverviewPage from './src/pages/OverviewPage';

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await useFonts(); // We have to await this call here
  };

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
  }, [])

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
    <Fragment>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignIn" component={SigninPage} />
          <Stack.Screen name="SignUp" component={SignupPage} />
          <Stack.Screen name="Overview" component={OverviewPage} />
          <Stack.Screen name="AddExpense" component={AddExpense} />
        </Stack.Navigator>
        <Navbar
          profilIconColor={black}
          homeIconColor={black}
          statsIconColor={black}
        />
      </NavigationContainer>
    </Fragment>
  );
}
