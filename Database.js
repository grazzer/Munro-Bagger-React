import React from "react";
import { useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';


class Database {

    db = SQLite.openDatabase('db.testDb');

    constructor() {  // Constructor
        this.db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists myClimbs (id integer primary key not null, munro int, date int, weather text, distance int, time real, friends text);"
            );
        })
    }

    addNewClimb = (munroNumber, date, weather, distance, time, friend, unitKm) => {
        const _munroNumber = parseInt(munroNumber)
        const _date = parseInt(date)
        const _time = parseFloat(time)
        let _distance = parseInt(distance)
        if (unitKm == 'Miles') {
            _distance = _distance * 1.609344
        }

        this.db.transaction(
            (tx) => {
                tx.executeSql("insert into myClimbs (munro, date, weather, distance, time, friends) values (?, ?, ?, ?, ?, ?)", [_munroNumber, _date, weather, _distance, _time, friend]);
            },
            null,
        );
    }

    removeAllClimbs = () => {
        this.db.transaction(
            (tx) => {
                tx.executeSql("DELETE FROM myClimbs")
            },
            null,
        );
    }

    LogAllClimbs = () => {
        this.db.transaction(
            (tx) => {
                tx.executeSql("select * from myClimbs", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows))
                );
            },
            null,
        );
    }
}


module.exports = new Database()