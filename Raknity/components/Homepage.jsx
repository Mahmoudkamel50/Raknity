import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getGovts } from '../dataBase/APIFunctions';
import {Picker} from '@react-native-picker/picker';

const Homepage = () => {

  useEffect(() => {
    getGovts().then((data) => {
      setGovts(data);
    })
  }, [])
  
  const [govts, setGovts] = useState([]);
  const [chosenGovt, setChosenGovt] = useState("");

  return (
    <View style={{flexDirection: 'row'}}>
      <Text>Choose a goverment:</Text>
      <Picker
        selectedValue={chosenGovt}
        onValueChange={(govt, index) => {
          setChosenGovt(govt);
        }}
      >
        <Picker.Item label='Nothing selected' value={""}/>
        {
          govts.map((e, index) => {
            return (
              <Picker.Item label={e.id} value={e.id} key={index}/>
            );
          })
        }
      </Picker>
    </View>
  )
}

export default Homepage