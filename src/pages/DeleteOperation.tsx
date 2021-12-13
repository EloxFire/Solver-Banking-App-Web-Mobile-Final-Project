import React, { useState, useEffect } from 'react';
import { View, Text, Picker } from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { getAuth } from 'firebase/auth';

export default function DeleteOperation(){

  const [operationToDelete, setOperationToDelete] = useState("");


  useEffect(() => {

  }, []);

  return(
    <View style={commonStyles.viewStyle}>
      <Text style={commonStyles.title}><Text style={commonStyles.redSpan}>S</Text>upprimer une opération</Text>

      <View>
        <Text style={commonStyles.textLabel}>Catégorie</Text>
        <View style={commonStyles.formSelect}>
          <Picker onValueChange={(value) => setOperationToDelete(value)}>
            {
              categoriesList.map((cat, index) => {
                return(
                  <Picker.Item key={index} label={`${cat.logo} ${cat.name}`} value={cat.name} />
                )
              })
            }
          </Picker>
        </View>
      </View>
    </View>
  )
}
