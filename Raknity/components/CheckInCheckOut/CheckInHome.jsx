import { StyleSheet, Text, View ,} from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from '../../dataBase/authorization';

const CheckInHome = ({navigation}) => {
  return (
    <View>
      <Icon.Button
      name='scanner-gun'
      onPress={() => navigation.navigate('Scan your QR code')}
      backgroundColor={'#3ded97'}
      borderRadius={40}
      >
          <Text>Check In</Text>
          
      </Icon.Button>
      <Icon.Button
          name="sign-out"
          onPress={() => { logout() }}
          backgroundColor={'#3ded97'}
          borderRadius={40}
        >
          <Text>Log out</Text>
        </Icon.Button>
    </View>
  )
}

export default CheckInHome

const styles = StyleSheet.create({})