import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { overviewStyles } from '../styles/overviewStyles';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function OverviewPage({ navigation } : any) {

  const [user, setUser] = useState({});
  const monthsList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if(user){
        console.log(user);
        setUser({
          uuid: user.uid,
          username: user.displayName ? user.displayName : "",
          mail: user.email,
          emailVerified: user.isEmailVerified,
          phone: user.phoneNumber ? user.phoneNumber : "",
        })
      }else{
        console.log("User signed out");
      }
    });
  }, [])

  return (
    <View style={commonStyles.viewStyle}>
      <Text style={overviewStyles.title}><Text style={commonStyles.redSpan}>B</Text>onjour {user.username} !</Text>

      <View>
        <Text><Text>V</Text>os dépenses de {monthsList[new Date().getMonth().toString().toLowerCase()]}</Text>
      </View>
    </View>
  );
}
