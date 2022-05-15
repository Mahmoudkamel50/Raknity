import { View, Text } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from '../signUp';
import SignIn from '../SignIn';

const AuthStack = createNativeStackNavigator();

const AuthorizationStack = () => {

  return (
    <NavigationContainer>
      <AuthStack.Navigator initialRouteName='Sign in'>
        <AuthStack.Screen
          name='Sign in'
          component={SignIn}
          options={{
            headerStyle: {
              backgroundColor: '#3ded97'
            }
          }}
        />
        <AuthStack.Screen
          name='Sign up'
          component={SignUp}
          options={{
            headerStyle: {
              backgroundColor: '#3ded97'
            }
          }}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}

export default AuthorizationStack
