import { StatusBar } from "expo-status-bar";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import { register, getUserUId } from "../dataBase/authorization";
import { addUser } from "../dataBase/user";
import Icon from "react-native-vector-icons/FontAwesome";

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
              email,
              firstName,
              lastName,
              phoneNumber,
              history,
              wallet: 1000,
              role: 'user',
              banned: false,
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
          <Icon.Button
            name="user-plus"
            onPress={registerUser}
            backgroundColor={"#3ded97"}
            borderRadius={40}
          >
            <Text>Create account</Text>
          </Icon.Button>
        </View>
        <StatusBar style="inverted" />
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 30,
    flex: 1,
    backgroundColor: '#151e3d',
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
    color: '#fff'
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
