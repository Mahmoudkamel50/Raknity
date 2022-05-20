import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getUserById } from '../../dataBase/user';
import Icon from "react-native-vector-icons/FontAwesome";
import { checkinslotbyId,} from '../../dataBase/APIFunctions';


export default function CheckInQrScanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        getUserById(data).then((user) => {
            setName(user[0].firstName + " " + user[0].lastName);
            setEmail(user[0].email)
        })
        setId(data);
        setModalVisible(true);
    };



    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function checkIn() {
        await checkinslotbyId(id);
    }

    return (
        <View style={styles.container}>
            <View style={styles.camView}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <Modal
                animationType='slide'
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {name != "" ?
                            <View>
                                <Text style={{fontSize: 20, fontWeight: 'bold',}}>Check your identity:</Text>
                                <Text style={{fontSize: 16, padding: 5,}}>Your name: {name}</Text>
                                <Text style={{fontSize: 16, padding: 5,}}>Your email: {email}</Text>
                            </View>
                            : null}
                        <View style={styles.btview}>
                            <Icon.Button
                                name='check'
                                backgroundColor={'#3ded97'}
                                borderRadius={40}
                                onPress={() => {
                                    checkIn();
                                    navigation.navigate("Welcome");
                                    setModalVisible(false);
                                }}
                            >
                                <Text>Confirm</Text>
                            </Icon.Button>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    btview: {
        paddingTop: 20,
    },
    camView: {
        width: '85%',
        height: '70%',
    },
    modalView: {
        margin: 20,
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
}); 