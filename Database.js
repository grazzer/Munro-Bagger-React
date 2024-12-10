import * as SQLite from "expo-sqlite/legacy";
// import { parse } from "react-native-svg";

class Database {

    db = SQLite.openDatabase('db.Munro');
    

    createDatabase = () => {
        this.db.transaction((tx) => {
            tx.executeSql(
                "create table if not exists myClimbs (id integer primary key not null, munro int, date text, weather text, distance int, time real, friends text);"
            );
        })
    }

    addNewClimb = (munroNumber, date, weather, distance, time, friend, unitKm) => {
        const _munroNumber = parseInt(munroNumber)
        const _date = date.toString()
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

    getAllClimbs = () => {
        return new Promise((resolve, reject) => {
            this.db.transaction((tx) => {
                tx.executeSql(
                    "select * from myClimbs",
                    [],
                    (_, result) => resolve(result.rows._array),
                    (_, error) => reject(error)
                );
            },
                null,
            );
        })
    }

    LogAllClimbs = () => {
        this.db.transaction(
            (tx) => {
                tx.executeSql("select * from myClimbs", [], (_, { rows }) =>
                    console.log(JSON.stringify(rows._array))
                );
            },
            null,
        );
    }

    removeClimb = (key) => {
        this.db.transaction(
            (tx) => {
                tx.executeSql("DELETE FROM myClimbs WHERE id = (?)", [key])
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
}


module.exports = new Database()