import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { getAuth, signOut } from 'firebase/auth';
import { getFirestore, getDocs, collection, query, where } from "firebase/firestore";
import { commonStyles } from '../styles/commonStyles';
import { profilePage } from '../styles/profilePage';
import {red, black, white, green} from '../styles/variables';

export default function ProfilePage({ navigation } : any){

  const [user, setUser] = useState({
    uuid: "Chargement",
    username: "Chargement",
    created_at: "Chargement",
    updated_at: "Chargement",
    mail: "Chargement",
    emailVerified: "Chargement",
    phone: "Chargement",
    age: "Chargement",
    town: "Chargement",
    photoUrl: null,
  });

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const db = getFirestore();
    const usersRef = collection(db, 'users');

    let uid, emailVerified;
    if (currentUser !== null) {
      uid = currentUser.uid;
      emailVerified = currentUser.emailVerified;
      const q1 = query(usersRef,
        where("user_uuid", "==", uid)
      );

      getDocs(q1)
      .then((response) => {
        const data = response.docs.map((doc, index) => {
          return doc.data();
        });
        console.log("PROFILE GET :", data[0]);
        setUser({
          uuid: data[0].user_uuid,
          username: data[0].user_display_name,
          created_at: data[0].created_at.toDate().toDateString(),
          updated_at: data[0].updated_at.toDate().toDateString(),
          mail: data[0].user_mail,
          emailVerified: data[0].user_mail_verified,
          phone: data[0].user_phone,
          age: data[0].user_age,
          town: data[0].user_town,
          photoUrl: null,
        });
      });
    }
  }, []);


  const logOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      navigation.navigate('Login');
    }).catch((error) => {
      console.log(error);
    });
  }


  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>V</Text>otre profil</Text>

      <View style={{marginTop:30}}>
        <View style={{height:200}}>
          {
            user.photoUrl !== null ?
            <Text>Image here</Text>
            :
            <Image style={{borderRadius:1000,width:"50%",height:"100%",padding:0}} resizeMode="contain" source={require('../images/no-pp.png')}/>
            // <Text>Test</Text>
          }
        </View>
        {/* <Text>{JSON.stringify(user)}</Text> */}
        <View>
          <Text style={{fontSize:35,fontFamily:"MontserratBold"}}><Text style={commonStyles.redSpan}>{user.username.substring(0,1)}</Text>{user.username.slice(1)}</Text>
          <View style={{flexDirection:'row'}}>
            <View style={{flexDirection:'row',marginRight:10}}>
              <Icon name="gift-outline" type="ionicon" color={black} size={18}/>
              <Text style={{fontSize:18,fontFamily:"MontserratBold"}}>{user.age !== "N/A" ? user.age : "N/A"} ans</Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Icon name="location-outline" type="ionicon" color={black} size={18}/>
              <Text style={{fontSize:18,fontFamily:"MontserratBold"}}>{user.town !== "N/A" ? user.town : "N/A"}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => logOut()} style={{flexDirection:'row', marginTop:10}}>
            <Icon name="log-out-outline" type="ionicon" size={20} color={red}/>
            <Text style={[commonStyles.redSpan, {fontSize:20}]}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{marginTop:30}}>
        <View style={{flexDirection:'row'}}>
          <Icon name="mail-outline" type="ionicon" color={black} size={18}/>
          <Text style={{fontSize:18,marginLeft:5}}>Adresse mail : <Text style={{fontFamily:"MontserratBold"}}>{user.mail}</Text></Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10}}>
          <Icon name="call-outline" type="ionicon" color={black} size={18}/>
          <Text style={{fontSize:18,marginLeft:5}}>Numéro de téléphone : <Text style={{fontFamily:"MontserratBold"}}>{user.phone !== "" ? user.phone : "Non renseigné"}</Text></Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10}}>
          <Icon name="calendar-outline" type="ionicon" color={black} size={18}/>
          <Text style={{fontSize:18,marginLeft:5}}>Membre depuis le <Text style={{fontFamily:"MontserratBold"}}>{user.created_at}</Text></Text>
        </View>
        <View style={{flexDirection:'row',marginTop:10}}>
          <Icon name="reload-circle-outline" type="ionicon" color={black} size={18}/>
          <Text style={{fontSize:18,marginLeft:5}}>Dernière mise à jour le <Text style={{fontFamily:"MontserratBold"}}>{user.updated_at}</Text></Text>
        </View>
      </View>
    </View>
  )
}
