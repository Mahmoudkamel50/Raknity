import { StyleSheet, TextInput, View, Text } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const SignIn = () => {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Text style={{ fontSize: 17 }}>E-mail: </Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder='Enter your email'
            textAlign='center'
            style={{ fontSize: 17 }}
            keyboardType='email-address'
          />
        </View>
      </View>
      <View style={styles.input}>
        <Text style={{ fontSize: 17 }}>Password: </Text>
        <View style={styles.textInput}>
          <TextInput
            placeholder='Enter your password'
            textAlign='center'
            style={{ fontSize: 17 }}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.BTView}>
        <Icon.Button
          name='envelope'
          backgroundColor={'#3ded97'}
          borderRadius={40}
          onPress={() => alert('Should sign the user into his/her account')}
        >
          <Text>Sign in</Text>
        </Icon.Button>
      </View>
      <Text
        style={styles.noAccount}
        onPress={() => alert('Should navigate to "Sign up" page')}
      >
        Don't have an account?
      </Text>
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    flexDirection: 'column'
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 30,
    width: '70%',
  },
  textInput: {
    flex: 1,
    backgroundColor: '#c0c0c0',
    borderRadius: 40,
  },
  BTView: {
    alignItems: 'flex-end',
    borderRadius: 40,
  },
  noAccount: {
    fontSize: 17,
    padding: 30,
    color: '#3ded97'
  }
})