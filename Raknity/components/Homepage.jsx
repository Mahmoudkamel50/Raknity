import { View, Text , Button} from 'react-native'
import React, { useEffect, useState } from 'react'
import { getGovts, getGovCities, getCityLocations, getlocpartitions, getAllSlots, submition } from '../dataBase/APIFunctions';
import { Picker } from '@react-native-picker/picker';

const Homepage = () => {

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
        data.partitions.map((e) => {
          console.log(e.partitionName)
        })
      })
    }
  }

  function updateSlotList(id, ctName, locName, partName) {
    if(partName != "") {
      getAllSlots(id, ctName, locName, partName).then((data) => {
        setSlots(data.slots);
        data.slots.map((e) => {
          console.log(e);
        })
      });
    }
  }

  function sumbit(){
    submition(chosenGovt, cities, citiesIndex, locIndex, partIndex, slotIndex);
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
            setCitiesIndex(index-1);
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
            setLocIndex(index-1);
          }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            locations && locations.length ? locations.map((e, index) => {
              return (
                <Picker.Item label={e.locationName} value={e.locatioName} key={index} />
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
            setPartIndex(index-1);
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
          setSlotIndex(index-1);
        }}
        >
          <Picker.Item label='Nothing selected' value={""} />
          {
            slots && slots.length ? slots.map((e, index) => {
              if(e == false) {
                return (
                  <Picker.Item label={index} value={e} key={index}/>
                )
              }
            }) : null
          }
        </Picker>
      </View>
      <Text>{chosenGovt}</Text>
      <Text>{chosenCt}</Text>
      <Text>{chosenLoc}</Text>
      <Text>{chosenPart}</Text>
      <Button 
      title='Submit'
      onPress={() => 
        sumbit()}
      />
    </View>
  )
}

export default Homepage