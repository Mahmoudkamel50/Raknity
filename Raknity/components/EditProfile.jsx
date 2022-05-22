
import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { editprofile } from '../dataBase/user';

const EditProfile = ({ route , navigation}) => {
    const {id, firstName, lastName, phone } = route.params;

    const [fName, setFName] = useState(firstName);
    const [lName, setLName] = useState(lastName);
    const [pNum, setpNum] = useState(phone);

    function editInfo(){
        editprofile(id , fName , lName , pNum);
    }

    return (
        <View style={styles.container}>
            <View style={styles.editInfoView}>
                <Text style={styles.text}>First Name: </Text>
                <TextInput style={styles.textInputView}
                    onChangeText={setFName}
                    placeholder="First Name"
                    textAlign='center'
                    value={fName}
                />
            </View>
            <View style={styles.editInfoView}>
                <Text style={styles.text}>Last Name: </Text>
                <TextInput style={styles.textInputView}
                    onChangeText={setLName}
                    placeholder="Last Name"
                    textAlign='center'
                    value={lName}
                />
            </View>
            <View style={styles.editInfoView}>
                <Text style={styles.text}>Phone Number: </Text>
                <TextInput style={styles.textInputView}
                    onChangeText={setpNum}
                    placeholder="Phone Number"
                    textAlign='center'
                    value={pNum}
                />
            </View>
            <View style={{ alignItems: "center" }}>
                <Icon.Button
                    name='edit'
                    borderRadius={40}
                    backgroundColor={'#3ded97'}
                    onPress={() => {
                        editInfo();
                        navigation.goBack();
                    }}
                    size={30}
                >
                    <Text style={{ fontSize: 20 }}>Edit</Text>
                </Icon.Button>
            </View>
        </View>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#151e3d',
        flex: 1,
        padding: 20
    },
    editInfoView: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 40,
        width: "97%",
    },
    textInputView: {
        flex: 1,
        backgroundColor: "#d3d3d3",
        borderRadius: 40,
        padding: 5,
        width: 100,
    },
    text: {
        fontSize: 16,
        color: '#fff',
        paddingRight: 10,
    }
})