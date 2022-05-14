import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import { getUsers } from "../dataBase/user";
import { getUserUId } from "../dataBase/authorization";
import { getUserById } from "../dataBase/user";
import { useState, useEffect } from "react";
import * as React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../dataBase/authorization";

const routeName = "Profile";

export { routeName };

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        setEmail(user[0].email);
        setPhoneNumber(user[0].phoneNumber);
        setFirstName(user[0].firstName);
        setLastName(user[0].lastName);
      });
    });
  }, []);

  return (
    <View>
    <ScrollView style={{ padding: 30 }}>
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
        <Text style={styles.title}>Phone Number:</Text>
        <Text style={styles.info}>{phoneNumber}</Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
    <View style={{alignItems:"center"}}>
      <Icon.Button
        name="sign-out"
        onPress={() => {logout()}}
        backgroundColor={'#3ded97'}
        borderRadius={40}
        >
        <Text>Log out</Text>
      </Icon.Button>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 5,
  },
  info:{
    fontSize: 16,
    padding: 10,
  }
});
