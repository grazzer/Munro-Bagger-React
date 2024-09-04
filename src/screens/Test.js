import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { Text, StyleSheet, View, TextInput, Button, SafeAreaView, Image } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import Spacer from "../components/Spacer";
import { SelectList } from 'react-native-dropdown-select-list'
import SafeViewAndroid from "../styleSheets/AndroidSafeArea.js";
import Icon from './icon.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function Test({ navigation, route }) {

    // const munro = route.params.munro
    const db = SQLite.openDatabase('db.testDb');

    const [munroNumber, setMunroNumber] = useState("")
    const [munroName, setMunroName] = useState("")
    const [date, setDate] = useState("")
    const [weather, setWeather] = useState("")
    const [distance, setDistance] = useState("")
    const [unitKm, setUnitKm] = useState("Km")
    const [time, setTime] = useState("")
    const [friend, setFriend] = useState("")

    const IMAGE_HEIGHT = window.width / 2;


    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists myClimbs (id integer primary key not null, munro int, date int, weather text, distance int, time real, friends text);"
            );
        });
    }, []);
    console.log(weather)
    LogAllClimbs(db)


    const [selected, setSelected] = React.useState("");

    const data = [
        { key: '1', value: 'Km' },
        { key: '2', value: 'Miles' },

    ]

    return (
        
        // <View style={{ flex: 1, backgroundColor: 'red' }}>
        //     <View style={{ flex: 1, backgroundColor: 'powderblue', margin: 20 }}>
        //         <Image source={Icon}
        //             style={styles.logo}
        //         />
        //         <TextInput
        //             placeholder="Email"
        //             style={styles.input}
        //         />
        //         <TextInput
        //             placeholder="Username"
        //             style={styles.input}
        //         />
        //         <TextInput
        //             placeholder="Password"
        //             style={styles.input}
        //         />
        //         <TextInput
        //             placeholder="Confirm Password"
        //             style={styles.input}
        //         />
        //         <View style={{ height: 60 }} />
        //     </View>
        // </View>

        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View
                style={styles.container}
            >
                <KeyboardAwareScrollView
                    style={styles.inputContainer}
                >
                    <View
                        style={styles.inputContainertwo}
                    >
                        <Image source={Icon}
                            style={styles.logo}
                        />
                        <TextInput
                            placeholder="Email"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Username"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            style={styles.input}
                        />
                        <View style={{ height: 60 }} />
                    </View>
                </KeyboardAwareScrollView>
            </View >
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     backgroundColor: '#F5F5F5',

    //     justifyContent: 'center',
    // },
    // tital: {
    //     fontSize: 25,
    //     padding: 5,
    //     alignSelf: "center",
    // },

    // header: {
    //     paddingTop: 8,
    //     fontSize: 20,
    //     alignSelf: "center",
    // },
    // row: {
    //     flexDirection: "row",
    //     margin: 10,
    // },
    // titleColumn: {
    //     // backgroundColor: "red",
    //     flex: 1
    // },
    // inputColumn: {
    //     // backgroundColor: "blue",
    //     flex: 2
    // },
    // text: {
    //     fontSize: 16,
    // },
    // searchBoxInput: {
    //     backgroundColor: '#F5F5F5',
    //     paddingHorizontal: 20
    // },
    // searchBoxInputDistance: {
    //     backgroundColor: '#F5F5F5',
    //     paddingHorizontal: 20
    // },
    // picker: {
    //     width: 100,
    //     fontSize: 2,
    //     color: 'red'
    // },
    // list: {

    // },

    container: {
        backgroundColor: '#4c69a5',
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        margin: 20,
        backgroundColor: 'red',
        padding: 25,
        borderRadius: 20,
        // alignItems: 'center',
        // justifyContent: 'space-around',

    },
    inputContainertwo: {
        flex: 1,
        margin: 20,
        backgroundColor: 'red',
        padding: 25,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        marginVertical: 5,
        // paddingVertical: 5,
        // paddingHorizontal: 15,
        width: 250,
    },
    logo: {
        height: 250,
        width: 250,
        // resizeMode: 'contain',
        marginBottom: 20,
        padding: 10,
        marginTop: 20
    },
});



addNewClimb = (db, munroNumber, date, weather, distance, time, friend) => {
    const _munroNumber = parseInt(munroNumber)
    const _date = parseInt(date)
    const _distance = parseInt(distance)
    const _time = parseFloat(time)
    db.transaction(
        (tx) => {
            tx.executeSql("insert into myClimbs (munro, date, weather, distance, time, friends) values (?, ?, ?, ?, ?, ?)", [_munroNumber, _date, weather, _distance, _time, friend]);
        },
        null,
    );
}

removeAllClimbs = (db) => {
    db.transaction(
        (tx) => {
            tx.executeSql("DELETE FROM myClimbs")
        },
        null,
    );
}

LogAllClimbs = (db) => {
    db.transaction(
        (tx) => {
            tx.executeSql("select * from myClimbs", [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
        },
        null,
    );
}


// addNewClimb = (munroNumber, date, weather, distance, time, friend) => {
//     db.transaction(tx => {
//         tx.executeSql("insert into myClimbs (munro, date, weather, distance, time, friends) values (?, ?, ?, ?, ?, ?)", [munroNumber, date, weather, distance, time, friend],
//             (txObj, resultSet) => this.setState({
//                 data: this.state.data.concat(
//                     { id: resultSet.insertId, text: 'gibberish', count: 0 })
//             }),
//             (txObj, error) => console.log('Error', error))
//     })
//     tx.executeSql("select * from myClimbs", [], (_, { rows }) =>
//         console.log(JSON.stringify(rows))
//     );
// }

