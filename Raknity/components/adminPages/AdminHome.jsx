import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome";

const AdminHome = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titles}>Control users</Text>
            <View style={styles.btsView}>
                <View>
                    <Icon.Button
                        name='ban'
                        backgroundColor={'#3ded97'}
                        borderRadius={40}
                        onPress={() => {
                            navigation.navigate('Ban user');
                        }}
                    >
                        <Text>Ban user</Text>
                    </Icon.Button>
                </View>
                <View>
                    <Icon.Button
                        name='edit'
                        backgroundColor={'#3ded97'}
                        borderRadius={40}
                    >
                        <Text>Edit user</Text>
                    </Icon.Button>
                </View>
            </View>
            <Text style={styles.titles}>Control bookings</Text>
            <View style={styles.btsView}>
                <View>
                    <Icon.Button
                        name='remove'
                        backgroundColor={'#3ded97'}
                        borderRadius={40}
                    >
                        <Text>Cancel booking</Text>
                    </Icon.Button>
                </View>
            </View>
        </View>
    )
}

export default AdminHome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151e3d',
        padding: 20,
    },
    btsView: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 20,
    },
    titles: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    }
})