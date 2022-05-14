import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { register, getUserUId } from "../dataBase/authorization";
import { addUser, getUserById } from "../dataBase/user";
import SignIn from "./SignIn";

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [history, setHistory] = useState([]);

  function registerUser() {
    if (email === "" || password === "") {
      alert("email or password is empty!");
    } else {
      register(email, password)
        .then(() => {
          console.log(getUserUId());

          getUserUId().then((id) => {
            addUser({
              id: id,
              email: email,
              firstName: firstName,
              lastName: lastName,
              phoneNumber: phoneNumber,
              history: history,
            });
          });
          navigation.navigate("Sign in");
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputs}>
          <Text style={styles.text}>First Name:</Text>
          <TextInput
            placeholder={"Enter your First Name"}
            onChangeText={setFirstName}
            textAlign="center"
            style={styles.textInputs}
          />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.text}>Last Name:</Text>
          <TextInput
            placeholder={"Enter your Last Name"}
            onChangeText={setLastName}
            textAlign="center"
            style={styles.textInputs}
          />
        </View>

        <View style={styles.inputs}>
          <Text style={styles.text}>Email:</Text>
          <TextInput
            placeholder={"Enter your email"}
            onChangeText={setEmail}
            value={email}
            textAlign="center"
            style={styles.textInputs}
          />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.text}>Password:</Text>
          <TextInput
            placeholder={"Enter your Password"}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            textAlign="center"
            style={styles.textInputs}
          />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.text}>Confirm Password:</Text>
          <TextInput
            placeholder={"Enter your Password again"}
            secureTextEntry={true}
            textAlign="center"
            style={styles.textInputs}
          />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.text}>Phone:</Text>
          <TextInput
            placeholder={"Enter your Phone"}
            onChangeText={setPhoneNumber}
            textAlign="center"
            style={styles.textInputs}
          />
        </View>

        <View style={styles.buttonview}>
          <Button title={"Create Account"} onPress={registerUser} color="#3ded97"/>
        </View>

        <StatusBar style="auto" />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 30,
    flex: 1,
  },
  inputs: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 40,
    width: "97%",

  },
  text: {
    fontSize: 16,
    paddingRight: 10,
  },
  textInputs: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    borderRadius: 40,
    padding: 5,
    width: 100,

  },
  buttonview: {
    alignItems: "center",
  },
});
