import { View, Text, Button, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getGovts, getGovCities, getCityLocations, getlocpartitions, getAllSlots, submition } from '../dataBase/APIFunctions';
import { Picker } from '@react-native-picker/picker';
import { addToUserHistory } from '../dataBase/user';
import Icon from "react-native-vector-icons/FontAwesome";

const Homepage = ({user}) => {

  useEffect(() => {
    getGovts().then((data) => {
      setGovts(data);
    });
  }, []);

  function updateCitiesList(govt) {
    if (govt != "") {
      getGovCities(govt).then((data) => {
        setCities(data.cities);
        data.cities.map((e) => {
          console.log(e.cityName);
        })
      });
    }
  }

  function updateLocationsList(id, loc) {
    if (loc != "") {
      getCityLocations(id, loc).then((data) => {
        setLocations(data.locations);
        data.locations.map((e) => {
          console.log(e.locationName)
        })
      })
    }
  }

  function updatePartitionsList(id, ctName, locName) {
    if (locName != "") {
      getlocpartitions(id, ctName, locName).then((data) => {
        setPartitions(data.partitions);
        setUrl(data.url);
        data.partitions.map((e) => {
          console.log(e.partitionName)
        })
      })
    }
  }

  function updateSlotList(id, ctName, locName, partName) {
    if (partName != "") {
      getAllSlots(id, ctName, locName, partName).then((data) => {
        setSlots(data.slots);
        data.slots.map((e) => {
          console.log(e);
        })
      });
    }
  }

  function sumbit() {
    submition(chosenGovt, cities, citiesIndex, locIndex, partIndex, slotIndex);
  }

  function addToHistory() {
    addToUserHistory(user.uid, chosenGovt, chosenCt, chosenLoc, chosenPart, slotIndex, url);
  }

  const [govts, setGovts] = useState([]);
  const [chosenGovt, setChosenGovt] = useState("");
  const [cities, setCities] = useState([]);
  const [chosenCt, setChosenCt] = useState("");
  const [locations, setLocations] = useState([]);
  const [chosenLoc, setChosenLoc] = useState("");
  const [partitions, setPartitions] = useState([]);
  const [chosenPart, setChosenPart] = useState("");
  const [slots, setSlots] = useState([]);
  const [chosenSlot, setChosenSlot] = useState("");
  const [slotIndex, setSlotIndex] = useState("");
  const [citiesIndex, setCitiesIndex] = useState("");
  const [locIndex, setLocIndex] = useState("");
  const [partIndex, setPartIndex] = useState("");
  const [url, setUrl] = useState("");


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
            updateLocationsList(chosenGovt, city);
            setCitiesIndex(index - 1);
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
      <View>
        <Text>Choose location:</Text>
        <Picker
          selectedValue={chosenLoc}
          onValueChange={(loc, index) => {
            setChosenLoc(loc);
            updatePartitionsList(chosenGovt, chosenCt, loc);
            setLocIndex(index - 1);
          }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            locations && locations.length ? locations.map((e, index) => {
              return (
                <Picker.Item label={e.locationName} value={e.locationName} key={index} />
              )
            }) : null
          }
        </Picker>
      </View>
      <View>
        <Text>Choose a Partition:</Text>
        <Picker
          selectedValue={chosenPart}
          onValueChange={(part, index) => {
            setChosenPart(part);
            updateSlotList(chosenGovt, chosenCt, chosenLoc, part);
            setPartIndex(index - 1);
          }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            partitions && partitions.length ? partitions.map((e, index) => {
              return (
                <Picker.Item label={e.partitionName} value={e.partitionName} key={index} />
              )
            }) : null
          }
        </Picker>
      </View>
      <View>
        <Text>Choose parking slot:</Text>
        <Picker
          selectedValue={chosenSlot}
          onValueChange={(slot, index) => {
            setChosenSlot(slot);
            setSlotIndex(index - 1);
          }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            slots && slots.length ? slots.map((e, index) => {
              if (e == false) {
                return (
                  <Picker.Item label={index} value={e} key={index} />
                )
              }
              else {
                return (
                  <Picker.Item label={index + " Occupied"} value={""} key={index} />
                )
              }
            }) : null
          }
        </Picker>
      </View>
      <View style={styles.BTview}>
        <Icon.Button
          name='plus'
          onPress={() => {
            sumbit();
            addToHistory();
          }}
          backgroundColor={'#3ded97'}
          borderRadius={40}
        >
          <Text>
            Submit
          </Text>
        </Icon.Button>
      </View>
    </View>
  )
}

export default Homepage

const styles = StyleSheet.create({
  BTview: {
    alignItems: 'center',
  }
})