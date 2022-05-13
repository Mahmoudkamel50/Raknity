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

const routeName = "Profile";

export { routeName };

export default function Profile({ navigation }) {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        setEmail(user[0].email);
        setPhoneNumber(user[0].phoneNumber);
        setId(user[0].id);
        setFirstName(user[0].firstName);
        setLastName(user[0].lastName);
      });
    });
  }, []);

  return (
    <ScrollView style={{ padding: 30 }}>
      <View style={{ padding: 10 }}>
        <Text>First Name</Text>
        <Text>{firstName}</Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text>Last Name</Text>
        <Text>{lastName}</Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text>E-mail</Text>
        <Text>{email}</Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text>id</Text>
        <Text>{id}</Text>
      </View>

      <View style={{ padding: 10 }}>
        <Text>Phone Number</Text>
        <Text>{phoneNumber}</Text>
      </View>

      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
