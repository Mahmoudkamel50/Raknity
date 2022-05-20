import { StyleSheet, Text, View, ScrollView, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { getUserHistory } from "../dataBase/user";
import * as WebBrowser from "expo-web-browser";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  checkIn,
  subscribe,
  checkout,
  deductFromWallet,
  cancel,
} from "../dataBase/APIFunctions";
import QRCode from "react-native-qrcode-svg";

const YourPlaces = ({ user }) => {
  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getUserHistory(user.uid).then((data) => {
          setHistory(data);
        });
      }
      if (change.type === "modified") {
        getUserHistory(user.uid).then((data) => {
          setHistory(data);
        });
      }
      if (change.type === "removed") {
        getUserHistory(user.uid).then((data) => {
          setHistory(data);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUserHistory(user.uid).then((data) => {
      setHistory(data);
    });
  }, []);

  function openLink(url) {
    WebBrowser.openBrowserAsync(url);
  }

  const [history, setHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <QRCode
              value={user.uid}
              size={200}
              color='#151e3d'
            />
            <View style={{paddingTop: 20}}>
              <Icon.Button
                name="eye-slash"
                onPress={() => setModalVisible(!modalVisible)}
                borderRadius={40}
                backgroundColor={'#3ded97'}
              >
                <Text>Hide QR code</Text>
              </Icon.Button>
            </View>
          </View>
        </View>
      </Modal>
      <Text style={styles.titles}>Pending bookings:</Text>
      <ScrollView>
        {history.map((e, index) => {
          console.log(e.bookingTime);
          if (e.status == "pending") {
            return (
              <View key={index} style={{ alignItems: "center" }}>
                <View>
                  <Text style={styles.locations}>
                    {e.government}, {e.cityName}, {e.locationName},{" "}
                    {e.partitionName}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={styles.btView}>
                    <Icon.Button
                      name="send"
                      onPress={() => {
                        openLink(e.url);
                      }}
                      backgroundColor={"#3ded97"}
                      borderRadius={40}
                    >
                      <Text>Navigate</Text>
                    </Icon.Button>
                  </View>
                  <View style={styles.btView}>
                    <Icon.Button
                      name="qrcode"
                      onPress={() => {
                        console.log(user.uid, index);
                        setModalVisible(true);
                      }}
                      backgroundColor={"#3ded97"}
                      borderRadius={40}
                    >
                      <Text>Show QR code</Text>
                    </Icon.Button>
                  </View>

                  <View style={styles.btView}>
                    <Icon.Button
                      name="remove"
                      onPress={() => {
                        cancel(
                          user.uid,
                          index,
                          e.government,
                          e.cityName,
                          e.locationName,
                          e.partitionName,
                          e.slot
                        );
                      }}
                      backgroundColor={"#3ded97"}
                      borderRadius={40}
                    >
                      <Text>Cancel</Text>
                    </Icon.Button>
                  </View>
                </View>
              </View>
            );
          }
        })}
      </ScrollView>
      <Text style={styles.titles}>Checked in bookings:</Text>
      <ScrollView>
        {history.map((e, index) => {
          if (e.status == "Checked In") {
            return (
              <View key={index} style={{ alignItems: "center" }}>
                <View>
                  <Text style={styles.locations}>
                    {e.government}, {e.cityName}, {e.locationName},{" "}
                    {e.partitionName}
                  </Text>
                </View>
                <View style={styles.btView}>
                    <Icon.Button
                      name="qrcode"
                      onPress={() => {
                        console.log(user.uid, index);
                        setModalVisible(true);
                      }}
                      backgroundColor={"#3ded97"}
                      borderRadius={40}
                    >
                      <Text>Show QR code</Text>
                    </Icon.Button>
                  </View>
              </View>
            );
          }
        })}
      </ScrollView>

      <Text style={styles.titles}>Your previous bookings:</Text>
      <ScrollView>
        {history.map((e, index) => {
          if (e.status == "Checked out") {
            return (
              <View key={index}>
                <Text style={styles.locations}>
                  {e.government}, {e.cityName}, {e.locationName},{" "}
                  {e.partitionName}
                </Text>
              </View>
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

export default YourPlaces;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#151e3d',
    flex: 1,
  },
  titles: {
    fontSize: 20,
    padding: 5,
    color: '#fff'
  },
  locations: {
    fontSize: 16,
    padding: 10,
    color: '#fff'
  },

  btView: {
    alignItems: "center",
    paddingHorizontal: 3,
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
});
