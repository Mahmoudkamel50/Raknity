import { StyleSheet, TextInput, View, Text, Image } from "react-native";
import React, { useState, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { AuthContext } from "../dataBase/Utils";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { login } from "../dataBase/authorization";
import { StatusBar } from "expo-status-bar";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../assets/Raknity512.png')} style={styles.img} />
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.welcomeTxt}> Welcome to Raknity!</Text>
      </View>
      <View style={{ alignItems: 'center', padding: 10 }}>
        <Text style={styles.credTxt}> Please, enter your credentials</Text>
      </View>
      <View style={styles.input}>
        <Text style={{ fontSize: 17, color: '#fff', padding: 5 }}>E-mail: </Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Enter your email"
            textAlign="center"
            style={{ fontSize: 17, }}
            keyboardType="email-address"
            onChangeText={setEmail}
            value={email}
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={{ fontSize: 17, color: '#fff', padding: 5 }}>Password: </Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder="Enter your password"
            textAlign="center"
            style={{ fontSize: 17,}}
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
          <Text style={styles.btText}>Sign in</Text>
        </Icon.Button>
        <Text style={styles.error}>{error}</Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <Text
          style={styles.noAccount}
          onPress={() => navigation.navigate("Sign up")}
        >
          Don't have an account?
        </Text>
      </View>
      <StatusBar style="inverted" />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    flexDirection: "column",
    backgroundColor: '#151e3d'
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 30,
    width: "97%",
  },
  textInput: {
    flex: 1,
    backgroundColor: "#d3d3d3",
    borderRadius: 40,
    padding: 5,
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
  img: {
    height: 250,
    width: 250,
    marginBottom: 10,
  },
  welcomeTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    color: '#3ded97',
  },
  credTxt: {
    fontSize: 20,
    paddingBottom: 10,
    color: '#3ded97',
  },
  btText: {
    color: '#151e3d'
  }
});
