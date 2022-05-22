import { View, Text, Button, StyleSheet, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getGovts,
  getGovCities,
  getCityLocations,
  submition,
  getURL,
} from "../dataBase/APIFunctions";
import { Picker } from "@react-native-picker/picker";
import {
  addToUserHistory,
  checkPendingHistory,
  getUserById,
} from "../dataBase/user";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from 'expo-status-bar';

const Homepage = ({ user, navigation }) => {

  useEffect(() => {
    getGovts().then((data) => {
      setGovts(data);
    });
    getUserById(user.uid).then((data) => {
      setFirstName(data[0].firstName);
    });
  }, []);

  function updateCitiesList(govt) {
    if (govt != "") {
      getGovCities(govt).then((data) => {
        setCities(data.cities);
        data.cities.map((e) => {
          console.log(e.cityName);
        });
      });
    }
  }

  function updateLocationsList(id, loc) {
    if (loc != "") {
      getCityLocations(id, loc).then((data) => {
        setLocations(data.locations);
        data.locations.map((e) => {
          console.log(e.locationName);
        });
      });
    }
  }

  async function sumbit() {
    const sub = await submition(chosenGovt, cities, citiesIndex, locIndex, user.uid);
    setFlag(sub.flag);
    setPartName(sub.partName);
    setSlotIndex(sub.slotNum);
    return sub;
  }

  async function addToHistory(part, slot, flag) {
    console.log('Values', partName, slotIndex);
    console.log('flag', flag);
    if (flag == true) {
      addToUserHistory(
        user.uid,
        chosenGovt,
        chosenCt,
        chosenLoc,
        part,
        slot,
        await getURL(chosenGovt, chosenCt, chosenLoc),
      );
    }
  }

  function FinalModal() {
    console.log(flag);
    if (flag == true) {
      console.log(flag);
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Icon
                name="check"
                size={30}
                color='#3ded97'
              />
              <Text style={{ color: '#3ded97', fontSize: 20, fontWeight: 'bold' }}>Booked successfully!</Text>
              <Text style={{ fontSize: 16 }}>Your booked place is {partName}{slotIndex}</Text>
              <View style={{ paddingTop: 20 }}>
                <Icon.Button
                  name="check"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    navigation.navigate('Your Places');
                  }}
                  borderRadius={40}
                  backgroundColor={'#3ded97'}
                >
                  <Text>Done</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
        </Modal>
      )
    }
    if (flag == false) {
      return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Icon
                name="remove"
                size={30}
                color='#f00'
              />
              <Text style={{ color: '#f00', fontSize: 20, fontWeight: 'bold' }}>Booking failed!</Text>
              <Text style={{ fontSize: 16 }}>Try again later or choose a different location</Text>
              <View style={{ paddingTop: 20 }}>
                <Icon.Button
                  name="remove"
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    setChosenLoc("");
                  }}
                  borderRadius={40}
                  backgroundColor={'#ff5c5c'}
                >
                  <Text>Close</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
        </Modal>
      )
    }
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [flag, setFlag] = useState(null)
  const [firstName, setFirstName] = useState("");
  const [govts, setGovts] = useState([]);
  const [chosenGovt, setChosenGovt] = useState("");
  const [cities, setCities] = useState([]);
  const [chosenCt, setChosenCt] = useState("");
  const [locations, setLocations] = useState([]);
  const [chosenLoc, setChosenLoc] = useState("");
  const [partName, setPartName] = useState("");
  const [slotIndex, setSlotIndex] = useState("");
  const [citiesIndex, setCitiesIndex] = useState("");
  const [locIndex, setLocIndex] = useState("");
  const [url, setUrl] = useState("");

  return (
    <View style={{ flex: 1, padding: 30, backgroundColor: '#151e3d' }}>
      {flag != null ? <FinalModal /> : null}
      <Text style={styles.welcome}>Hi, {firstName}</Text>
      <Text style={{ fontSize: 20, paddingBottom: 5, color: '#fff' }}>Start your booking</Text>
      <View style={styles.pckView}>
        <Text style={styles.textStyle}>Choose a government:</Text>
        <Picker
          selectedValue={chosenGovt}
          onValueChange={(govt, index) => {
            setChosenGovt(govt);
            updateCitiesList(govt);
          }}
          style={styles.pck}
          mode='dropdown'
        >
          <Picker.Item label="Nothing selected" value={""} />
          {govts.map((e, index) => {
            return <Picker.Item label={e.id} value={e.id} key={index} />;
          })}
        </Picker>
      </View>
      <View style={styles.pckView}>
        <Text style={styles.textStyle}>Choose a city:</Text>
        <Picker
          selectedValue={chosenCt}
          onValueChange={(city, index) => {
            setChosenCt(city);
            updateLocationsList(chosenGovt, city);
            setCitiesIndex(index - 1);
          }}
          style={styles.pck}
          mode='dropdown'
        >
          <Picker.Item label="Nothing selected" value={""} />
          {cities && cities.length
            ? cities.map((e, index) => {
              return (
                <Picker.Item
                  label={e.cityName}
                  value={e.cityName}
                  key={index}
                />
              );
            })
            : null}
        </Picker>
      </View>
      <View style={styles.pckView}>
        <Text style={styles.textStyle}>Choose location:</Text>
        <Picker
          selectedValue={chosenLoc}
          onValueChange={async (loc, index) => {
            setChosenLoc(loc);
            setLocIndex(index - 1);
          }}
          style={styles.pck}
          mode='dropdown'
        >
          <Picker.Item label="Nothing selected" value={""} />
          {locations && locations.length
            ? locations.map((e, index) => {
              return (
                <Picker.Item
                  label={e.locationName}
                  value={e.locationName}
                  key={index}
                />
              );
            })
            : null}
        </Picker>
      </View>
      <View>
        <View style={styles.BTview}>
          <Icon.Button
            name="plus"
            onPress={async () => {
              if (await checkPendingHistory(user.uid)) {
                alert(
                  "You have pending bookings or you haven't checked out. Check 'Your Places' page"
                );
              } else {
                const submValues = await sumbit();
                addToHistory(submValues.partName, submValues.slotNum, submValues.flag);
                setModalVisible(true);
              }
            }}
            backgroundColor={"#3ded97"}
            borderRadius={40}
          >
            <Text>Submit</Text>
          </Icon.Button>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default Homepage;

const styles = StyleSheet.create({
  BTview: {
    alignItems: "center",
    paddingTop: 10,
  },
  pck: {
    paddingVertical: 5,
    borderRadius: 40,
    backgroundColor: "#c7ffc7",
  },
  textStyle: {
    fontSize: 16,
    paddingVertical: 5,
    color: '#fff'
  },
  pckView: {
    paddingBottom: 10,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    color: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})
