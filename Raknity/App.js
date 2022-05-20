import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AuthorizationStack from "./components/Stacks/AuthorizationStack";
import AppPages from "./components/Stacks/AppPages";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./dataBase/configuration";
import { getUserById } from "./dataBase/user";
import CheckInStack from "./components/Stacks/CheckInStack";




export default function App() {

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setUserEmail(JSON.stringify(user.email));
        getUserById(user.uid).then((data) => {
          console.log(user.uid);
          console.log(data);
          setRole(data[0].role)
          
        })
      }
    });

    

    return () => {
      unsub();
    };
  }, []);

  const [user, setUser] = useState(undefined)
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");

      if(user && role == 'user'){
        console.log(role);
        return(
         <AppPages user={user}/>
        );
      }
      if (user && role == 'pCheckIn') {
        console.log(role);
        return (
          <CheckInStack/>
        )
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

