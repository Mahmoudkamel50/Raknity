import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homepage from '../Homepage'
import Profile from '../Profile'
import YourPlaces from '../YourPlaces'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Tabs = createBottomTabNavigator();
const AppPages = () => {
  return (
    <NavigationContainer>
        <Tabs.Navigator initialRouteName='Home'>
            <Tabs.Screen name='Home' component={Homepage}/>
            <Tabs.Screen name='Your Places' component={YourPlaces}/>
            <Tabs.Screen name='Profile' component={Profile}/>
        </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default AppPages

const styles = StyleSheet.create({})