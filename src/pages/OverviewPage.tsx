import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function StartPage({ navigation } : any) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text>START PAGE</Text>
      <Button onPress={() => navigation.navigate('Home')} title="Aller a la homepage"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
