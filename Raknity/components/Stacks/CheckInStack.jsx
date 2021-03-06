import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckInHome from '../CheckInCheckOut/CheckInHome';
import CheckInQrScanner from '../CheckInCheckOut/CheckInQRScanner';

const Stack = createNativeStackNavigator();

const CheckInStack = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={CheckInHome}/>
            <Stack.Screen name='Scan your QR code' component={CheckInQrScanner}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CheckInStack

const styles = StyleSheet.create({})