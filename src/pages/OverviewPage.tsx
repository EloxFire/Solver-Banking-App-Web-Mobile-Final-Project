import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function OverviewPage({ navigation } : any) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>BIENVENUE !</Text>
      <Button onPress={() => navigation.navigate('Login')} title="Retour au choix de login"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
