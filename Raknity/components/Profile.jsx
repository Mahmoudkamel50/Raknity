import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { getUserUId } from "../dataBase/authorization";
import { getUserById } from "../dataBase/user";
import { useState, useEffect } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../dataBase/authorization";
import { subscribe } from "../dataBase/APIFunctions";

const routeName = "Profile";

export { routeName };

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [wallet, setWallet] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        getUserUId().then((id) => {
          console.log(id);
          getUserById(id).then((user) => {
            setEmail(user[0].email);
            setPhoneNumber(user[0].phoneNumber);
            setFirstName(user[0].firstName);
            setLastName(user[0].lastName);
            setWallet(user[0].wallet);
          });
        });
      }
      if (change.type === "modified") {
        getUserUId().then((id) => {
          console.log(id);
          getUserById(id).then((user) => {
            setEmail(user[0].email);
            setPhoneNumber(user[0].phoneNumber);
            setFirstName(user[0].firstName);
            setLastName(user[0].lastName);
            setWallet(user[0].wallet);
          });
        });
      }
      if (change.type === "removed") {
        getUserUId().then((id) => {
          console.log(id);
          getUserById(id).then((user) => {
            setEmail(user[0].email);
            setPhoneNumber(user[0].phoneNumber);
            setFirstName(user[0].firstName);
            setLastName(user[0].lastName);
            setWallet(user[0].wallet);
          });
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      setId(id);
      getUserById(id).then((user) => {
        setEmail(user[0].email);
        setPhoneNumber(user[0].phoneNumber);
        setFirstName(user[0].firstName);
        setLastName(user[0].lastName);
        setWallet(user[0].wallet);
      });
    });
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 10 }}>
        <View style={{ padding: 10 }}>
          <Text style={styles.title}>First Name:</Text>
          <Text style={styles.info}>{firstName}</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Last Name:</Text>
          <Text style={styles.info}>{lastName}</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>E-mail:</Text>
          <Text style={styles.info}>{email}</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Wallet:</Text>
          <Text style={styles.info}>{wallet} EGP</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Phone Number:</Text>
          <Text style={styles.info}>{phoneNumber}</Text>
        </View>

        <View style={{ padding: 10 }}>
          <Text style={styles.title}>Your ID:</Text>
          <Text style={styles.info}>{id}</Text>
        </View>

        <StatusBar style="auto" />
      </ScrollView>
      <View style={{ flexDirection: "row", justifyContent: "space-around" , padding: 20 }}>
        <View style={{ alignItems: "center" }}>
          <Icon.Button
            name="edit"
            onPress={() => {
              navigation.navigate("Edit profile", { id: id, firstName: firstName, lastName: lastName, phone: phoneNumber });
            }}
            backgroundColor={'#3ded97'}
            borderRadius={40}
          >
            <Text>Edit your profile</Text>
          </Icon.Button>
        </View>
        <View style={{ alignItems: "center" }}>
          <Icon.Button
            name="sign-out"
            onPress={() => { logout() }}
            backgroundColor={'#3ded97'}
            borderRadius={40}
          >
            <Text>Log out</Text>
          </Icon.Button>
        </View>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#151e3d',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
    color: '#fff',
  },
  info: {
    fontSize: 16,
    padding: 10,
    color: '#fff',
  }
});
