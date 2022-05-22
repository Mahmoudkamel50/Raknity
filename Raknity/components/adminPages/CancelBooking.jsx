import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { adminCancelBooking, pendingSlots, subscribe } from "../../dataBase/APIFunctions";
import { getUserById } from "../../dataBase/user";

const CancelBooking = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.type === "added") {
        pendingSlots().then(async (data) => {
          let someUsers = [];
          for (let i = 0; i < data.length; i++) {
            const user = await getUserById(data[i].occupiedBy);
            console.log('user', user);
            someUsers.push(user);
          }
          setUsers(someUsers);
          console.log(users);
        });
      }
      if (change.type === "modified") {
        pendingSlots().then(async (data) => {
          let someUsers = [];
          for (let i = 0; i < data.length; i++) {
            const user = await getUserById(data[i].occupiedBy);
            console.log('user', user);
            someUsers.push(user);
          }
          setUsers(someUsers);
          console.log(users);
        });
      }
      if (change.type === "removed") {
        pendingSlots().then(async (data) => {
          let someUsers = [];
          for (let i = 0; i < data.length; i++) {
            const user = await getUserById(data[i].occupiedBy);
            console.log('user', user);
            someUsers.push(user);
          }
          setUsers(someUsers);
          console.log(users);
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    pendingSlots().then(async (data) => {
      let someUsers = [];
      for (let i = 0; i < data.length; i++) {
        const user = await getUserById(data[i].occupiedBy);
        console.log('user', user);
        someUsers.push(user);
      }
      setUsers(someUsers);
      console.log(users);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#3ded97' }}>Users who have pending bookings</Text>
      <ScrollView style={{ height: '60%', padding: 5, }}>
        {users.map((e, index) => {
          console.log(e);
          return (
            <View key={index}>
              <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
                <View style={{ backgroundColor: '#fff', height: 5, width: 5, borderRadius: 5, }}></View>
                <Text style={{ padding: 10, color: '#fff', fontSize: 16 }}>
                  {e[0].firstName} {e[0].lastName} whose email is {e[0].email}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Icon.Button
                  name="remove"
                  backgroundColor={'#3ded97'}
                  borderRadius={40}
                  onPress={() => {
                    adminCancelBooking(e[0].id);
                  }}
                >
                  <Text>Cancel booking</Text>
                </Icon.Button>
              </View>
            </View>
          );
        }
        )}
      </ScrollView>
    </View>
  );
};

export default CancelBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151e3d',
    padding: 20,
  }
});
