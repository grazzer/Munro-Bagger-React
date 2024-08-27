import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, ActivityIndicator, TextInput } from 'react-native';
import Database from "../../Database";
import Spacer from "../components/Spacer";


import { useDispatch, useSelector } from "react-redux";
import { todoAdded, todoToggled } from "../../redux/features/todos/todoSlice"

export default function MyClimbsScreen({ route }) {

    const [myClimbsData, setMyClimbsData] = useState(null);
    const [climbedMunros, setClimbedMunros] = useState(null);
    useEffect(() => {
        Database.getAllClimbs().then(
            (climbsData) => {
                setMyClimbsData(climbsData)
            }
        ).catch((message) => {
            console.log(message)
        })
    }, [])

    if (climbedMunros == null && myClimbsData) {
        const array = myClimbsData.map(getMunroNumbers);
        setClimbedMunros([...new Set(array)])
        // console.log(climbedMunros)
    }
    console.log(climbedMunros)

    function getMunroNumbers(myClimbsData) {
        return myClimbsData.munro;
    }

    return (
        <View>
            <Text style={styles.tital}>My Climbs</Text>
            <FlatList
                keyExtractor={(item) => item}
                data={climbedMunros}
                renderItem={({ item }) => (<ClimbedCard munro={item} allClimbs={myClimbsData} />)}
            />
        </View>
    );
}

import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

const ClimbedCard = (props) => {
    const { munro, allClimbs } = props
    const climb = allClimbs[0]

    const array = allClimbs.filter(item => item.munro == munro);

    return (
        <View style={styles.munroContainer}>
            <View style={[styles.munroCard, styles.Shadow]}>
                <View style={styles.munroCardDetails}>
                    <Text style={styles.munroNameText} numberOfLines={1}>{munro}</Text>
                    <Spacer size={5} />
                    <Details IconName="location" data={' munro.County'} />
                    <FlatList
                        keyExtractor={(item) => item.id}
                        data={array}
                        renderItem={({ item, index }) => (<ShowClimb climb={item} assent={index} />)}
                    // ListEmptyComponent
                    />
                </View>
            </View>
        </View>
    )
}

function ShowClimb({ climb, assent }) {
    const [show, setShow] = useState(false);
    let assentNum = assent + 1
    switch (assentNum) {
        case 1:
            assentNum = '1st'
            break;
        case 2:
            assentNum = '2nd'
            break;
        case 3:
            assentNum = '3rd'
            break;
        default:
            assentNum = (assentNum + 'th')
    }

    if (show) {
        return (
            <View>
                <TouchableWithoutFeedback onPress={() => setShow(false)}>
                    <View>
                        <Details IconName="hashtag" data={assentNum + ' assent'} />
                        <Spacer size={5} />
                        <View
                            style={{
                                borderBottomColor: 'black',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Spacer size={5} />
                    </View>
                </TouchableWithoutFeedback>
                <Details IconName="calendar" data={climb.date} />
                <Details IconName="distance" data={climb.distance} />
                <Details IconName="time" data={' ' + climb.time} />
                <Details IconName="weather" data={climb.weather} />
                <Details IconName="freinds" data={climb.freind} />
                <View style={styles.munroCardBag}>
                    <Icon name='backpack' size={22} />
                </View>
                <Spacer size={10} />

            </View>
        )

    }
    else {
        return (
            <TouchableWithoutFeedback onPress={() => setShow(true)}>
                <View>
                    <Details IconName="hashtag" data={assentNum + ' assent'} />
                    <Spacer size={5} />
                    <View
                        style={{
                            borderBottomColor: 'black',
                            borderBottomWidth: StyleSheet.hairlineWidth,
                        }}
                    />
                    <Spacer size={5} />
                </View>
            </TouchableWithoutFeedback >
        )
    }
}

function Details({ IconName, data }) {
    return (
        <View style={styles.InfoRow}>
            <Icon name={IconName} size={18} color='#3ECEB1' style={styles.InfoSymble} />
            <Text style={styles.InfoText} numberOfLines={1}> {data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tital: {
        fontSize: 25,
        padding: 5,
        alignSelf: "center",
    },
    InfoText: {
        fontSize: 16
    },
    InfoSymble: {
        margin: 2,
        paddingRight: 5,
    },
    InfoRow: {
        flexDirection: 'row',
        flex: 1
    },
    munroNameText: {
        fontSize: 20
    },
    munroCardBag: {
        flex: 1,
        position: "absolute", bottom: 12, right: 12
    },
    munroCardDetails: {
        flex: 6,
        paddingLeft: 15,
    },
    munroCardImage: {
        aspectRatio: 1 / 1,
        borderRadius: 8,
        backgroundColor: '#3ECEB1',
    },
    Shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    },
    munroCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        padding: 12,
        backgroundColor: '#FFF',
        borderRadius: 8,
        // height: 130,
    },
    munroContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
});

