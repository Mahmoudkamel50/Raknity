import { StyleSheet, Text, View, TextInput } from "react-native";
import React, {useState} from "react";
import { editUserWallet } from "../../dataBase/user";
import Icon from "react-native-vector-icons/FontAwesome";

const EditUser = () => {
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState("");

  function updateWallet() {
    editUserWallet(email, wallet);
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text style={{ fontSize: 16, color: "#fff", padding: 10 }}>
          Enter user email:
        </Text>
        <TextInput
          placeholder="Enter user email"
          onChangeText={setEmail}
          value={email}
          style={{ backgroundColor: "#d3d3d3", flex: 1, borderRadius: 40 }}
          textAlign={"center"}
        />
      </View>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Text style={{ fontSize: 16, color: "#fff", padding: 10 }}>
          Enter user wallet:
        </Text>
        <TextInput
          placeholder="Enter Wallet"
          onChangeText={setWallet}
          value={wallet}
          style={{ backgroundColor: "#d3d3d3", flex: 1, borderRadius: 40 }}
          textAlign={"center"}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 20,
        }}
      >
        <View style={{ alignItems: "center", padding: 10 }}>
          <Icon.Button
            name="check"
            backgroundColor={"#3ded97"}
            borderRadius={40}
            onPress={() => {
              updateWallet();
            }}
          >
            <Text>Update</Text>
          </Icon.Button>
        </View>
      </View>
    </View>
  );
};

export default EditUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151e3d",
    padding: 20,
  },
});
