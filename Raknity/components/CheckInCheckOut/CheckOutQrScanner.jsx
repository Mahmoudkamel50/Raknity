import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getUserById } from '../../dataBase/user';
import Icon from "react-native-vector-icons/FontAwesome";
import { checkinslotbyId, checkoutslotbyId } from '../../dataBase/APIFunctions';


export default function CheckOutQrScanner({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");
    const [checkInT, setCheckInT] = useState("");
    const [checkOutT, setCheckOutT] = useState("");
    const [timespent, setTimespent] = useState("");
    const [payment, setPayment] = useState("");
    const [modalVisibleconf, setModalVisibleconf] = useState(false);
    const [modalVisiblerec, setModalVisiblerec] = useState(false);


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
        setModalVisibleconf(true);
    };



    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function checkOut() {
        await checkoutslotbyId(id).then((data) => {
            setCheckInT(data.checkInTime);
            setCheckOutT(data.checkOutTime);
            setTimespent(data.timeDiffMin);
            setPayment(data.payment);
        })
    }

    return (
        <View style={styles.container}>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 16 }}>Navigate to "Your Places" tab {'>'} under your Checked</Text>
                <View style={{ flexDirection: "row", paddingTop: 10 }}>
                    <Text style={{ fontSize: 16 }}>In bookings press</Text>
                    <View style={{ backgroundColor: '#3ded97', borderRadius: 40, padding: 10, flexDirection: "row", bottom: 10, left: 20 }}>
                        <Icon
                            name="qrcode"
                            color={"#fff"}
                            size={20}
                        />
                        <Text style={{ color: "#151e3d" }}>  Show your Qr code</Text>
                    </View>
                </View>
            </View>
            <View style={styles.camView}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            </View>
            <Modal
                animationType='slide'
                visible={modalVisibleconf}
                transparent={true}
                onRequestClose={() => {
                    setModalVisibleconf(!modalVisibleconf);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {name != "" ?
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Check your identity:</Text>
                                <Text style={{ fontSize: 16, padding: 5, }}>Your name: {name}</Text>
                                <Text style={{ fontSize: 16, padding: 5, }}>Your email: {email}</Text>
                            </View>
                            : null}
                        <View style={styles.btview}>
                            <Icon.Button
                                name='check'
                                backgroundColor={'#3ded97'}
                                borderRadius={40}
                                onPress={() => {
                                    checkOut();
                                    setModalVisibleconf(false);
                                    setModalVisiblerec(true);
                                }}
                            >
                                <Text>Confirm</Text>
                            </Icon.Button>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType='slide'
                visible={modalVisiblerec}
                transparent={true}
                onRequestClose={() => {
                    setModalVisiblerec(!modalVisiblerec);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        {checkInT != "" && checkOutT != "" && timespent != "" && payment != "" ?
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', }}>Your receipt</Text>
                                <Text style={{ fontSize: 16, padding: 5, }}>You Checked In at: {checkInT.toString()}</Text>
                                <Text style={{ fontSize: 16, padding: 5, }}>You Checked Out at: {checkOutT.toString()}</Text>
                                <Text style={{ fontSize: 16, padding: 5, }}>You Spent: {timespent} MINS</Text>
                                <Text style={{ fontSize: 16, padding: 5, }}>You Paied: {payment} EGP</Text>
                            </View>
                            : null}
                        <View style={styles.btview}>
                            <Icon.Button
                                name='check'
                                backgroundColor={'#3ded97'}
                                borderRadius={40}
                                onPress={() => {
                                    setModalVisiblerec(false);
                                    navigation.navigate("Welcome");
                                }}
                            >
                                <Text>Ok</Text>
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