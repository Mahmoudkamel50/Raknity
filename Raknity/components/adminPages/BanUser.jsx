import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { banUser } from '../../dataBase/user';

const BanUser = () => {
    const [email, setEmail] = useState("");
    function ban() {
        banUser(email);
    }
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row',}}>
                <Text style={{fontSize: 16, color: "#fff", padding: 10}}>Enter user id:</Text>
                <TextInput
                    placeholder='Enter user id'
                    onChangeText={setEmail}
                    value={email}
                    style={{backgroundColor: '#d3d3d3', flex: 1, borderRadius: 40}}
                />
            </View>
            <View style={{alignItems: 'center', padding: 20}}>
                <Icon.Button
                    name='ban'
                    backgroundColor={'#3ded97'}
                    borderRadius={40}
                    onPress={() => {
                        ban();
                    }}
                >
                    <Text>Ban user</Text>
                </Icon.Button>
            </View>
        </View>
    )
}

export default BanUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151e3d',
        padding: 20,
    }
})