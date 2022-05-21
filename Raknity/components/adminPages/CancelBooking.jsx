import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { pendingSlots } from "../../dataBase/APIFunctions";

const CancelBooking = () => {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    pendingSlots().then((data) => {
      setSlots(data);
      console.log(data);
    });
  }, []);

  return (
    <View>
      <ScrollView>
        {slots.map((e, index) => {
          return (
          <View key={index}>
             <View>
                 <Text>{e.g}</Text>
             </View>
          </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default CancelBooking;

const styles = StyleSheet.create({});
