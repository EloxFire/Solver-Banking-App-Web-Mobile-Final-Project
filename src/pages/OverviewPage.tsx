import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { commonStyles } from '../styles/commonStyles';
import { overviewStyles } from '../styles/overviewStyles';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { getFirestore, doc, getDocs, collection, query, where, orderBy, limit, firestore } from "firebase/firestore";
import { red } from '../styles/variables';
import ExpensesLite from '../components/ExpenseLite';
import HandleExpenseButton from '../components/HandleExpenseButton';
import { balanceCalculator } from '../utils/balance_calculator';

export default function OverviewPage({ navigation } : any) {

  // const [user, setUser] = useState({username:"Loading"});
  const [user, setUser] = useState({
    user_uuid: "Chargement",
    user_display_name: "Chargement",
    created_at: "Chargement",
    updated_at: "Chargement",
    user_mail: "Chargement",
    user_mail_verified: "Chargement",
    user_phone: "Chargement",
    user_age: "Chargement",
    user_town: "Chargement",
    user_photoUrl: null,
  });
  const [userData, setUserData] = useState([]);
  const [userOperations, setUserOperations] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [balance, setBalance] = useState("0");

  const monthsList = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];


  // useEffect(() => {
  //   const auth = getAuth();
  //   const db = getFirestore();
  //   const uid = auth.currentUser.uid;
  //
  //   getUser(db, uid);
  // }, []);
  //
  // const getUser = async (dbInstance, userId) => {
  //   const q = query(collection(dbInstance, "users"), where("user_auth_uid", "==", userId));
  //
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log("IN SNAP DATA :", doc.data());
  //   });
  // }
  //
  // const getAllUserOperations = async (dbInstance, userId) => {
  //
  // }
  //
  // const getAllUserIncomes = async (dbInstance, userId) => {
  //
  // }
  //
  // const getAllUserExpenses = async (dbInstance, userId) => {
  //
  // }



  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const currentUser = auth.currentUser;
  //       const db = getFirestore();
  //       const usersRef = collection(db, 'users');
  //       const uid = user.uid;
  //
  //       const q1 = query(usersRef,
  //         where("user_auth_id", "==", uid)
  //       );
  //
  //       getDocs(q1)
  //       .then((response) => {
  //         const data = response.docs.map((doc, index) => {
  //           return doc.data();
  //         });
  //         console.log("PROFILE GET :", data[0]);
  //         setUser({
  //           uuid: data[0].user_auth_uid,
  //           username: data[0].user_display_name,
  //           created_at: data[0].created_at.toDate().toDateString(),
  //           updated_at: data[0].updated_at.toDate().toDateString(),
  //           mail: data[0].user_mail,
  //           emailVerified: emailVerified,
  //           phone: data[0].user_phone,
  //           age: data[0].user_age,
  //           town: data[0].user_town,
  //           photoUrl: null,
  //         });
  //       });
  //     }
  //   });
  // })


  // useEffect(() => {
  //   const auth = getAuth();
  //
  //   let uid, emailVerified;
  //   if (currentUser !== null) {
  //     uid = currentUser.uid;
  //     emailVerified = currentUser.emailVerified;
  //
  //
  //
  //   }
  // }, []);


  // useEffect(() => {
  //   getUser();
  // }, []);
  //
  // const getUser = async () => {
  //   const auth = getAuth();
  //   const uid = auth.currentUser;
  //   try {
  //     const documentSnapshot = await firestore()
  //     .collection('users')
  //     .doc(uid)
  //     .get();
  //     const userData = documentSnapshot.data();
  //     console.log('===============>data', userData);
  //     // setFirstname(userData.FirstName);
  //     // setLastname(userData.LastName);
  //     // setEmail(userData.Email);
  //     // setPassword(userData.Password);
  //     // setPhone(userData.Phone);
  //     // setPostal(userData.Postaladdress);
  //     // setGender(userData.selectedValue);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   const db = getFirestore();
  //   const getUser = async () => {
  //     const data = await getDocs(collection(db, "users"));
  //     const temp = data.docs.map((doc) => {
  //       const user = {
  //         //set properties
  //       };
  //       return user;
  //     });
  //     setBooks(temp);
  //   };
  //
  //   getUser();
  // }, []);

  // useEffect(() => {
  //   getUser();
  // }, [])
  //
  // const getUser = async () => {
  //   const db = getFirestore();
  //   const auth = getAuth();
  //   const currentUser = auth.currentUser;
  //   const usersRef = collection(db, 'users');
  //   const loggedUserQuery = query(usersRef,
  //     where("user_auth_id", "==", currentUser.uid)
  //   );
  //
  //   getDocs(loggedUserQuery)
  //   .then((response) => {
  //     const data = response.docs.map((doc, index) => {
  //       return doc.data();
  //     });
  //
  //     console.log("DATA OVERVIEW :", data);
  //
  //     setUser({
  //       uuid: data[0].user_auth_uid,
  //       username: data[0].user_display_name,
  //       created_at: data[0].created_at.toDate(),
  //       updated_at: data[0].updated_at.toDate(),
  //       mail: data[0].user_mail,
  //       emailVerified: emailVerified,
  //       phone: data[0].user_phone,
  //       age: data[0].user_age,
  //       town: data[0].user_town,
  //       photoUrl: null,
  //     })
  //   })
  // }

  // useEffect(() => {
  //   const auth = getAuth();
  //   const currentUser = auth.currentUser;
  //   const db = getFirestore();
  //   const usersRef = collection(db, 'users');
  //
  //   const getUser = async () => {
  //     const data = await getDocs(usersRef);
  //     const temp = data.docs.map((doc) => {
  //       const user = {
  //         uuid: data.user_auth_uid,
  //         username: data.user_display_name,
  //         created_at: data.created_at.toDate(),
  //         updated_at: data.updated_at.toDate(),
  //         mail: data.user_mail,
  //         emailVerified: emailVerified,
  //         phone: data.user_phone,
  //         age: data.user_age,
  //         town: data.user_town,
  //         photoUrl: null,
  //       }
  //       return user;
  //     });
  //     setUser(temp);
  //   };
  //
  //   getUser();

  // const loggedUserQuery = query(usersRef,
  //   where("user_auth_id", "==", currentUser.uid)
  // );
  //
  // getDocs(loggedUserQuery)
  // .then((response) => {
  //   const data = response.docs.map((doc, index) => {
  //     return doc.data();
  //   });
  //   setUser(data);
  // })
  // }, []);



  // useEffect(() => {
  //   const auth = getAuth();
  //   const currentUser = auth.currentUser;
  //   const db = getFirestore();
  //   const usersRef = collection(db, 'users');
  //
  //   let uid, emailVerified;
  //   if (currentUser !== null) {
  //     uid = currentUser.uid;
  //     console.log("UID OVERVIEW PAGE :", uid);
  //     emailVerified = currentUser.emailVerified;
  //     const q1 = query(usersRef,
  //       where("user_auth_id", "==", uid)
  //     );
  //
  //     getDocs(q1)
  //     .then((response) => {
  //       const data = response.docs.map((doc, index) => {
  //         return doc.data();
  //       });
  //
  //       if(data.length !== 0){
  //         console.log("DATA GET :", data);
  //         console.log("PROFILE GET :", data[0]);
  //         setUserData(data);
  //       }
  //     });
  //   }
  // }, []);

  // useEffect(() => {
  //   setUser({
  //     uuid: userData[0].user_auth_uid,
  //     username: userData[0].user_display_name,
  //     created_at: userData[0].created_at.toDate(),
  //     updated_at: userData[0].updated_at.toDate(),
  //     mail: userData[0].user_mail,
  //     emailVerified: emailVerified,
  //     phone: userData[0].user_phone,
  //     age: userData[0].user_age,
  //     town: userData[0].user_town,
  //     photoUrl: null,
  //   });
  // }, [userData]);

  // useEffect(() => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   let displayName, email, photoURL, emailVerified, phone, uid;
  //   if (user !== null) {
  //     displayName = user.displayName;
  //     email = user.email;
  //     photoURL = user.photoURL;
  //     emailVerified = user.emailVerified;
  //     phone = user.phoneNumber;
  //     uid = user.uid;
  //
  //     setUser({
  //       uuid: uid,
  //       username: displayName,
  //       mail: email,
  //       emailVerified: emailVerified,
  //       phone: phone,
  //     });
  //   }
  // },

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let uid;
    if (currentUser !== null) {
      uid = currentUser.uid;
    }

    const db = getFirestore();
    const operationsRef = collection(db, 'users');
    //GET ALL OPERATIONS REGISTERED
    const q1 = query(operationsRef,
      where("user_uuid", "==", uid)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      setUser(data[0]);
    });
  }, []);


  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let uid;
    if (currentUser !== null) {
      uid = currentUser.uid;
    }

    console.log("UID OPERATIONS GETTING OVERVIEW ", uid);

    const db = getFirestore();
    const operationsRef = collection(db, 'operations');
    //GET ALL OPERATIONS REGISTERED
    const q1 = query(operationsRef,
      where("user_uid", "==", uid),
      orderBy("operation_date", "asc"),
      limit(4)
    );

    getDocs(q1)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      setUserOperations(data);
    });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    let uid;
    if (currentUser !== null) {
      uid = currentUser.uid;
    }
    const db = getFirestore();
    const operationsRef = collection(db, 'operations');

    // For month range
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0);

    // GET CURRENT MONTH EXPENSES
    const q2 = query(operationsRef,
      where("user_uid", "==", uid),
      where('operation_date', ">=", firstDay),
      where('operation_date', "<=", lastDay),
      where('operation_state', "==", false)
    );

    // GET CURRENT MONTH INCOMES
    const q3 = query(operationsRef,
      where("user_uid", "==", uid),
      where('operation_date', ">=", firstDay),
      where('operation_date', "<=", lastDay),
      where('operation_state', "==", true)
    );

    // Getting user current month total amount
    getDocs(q2)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      // console.log(data);
      const amounts = data.map((item, index) => {
        return item.operation_amount;
      })
      // console.log("Expenses :", amounts);
      setMonthlyExpenses(amounts);
    });

    // Getting user current month total amount
    getDocs(q3)
    .then((response) => {
      const data = response.docs.map((doc, index) => {
        return doc.data();
      });
      const amounts = data.map((item, index) => {
        return item.operation_amount;
      })
      // console.log("Incomes :", amounts);
      setMonthlyIncomes(amounts);
    });
  }, []);

  useEffect(() => {
    // CALCULATING TOTAL BALANCE
    setBalance(balanceCalculator(monthlyExpenses, monthlyIncomes))
    console.log(user);
  }, [monthlyExpenses, monthlyIncomes]);

  return (
    <View style={commonStyles.viewStyle}>
      <Text>{JSON.stringify(user)}</Text>
      <Text style={overviewStyles.title}><Text style={commonStyles.redSpan}>B</Text>onjour {user.user_display_name !== undefined ? user.user_display_name.split(' ')[0] : ""} !</Text>

      <View style={overviewStyles.balanceContainer}>
        <View>
          <Text style={overviewStyles.balanceTitle}><Text style={commonStyles.redSpan}>V</Text>os dépenses de {monthsList[new Date().getMonth().toString().toLowerCase()]}</Text>
          <Text style={overviewStyles.balancePrice}>{balance} <Text style={commonStyles.redSpan}>€</Text></Text>
        </View>
      </View>

      <View style={overviewStyles.expensesContainer}>
        <Text style={overviewStyles.exepensesContainerTitle}><Text style={commonStyles.redSpan}>A</Text>perçu rapide</Text>

        {
          userOperations.length === 0 ?
          <View style={overviewStyles.addExpenseContainer}>
            <Text style={overviewStyles.noExpensesText}>Aucune opération enregistrée.</Text>
            <TouchableOpacity onPress={() => navigation.navigate("AddOperation")} style={overviewStyles.addExpenseTextButton}>
              <Icon name="add-outline" type="ionicon" color={red}/>
              <Text style={overviewStyles.addExpenseText}>Ajouter une opération</Text>
            </TouchableOpacity>
          </View>
          :
          userOperations.map((operation, index) => {
            return(
              <ExpensesLite
                key={`operation-lite-${index}`}
                topBorder={index === 0 ? true : false}
                title={operation.operation_name}
                date={operation.operation_date.toDate().toLocaleDateString('fr-FR')}
                hour={operation.operation_date.toDate().toLocaleTimeString('fr-FR')}
                state={operation.operation_state}
                amount={operation.operation_amount}
              />
            )
          })
        }
      </View>

      <View style={overviewStyles.seeMoreContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('OperationList')}>
          <Text style={overviewStyles.seeMoreText}>Voir plus ></Text>
        </TouchableOpacity>
      </View>

      <View style={overviewStyles.handleExpensesContainer}>
        <Text style={overviewStyles.handleExpensesTitle}><Text style={commonStyles.redSpan}>G</Text>érer les opérations :</Text>

        <View style={overviewStyles.handleExpensesChoisesContainer}>
          <HandleExpenseButton icon="trash-outline" route="DeleteOperation"/>
          <HandleExpenseButton icon="add-outline" route="AddOperation"/>
          <HandleExpenseButton icon="share-social-outline" share/>
        </View>
      </View>
    </View>
  );
}
