import { View, Text } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { getGovts, getCities } from '../dataBase/APIFunctions';
import { Picker } from '@react-native-picker/picker';

const Homepage = () => {

  useEffect(() => {
    getGovts().then((data) => {
      setGovts(data);
    });
  },[]);  

  // useEffect(() => {
  //     if (chosenGovt != "") {
  //       getCities(chosenGovt).then((data) => {
  //         setGovt(data);
  //         let cts = govt.cities;
  //         setCities(cts);
  //       });
  //       getGovts(chosenGovt);
  //     }
  //   }
  // ,);

  const govRef = useRef();
  useEffect(() => {
    console.log("useEffect");
    if (chosenGovt != "") {
      getCities(chosenGovt).then((data) => {
        setGovt(data);
        let cts = govt.cities;
        setCities(cts);
      });
      // getGovts(chosenGovt);
    }
  },);

  const [govts, setGovts] = useState([]);
  const [chosenGovt, setChosenGovt] = useState("");
  const [govt, setGovt] = useState([]);
  const [cities, setCities] = useState([]);
  const [chosenCt, setChosenCt] = useState("");

  return (
    <View style={{ flexDirection: 'column', padding: 30 }}>
      <View>
        <Text>Choose a goverment:</Text>
        <Picker 
          ref={govRef}
          selectedValue={chosenGovt}
          onValueChange={(govt, index) => {
            setChosenGovt(govt);
          }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            govts.map((e, index) => {
              return (
                <Picker.Item label={e.id} value={e.id} key={index} />
              );
            })
          }
        </Picker>
      </View>
      <View>
        <Text>Choose a city:</Text>
        <Picker
          selectedValue={chosenCt}
          onValueChange={(city, index) => {
            setChosenCt(city);
          }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            cities && cities.length ? cities.map((e, index) => {
              return (
                <Picker.Item label={e.cityName} value={e.cityName} key={index} />
              )
            }) : null
          }
        </Picker>
      </View>
      <Text>{chosenGovt}</Text>
    </View>
  )
}

export default Homepage