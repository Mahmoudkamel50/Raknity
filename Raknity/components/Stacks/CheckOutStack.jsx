import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckOutQrScanner from '../CheckInCheckOut/CheckOutQrScanner';
import CheckOutHome from '../CheckInCheckOut/CheckOutHome';

const Stack = createNativeStackNavigator();

const CheckOutStack = () => {

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Welcome' component={CheckOutHome}/>
            <Stack.Screen name='Scan your QR code' component={CheckOutQrScanner}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default CheckOutStack;