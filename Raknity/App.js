import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthorizationStack from "./components/Stacks/AuthorizationStack";
import AppPages from "./components/Stacks/AppPages";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./dataBase/configuration";
import { getUserById } from "./dataBase/user";
import CheckInStack from "./components/Stacks/CheckInStack";
import CheckOutStack from "./components/Stacks/CheckOutStack";
import AdminStack from "./components/Stacks/AdminStack";
import Banned from "./components/Banned";
import { subscribe } from "./dataBase/APIFunctions";

export default function App() {

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserEmail(JSON.stringify(user.email));
        getUserById(user.uid).then((data) => {
          console.log(user.uid);
          console.log(data);
          setRole(data[0].role);
          setBanned(data[0].banned);
        })
      }
    });
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        if (user) {
          setUserEmail(JSON.stringify(user.email));
          getUserById(user.uid).then((data) => {
            console.log(user.uid);
            console.log(data);
            setRole(data[0].role);
            setBanned(data[0].banned);
          })
        }
      }
      if (change.type === "modified") {
        if (user) {
          setUserEmail(JSON.stringify(user.email));
          getUserById(user.uid).then((data) => {
            console.log(user.uid);
            console.log(data);
            setRole(data[0].role);
            setBanned(data[0].banned);
          })
        }
      }
      if (change.type === "removed") {
        if (user) {
          setUserEmail(JSON.stringify(user.email));
          getUserById(user.uid).then((data) => {
            console.log(user.uid);
            console.log(data);
            setRole(data[0].role);
            setBanned(data[0].banned);
          })
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [user, setUser] = useState(undefined)
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");
  const [banned, setBanned] = useState(null);

  if (user && role == 'user' && banned == false) {
    return (
      <AppPages user={user} />
    );
  }
  if (user && role == 'user' && banned == true) {
    return (
      <Banned />
    )
  }
  if (user && role == 'pCheckIn') {
    return (
      <CheckInStack />
    )
  }
  if (user && role == 'pCheckOut') {
    console.log(role);
    return (
      <CheckOutStack />
    )
  }
  if (user && role == 'admin') {
    console.log(role);
    return (
      <AdminStack />
    )
  }
  else {
    return (
      <AuthorizationStack />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

