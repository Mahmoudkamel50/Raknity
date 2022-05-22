import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from '../../dataBase/authorization';
import { StatusBar } from 'expo-status-bar';

const CheckOutHome = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Icon.Button
                name='qrcode'
                size={100}
                onPress={() => navigation.navigate('Scan your QR code')}
                backgroundColor={'#3ded97'}
                borderRadius={40}
                style={{paddingHorizontal: 20}}
            >
                <Text style={{fontSize: 25}}>Check out</Text>

            </Icon.Button>
            <Icon.Button
                name="sign-out"
                onPress={() => { logout() }}
                backgroundColor={'#3ded97'}
                borderRadius={40}
            >
                <Text>Log out</Text>
            </Icon.Button>
            <StatusBar style='dark'/>
        </View>
    )
}

export default CheckOutHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingVertical: 40,
        backgroundColor: '#fff',
    },
    btview: {

    }
})