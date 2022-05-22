import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { banUser, UnbanUser } from '../../dataBase/user';

const BanUser = () => {
    const [email, setEmail] = useState("");

    function ban() {
        banUser(email);
    }

    function Unban() {
        UnbanUser(email);
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                <Text style={{ fontSize: 16, color: "#fff", padding: 10 }}>Enter user email:</Text>
                <TextInput
                    placeholder='Enter user email'
                    onChangeText={setEmail}
                    value={email}
                    style={{ backgroundColor: '#d3d3d3', flex: 1, borderRadius: 40 }}
                    textAlign={'center'}
                    keyboardType='email-address'
                />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", padding: 20}}>
                <View style={{ alignItems: 'center', padding: 10 }}>
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
                <View style={{ alignItems: 'center', padding: 10 }}>
                    <Icon.Button
                        name='unlock'
                        backgroundColor={'#3ded97'}
                        borderRadius={40}
                        onPress={() => {
                            Unban();
                        }}
                    >
                        <Text>UnBan user</Text>
                    </Icon.Button>
                </View>
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