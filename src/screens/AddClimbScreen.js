import React from "react";
import { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet, View, TextInput, Button, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Picker } from "@react-native-picker/picker";
import Spacer from "../components/Spacer";
import SafeViewAndroid from "../styleSheets/AndroidSafeArea.js";
import Database from "../../Database";
import { SelectList } from 'react-native-dropdown-select-list'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { TimerPickerModal } from "react-native-timer-picker";
import {add, getListAsync} from "../../redux/features/BaggedList";
import { useSelector, useDispatch } from "react-redux";

export default function AddClimbScreen({ navigation, route }) {

    const testList = useSelector(state => state.baggedlist);
    const dispatch = useDispatch();

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

    useEffect(() => {
        setDateToday();
    },[]);

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

    const changeUnits = () => {
        if(unitKm == "Km"){
            setUnitKm("mi")
        }
        if(unitKm == "mi"){
            setUnitKm("Km")
        }
    }

    // const data = [
    //     { key: '1', value: 'Km' },
    //     { key: '2', value: 'Miles' },

    // ]

    AddClimb = () => {
        let _month = selectedDate.getMonth() +1
        let _date =  selectedDate.getDate() + "/" + _month + "/" + selectedDate.getFullYear();

        console.log(distance)
        console.log(selectedDate)
        Database.addNewClimb(munroNumber, _date, weather, distance, time, friend, unitKm)

        dispatch(getListAsync());

        navigation.pop();
        // navigation.navigate('DetailScreen', { munro })
    }

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
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

                        <View style={{borderColor: 'lightgray', borderBottomWidth: 1, marginHorizontal: 20}}/>

                        {/* date  */}
                        <View style={styles.row}>
                            <View style={styles.titleColumn}>
                                <Text style={styles.text}>
                                    Date:
                                </Text>
                            </View>
                            <View style={styles.inputColumn}>
                                <Text>{selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}</Text>
                            </View>
                        </View>
                        <View style={styles.dateRow}>
                            <TouchableOpacity onPress={showDatePicker}>
                                <Text style={styles.clickableText}>Select Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={setDateToday}>
                                <Text style={styles.clickableText}>Today</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={setDateYesterday}>
                                <Text style={styles.clickableText}>Yesterday</Text>
                            </TouchableOpacity>
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

                        <View style={{borderColor: 'lightgray', borderBottomWidth: 1, marginHorizontal: 20}}/>

                        {/* weather row */}
                        <View style={styles.row}>
                            <View style={styles.titleColumn}>
                                <Text style={styles.text}>
                                    Weather:
                                </Text>
                            </View>
                            {/* TODO Fix width of picker */}
                            <View style={styles.inputColumn}>
                                    <Picker
                                        selectedValue={weather}
                                        style={{ height: 5, width: 180, color: '#3ECEB1', marginLeft: -16,}}
                                        mode={"dialog"}
                                        onValueChange={(itemValue) => setWeather(itemValue)}
                                    >
                                        <Picker.Item label="Sunny" value="sunny" />
                                        <Picker.Item label="Raining" value="raining" />
                                        <Picker.Item label="Overcast" value="overcast" />
                                        <Picker.Item label="Snowing" value="snowing" />
                                    </Picker>
                            </View>
                        </View>

                        <View style={{borderColor: 'lightgray', borderBottomWidth: 1, marginHorizontal: 20}}/>

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
                                    placeholder="distance"
                                    style={styles.searchBoxInputDistance}
                                />
                                <TouchableOpacity onPress={changeUnits}
                                style={{marginHorizontal:5, paddingHorizontal:5, }}>
                                    <Text style={styles.clickableText}>{unitKm}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{borderColor: 'lightgray', borderBottomWidth: 1, marginHorizontal: 20}}/>

                        {/* time row */}
                        <View style={styles.row}>
                            <View style={styles.titleColumn}>
                                <Text style={styles.text}>
                                    Time:
                                </Text>
                            </View>
                            <View style={styles.inputColumn}>
                                <TouchableOpacity onPress={showTimePicker}>
                                    <Text style={{color: '#3ECEB1'}}>{time}</Text>
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

                        <View style={{borderColor: 'lightgray', borderBottomWidth: 1, marginHorizontal: 20}}/>

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
                                    style={styles.searchBoxInputDistance}
                                />
                            </View>
                        </View>
                        <Button
                            color='#3ECEB1'
                            title="Add Climb"
                            onPress={() => AddClimb()}
                            style={styles.button}
                        />
                    </View >
                </KeyboardAwareScrollView>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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
        flex: 1,
        alignItems: 'center',
        flexDirection: "row",
        margin: 15,

    },
    dateRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom : 15,
        paddingLeft: 60
    },
    titleColumn: {
        flex: 1,
    },
    inputColumn: {
        // backgroundColor: "blue",
        flexDirection: 'row',
        flex: 1.5, 
    },
    text: {
        fontSize: 16,
    },
    searchBoxInput: {
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 20
    },
    searchBoxInputDistance: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderColor: '#3ECEB1',
        borderWidth: 1,
        borderRadius: 5,
        alignSelf: "center",
        paddingHorizontal: 20
    },
    picker: {
        width: 100,
        fontSize: 2,
        color: 'red'
    },
    button: {

    },
    clickableText: {
        color: '#3ECEB1'
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



