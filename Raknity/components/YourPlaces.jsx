import { StyleSheet, Text, View, ScrollView, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getUserHistory } from '../dataBase/user'
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/FontAwesome';
import { checkIn, subscribe , checkout } from '../dataBase/APIFunctions';

const YourPlaces = ({ user }) => {

    useEffect(() => {
        const unsubscribe = subscribe(({ change, snapshot }) => {
            if (change.type === "added") {
                getUserHistory(user.uid).then((data) => {
                    setHistory(data);
                });
            }
            if (change.type === "modified") {
                getUserHistory(user.uid).then((data) => {
                    setHistory(data);
                });
            }
            if (change.type === "removed") {
                getUserHistory(user.uid).then((data) => {
                    setHistory(data);
                });
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

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
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <View>
                                        <Text style={styles.locations}>
                                            {e.government}, {e.cityName}, {e.locationName}, {e.partitionName}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                                        <View style={styles.btView}>
                                            <Icon.Button
                                                name='check'
                                                onPress={() => {
                                                    console.log(user.uid, index);
                                                    checkIn(user.uid, index);
                                                }}
                                                backgroundColor={'#3ded97'}
                                                borderRadius={40}
                                            >
                                                <Text>Check In</Text>
                                            </Icon.Button>
                                        </View>
                                    </View>
                                </View>
                            )
                        }
                    })
                }
            </ScrollView>
            <Text style={styles.titles}>
                Checked in bookings:
            </Text>
            <ScrollView>
                {
                    history.map((e, index) => {
                        if (e.status == "Checked In") {
                            return (
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <View>
                                        <Text style={styles.locations}>
                                            {e.government}, {e.cityName}, {e.locationName}, {e.partitionName}
                                        </Text>
                                    </View>
                                    <View style={styles.btView}>
                                            <Icon.Button
                                                name='remove'
                                                onPress={() => {
                                                    checkout(user.uid , index , e.government , e.cityName , e.locationName , e.partitionName , e.slot)

                                                }}
                                                backgroundColor={'#3ded97'}
                                                borderRadius={40}
                                            >
                                                <Text>Check Out</Text>
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
            <ScrollView>
                {
                    history.map((e, index) => {
                        if (e.status == "Checked out") {
                            return (
                                <View key={index}>
                                    <Text style={styles.locations}>
                                        {e.government}, {e.cityName}, {e.locationName}, {e.partitionName}
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

    btView: {
        alignItems: 'center',
        paddingHorizontal: 5,
    }
})