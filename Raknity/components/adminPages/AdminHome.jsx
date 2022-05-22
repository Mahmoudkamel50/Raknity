import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "../../dataBase/authorization";
import { StatusBar } from "expo-status-bar";

const AdminHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Control users</Text>
      <View style={styles.btsView}>
        <View>
          <Icon.Button
            name="ban"
            backgroundColor={"#3ded97"}
            borderRadius={40}
            onPress={() => {
              navigation.navigate("Ban user");
            }}
          >
            <Text>User Permissions</Text>
          </Icon.Button>
        </View>
        <View>
          <Icon.Button
            name="edit"
            backgroundColor={"#3ded97"}
            borderRadius={40}
            onPress={() => {
              navigation.navigate("edit user");
            }}
          >
            <Text>Edit user</Text>
          </Icon.Button>
        </View>
      </View>
      <Text style={styles.titles}>Control bookings</Text>
      <View style={styles.btsView}>
        <View>
          <Icon.Button
            name="remove"
            backgroundColor={"#3ded97"}
            borderRadius={40}
            onPress={() => {
                navigation.navigate('Cancel booking');
            }}
          >
            <Text>Cancel booking</Text>
          </Icon.Button>
        </View>
      </View>
      <View style={{ alignItems: "center", top: 400 }}>
        <Icon.Button
          name="sign-out"
          onPress={() => {
            logout();
          }}
          backgroundColor={"#3ded97"}
          borderRadius={40}
        >
          <Text>Log out</Text>
        </Icon.Button>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151e3d",
    padding: 20,
  },
  btsView: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 20,
  },
  titles: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});
