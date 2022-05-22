import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from '../dataBase/authorization';
import { StatusBar } from 'expo-status-bar';

const Banned = () => {
  return (
    <View style={styles.container}>
        <Icon
            name='ban'
            color={'#f00'}
            size={200}
        />
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff'}}>You're Banned from Raknity app!</Text>
      <View style={{ alignItems: "center", padding: 20 }}>
          <Icon.Button
            name="sign-out"
            onPress={() => { logout() }}
            backgroundColor={'#3ded97'}
            borderRadius={40}
          >
            <Text>Log out</Text>
          </Icon.Button>
        </View>
        <StatusBar style='light'/>
    </View>
  )
}

export default Banned

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151e3d',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    }
})