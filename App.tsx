import React, { Fragment } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import OverviewPage from './src/pages/OverviewPage';
import LoginScreen from './src/pages/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Fragment>
      <StatusBar theme="light"/>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Overview" component={OverviewPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
);
}
