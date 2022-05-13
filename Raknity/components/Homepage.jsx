import { View, Text } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { getGovts, getCities } from '../dataBase/APIFunctions';
import { Picker } from '@react-native-picker/picker';

const Homepage = () => {

  useEffect(() => {
    getGovts().then((data) => {
      setGovts(data);
    });
  }, []);

  function updateCitiesList(govt) {
    if (govt != "") {
      getCities(govt).then((data) => {
        setCities(data.cities);
        data.cities.map((e) => {
          console.log(e.cityName);
        })
      })
    }
  }

  const [govts, setGovts] = useState([]);
  const [chosenGovt, setChosenGovt] = useState("");
  const [govt, setGovt] = useState([]);
  const [cities, setCities] = useState([]);
  const [chosenCt, setChosenCt] = useState("");
  const [ctpickerval, setCtpickerval] = useState("");

  return (
    <View style={{ flexDirection: 'column', padding: 30 }}>
      <View>
        <Text>Choose a goverment:</Text>
        <Picker
          selectedValue={chosenGovt}
          onValueChange={(govt, index) => {
            setChosenGovt(govt);
            updateCitiesList(govt);
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
      <Text>{chosenCt}</Text>
    </View>
  )
}

export default Homepage