import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserHistory } from '../dataBase/user'
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/FontAwesome';

const YourPlaces = ({user}) => {
    useEffect(() => {
        getUserHistory(user.uid).then((data) => {
            setHistory(data);
        })
    }, []);

    function openLink(url) {
        WebBrowser.openBrowserAsync(url);
    }
    const [history, setHistory] = useState([]);
    return (
        <View style={styles.container}>
            <Text style={styles.titles}>
                Pending bookings:
            </Text>
            <ScrollView>
                {
                    history.map((e, index) => {
                        if (e.status == "pending") {
                            return (
                                <View key={index} style={{alignItems: 'center'}}>
                                    <View>
                                        <Text style={styles.locations}>
                                            {e.government}, {e.cityName}, {e.locationName}
                                        </Text>
                                    </View>
                                    <View style={styles.btView}>
                                        <Icon.Button
                                            name='send'
                                            onPress={() => {
                                                openLink(e.url);
                                            }}
                                            backgroundColor={'#3ded97'}
                                            borderRadius={40}
                                        >
                                            <Text>Navigate</Text>
                                        </Icon.Button>
                                    </View>
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
            <Text style={styles.titles}>
                Your previous bookings:
            </Text>
            <ScrollView style={styles.sv}>
                {
                    history.map((e, index) => {
                        if (e.status != "pending") {
                            return (
                                <View key={index}>
                                    <Text style={styles.locations}>
                                        {e.government}, {e.cityName}, {e.locationName}
                                    </Text>
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
        </View>
    )
}

export default YourPlaces

const styles = StyleSheet.create({
    container: {
        padding: 30,
    },
    titles: {
        fontSize: 20,
        padding: 5,
    },
    locations: {
        fontSize: 16,
        padding: 10,
    },
    sv: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#d3d3d3',
    },
    btView: {
        alignItems: 'center'
    }
})