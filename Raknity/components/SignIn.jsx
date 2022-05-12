import { StyleSheet, TextInput, View, Text } from "react-native";
import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../dataBase/Utils";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login } from "../dataBase/authorization";

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={{ fontSize: 17 }}>E-mail: </Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Enter your email"
            textAlign="center"
            style={{ fontSize: 17 }}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={{ fontSize: 17 }}>Password: </Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Enter your password"
            textAlign="center"
            style={{ fontSize: 17 }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.BTView}>
        <Icon.Button
          name="envelope"
          backgroundColor={"#3ded97"}
          borderRadius={40}
          onPress={() => {
            login(email, password)
              .then(setError(""))
              .catch((error) => setError(error.message));
          }}
        >
          <Text>Sign in</Text>
        </Icon.Button>
        <Text style={styles.error}>{error}</Text>
      </View>
      <Text
        style={styles.noAccount}
        onPress={() => navigation.navigate("Sign up")}
      >
        Don't have an account?
      </Text>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: "center",
    flexDirection: "column",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 30,
    width: "70%",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#c0c0c0",
    borderRadius: 40,
  },
  BTView: {
    alignItems: "center",
    borderRadius: 40,
  },
  noAccount: {
    fontSize: 17,
    padding: 30,
    color: "#3ded97",
  },
  error: {
    color: "red",
    paddingTop: 10,
  },
});
