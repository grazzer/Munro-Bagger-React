import React from "react";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import Spacer from "../components/Spacer";
import Database from "../../Database";
import { SelectList } from 'react-native-dropdown-select-list'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { TimerPickerModal } from "react-native-timer-picker";



export default function AddClimbScreen({ navigation, route }) {


    Database.LogAllClimbs()
    const munro = route.params.munro

    const [munroNumber, setMunroNumber] = useState("")
    const [munroName, setMunroName] = useState("")
    const [date, setDate] = useState("")
    const [weather, setWeather] = useState("")
    const [distance, setDistance] = useState("")
    const [unitKm, setUnitKm] = useState("Km")
    const [time, setTime] = useState("0:0")
    const [friend, setFriend] = useState("")

    ///

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisible(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisible(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const setDateToday = () => {
        setSelectedDate(new Date());
    };

    const setDateYesterday = () => {
        setSelectedDate(new Date((new Date()).valueOf() - 1000 * 60 * 60 * 24));
    };

    const showTimePicker = () => {
        setShowPicker(true);
    };

    ///

    if (munro != null) {
        useEffect(() => {
            setMunroNumber(parseInt(munro.Number))
            setMunroName(munro.Name)
        }, []);
    }

    const data = [
        { key: '1', value: 'Km' },
        { key: '2', value: 'Miles' },

    ]

    return (
        <View style={styles.container}>
            <Text style={styles.tital}>Add New Climb</Text>
            <KeyboardAwareScrollView
                style={styles.inputContainerScroll}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.header}>Munro Details</Text>
                    {/* <View style={styles.divider} /> */}
                    {/* <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="always"
                value={munroNumber.toString()}
                onChangeText={queryText => setMunroNumber(parseInt(queryText))}
                placeholder="Insert Munro Number"
            // style={styles.searchBoxInput}
            /> */}
                    {/* number row */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Number:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <Text>
                                {munroNumber.toString()}
                            </Text>
                        </View>
                    </View>
                    {/* name row */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Name:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <Text>
                                {munroName}
                            </Text>
                        </View>
                    </View>
                    {/* date  */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Date:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <Text>{selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={setDateToday}>
                                <Text>Today</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={setDateYesterday}>
                                <Text>Yesterday</Text>
                            </TouchableOpacity>

                            {/* <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={selectedDate.toString()}
                                onChangeText={showDatePicker}
                                placeholder="Insert Date"
                                style={styles.searchBoxInput}
                                showSoftInputOnFocus={false}
                            /> */}
                        </View>
                    </View>

                    <DateTimePickerModal
                        date={selectedDate}
                        // isVisible={true}
                        style={{ width: 320, backgroundColor: "white" }}
                        isVisible={datePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />

                    {/* weather row */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Weather:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <Picker
                                selectedValue={weather}
                                style={{ height: 50, width: 240 }}
                                mode={"dialog"}
                                onValueChange={(itemValue) => setWeather(itemValue)}
                            >
                                <Picker.Item label="Sunny" value="sunny" />
                                <Picker.Item label="Raining" value="raining" />
                                <Picker.Item label="Overcast" value="overcast" />
                                <Picker.Item label="Snowing" value="snowing" />
                            </Picker>
                            {/* <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            clearButtonMode="always"
                            value={weather}
                            onChangeText={queryText => setWeather(queryText)}
                            placeholder="Select Weather"
                            style={styles.searchBoxInput}
                        /> */}
                        </View>
                    </View>
                    {/* distance row */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Distance:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <TextInput

                                keyboardType='numeric'
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={distance.toString()}
                                onChangeText={queryText => setDistance(parseInt(queryText))}
                                placeholder="Insert Distance Walked"
                                style={styles.searchBoxInputDistance}
                            />
                        </View>
                        <SelectList
                            setSelected={(val) => setUnitKm(val)}
                            placeholder={unitKm}
                            data={data}
                            save="value"
                            boxStyles={{ borderWidth: 0, padding: 0, marginTop: -8, width: 80 }}
                            inputStyles={{ margin: 0 }}
                            dropdownStyles={{ borderWidth: 0, backgroundColor: '#F5F5F5' }}
                            dropDownDirection="TOP"
                        />
                    </View>
                    {/* time row */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Time:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <TouchableOpacity onPress={showTimePicker}>
                                <Text>{time}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TimerPickerModal
                        visible={showPicker}
                        setIsVisible={setShowPicker}
                        hideSeconds={(true)}
                        onConfirm={(pickedDuration) => {
                            var newTime = pickedDuration.hours + ' : ' + pickedDuration.minutes
                            setTime(newTime);
                            setShowPicker(false);
                        }}
                        modalTitle="Select Duration"
                        onCancel={() => setShowPicker(false)}
                        closeOnOverlayPress
                        // LinearGradient={LinearGradient}
                        styles={{
                            theme: "light",
                        }}
                        modalProps={{
                            overlayOpacity: 0.2,
                        }}
                    />
                    {/* friends row */}
                    <View style={styles.row}>
                        <View style={styles.titleColumn}>
                            <Text style={styles.text}>
                                Friends:
                            </Text>
                        </View>
                        <View style={styles.inputColumn}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={friend}
                                onChangeText={queryText => setFriend(queryText)}
                                placeholder="Insert friends"
                                style={styles.searchBoxInput}
                            />
                        </View>
                    </View>
                    <Button
                        color='#3ECEB1'
                        title="Add Climb"
                        onPress={() => Database.addNewClimb(munroNumber, date, weather, distance, time, friend, unitKm)}
                        style={styles.button}
                    />
                </View >
            </KeyboardAwareScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

        justifyContent: 'center',
    },
    tital: {
        fontSize: 25,
        padding: 5,
        alignSelf: "center",
    },
    //
    inputContainerScroll: {
        flex: 1,
        margin: 20,
        backgroundColor: '#FFF',
        borderRadius: 20,
        // padding: 25,
        // alignItems: 'center',
        // justifyContent: 'space-around',

    },
    inputContainer: {
        flex: 1,
        // backgroundColor: 'red',
        padding: 10,
        // borderRadius: 20,
        // alignItems: 'center',
        // justifyContent: 'space-around',

    },
    //
    // inputContainer: {
    //     flex: 1,
    //     margin: 20,
    //     borderRadius: 20,
    //     backgroundColor: '#FFF',
    //     padding: 25,
    //     // justifyContent: 'space-between'
    // },
    header: {
        marginTop: 10,
        marginBottom: 35,
        fontSize: 22,
        alignSelf: "center",
    },
    row: {
        flexDirection: "row",
        margin: 15,
    },
    titleColumn: {
        // backgroundColor: "red",
        flex: 1
    },
    inputColumn: {
        // backgroundColor: "blue",
        flex: 2
    },
    text: {
        fontSize: 16,
    },
    searchBoxInput: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20
    },
    searchBoxInputDistance: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20
    },
    picker: {
        width: 100,
        fontSize: 2,
        color: 'red'
    },
    button: {

    }
});




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

