import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { getUserById } from '../../dataBase/user';
import Icon from "react-native-vector-icons/FontAwesome";
import { checkinslotbyId } from '../../dataBase/APIFunctions';


export default function QRScanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [name, setName] = useState("");
    const [id, setId] = useState("");

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
        })
        setId(data);
    };



    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    async function checkIn(){
        await checkinslotbyId(id);
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />
            <Text>{name}</Text>
            <Icon.Button
                name='check'
                onPress={() => {
                    checkIn();
                    // navigation.navigate("Welcome");
                }}
            >

            </Icon.Button>
            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
}); 