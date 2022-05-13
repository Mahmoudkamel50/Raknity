import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./components/SignIn";
import AuthorizationStack from "./components/Stacks/AuthorizationStack";
import Homepage from "./components/Homepage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./dataBase/configuration";




export default function App() {

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserEmail(JSON.stringify(user.email));
      }
    });

    return () => {
      unsub();
    };
  }, []);

  const [user, setUser] = useState(undefined)
  const [userEmail, setUserEmail] = useState("");

      if(user){
        return(
        <Homepage/>
        );
      }
      else{
        return(
        <AuthorizationStack/>
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

