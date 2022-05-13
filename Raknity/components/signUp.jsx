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
  const [lastName, setLasttName] = useState("");
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
            // console.log(id);
            addUser({
              id: id,
              email,
              firstName,
              lastName,
              phoneNumber,
              history,
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
        <View style={styles.firstnameInput}>
          <Text style={styles.text}>First Name:</Text>
          <TextInput
            placeholder={"Enter your First Name"}
            textAlign="center"
            style={styles.textInputsname}
          />
        </View>
        <View style={styles.lastnameinput}>
          <Text style={styles.text}>Last Name:</Text>
          <TextInput
            placeholder={"Enter your Last Name"}
            textAlign="center"
            style={styles.textInputsname}
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
            textAlign="center"
            style={styles.textInputs}
          />
        </View>

        <View style={styles.buttonview}>
          <Button title={"Create Account"} onPress={registerUser} />
        </View>

        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    alignItems: "center",
    flex: 1,
  },
  inputs: {
    flexDirection: "row",
    padding: 10,
  },
  firstnameInput: {
    flexDirection: "row",
    padding: 10,
  },
  lastnameinput: {
    flexDirection: "row",
    padding: 10,
  },
  text: {
    padding: 10,
  },
  textInputsname: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    borderRadius: 40,
    width: 200,
    padding: 10,
  },
  textInputs: {
    backgroundColor: "#d3d3d3",
    width: "100%",
    borderRadius: 40,
    width: 250,
    padding: 10,
  },
  buttonview: {
    alignItems: "center",
    padding: 20,
  },
});
