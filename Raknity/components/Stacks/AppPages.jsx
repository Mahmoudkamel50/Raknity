import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Homepage from '../Homepage'
import Profile from '../Profile'
import YourPlaces from '../YourPlaces'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/FontAwesome";

const Tabs = createBottomTabNavigator();
const AppPages = ({ user }) => {
  return (
    <NavigationContainer>
      <Tabs.Navigator initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home'
            } else if (route.name === 'Profile') {
              iconName = 'user';
            } else if (route.name === 'Your Places') {
              iconName = 'map'
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3ded97',
          tabBarInactiveTintColor: '#c7ffc7',
          tabBarStyle: { backgroundColor: '#151e3d' }
        })}
      >
        <Tabs.Screen
          name='Home'
          options={{
            headerStyle: {
              backgroundColor: '#151e3d'
            },
            headerTintColor: '#3ded97',
          }}
        >
          {(props) => <Homepage {...props} user={user} />}
        </Tabs.Screen>
        <Tabs.Screen
          name='Your Places'
          options={{
            headerStyle: {
              backgroundColor: '#151e3d'
            },
            headerTintColor: '#3ded97',
          }}
        >
          {(props) => <YourPlaces {...props} user={user} />}
        </Tabs.Screen>
        <Tabs.Screen
          name='Profile'
          component={Profile}
          options={{
            headerStyle: {
              backgroundColor: '#151e3d'
            },
            headerTintColor: '#3ded97',
          }}
        />
      </Tabs.Navigator>
    </NavigationContainer>
  )
}

export default AppPages

const styles = StyleSheet.create({})