import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import Spacer from "../components/Spacer";
import SafeViewAndroid from "../styleSheets/AndroidSafeArea.js";
import DetailsHeight from "../components/DetailsHeight";
import DetailsMap from "../components/DetailsMap";
import DetailsClimbed from "../components/DetailsClimbed";
import DetailsRow from "../components/DetailsRow";
import DetailsAbout from "../components/DetailsAbout";
import { useSelector } from "react-redux";

export default function DetailScreen({ navigation, route }) {
    const munro = route.params.munro

    const [climbedData, setClimbedData] = useState([])

    const myClimbsState = useSelector(state => state.baggedlist);
    
    useEffect (() => {
        if (myClimbsState.assentList.includes(munro.Number)){
            const result = myClimbsState.climbData.filter((data) => data.munro == munro.Number);
            result.push({"AddClimb": "true"})
            setClimbedData(result);
        }
    },[myClimbsState])

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View style={styles.container}>
                <View style={styles.imageContainer}></View>
                <View style={styles.detailsContainer}>
                    <ScrollView >
                        <View style={styles.details}>
                            <Text style={styles.name}>{munro.Name}</Text>
                            <DetailsRow IconName={'location'} data={munro.County} size={15} />
                            <Spacer size={20} />
                            <DetailsHeight hight={munro.Drop} seaLevel={munro.Metres} />
                            <Spacer size={20} />
                            <DetailsClimbed climbed={true} climbedList={climbedData} munro={munro} navigation={navigation} />
                            <Spacer size={20} />
                            <DetailsMap lat={munro.Latitude} lon={munro.Longitude} name={munro.Name} />
                            <Spacer size={20} />
                            <DetailsAbout munro={munro} />
                        </View>
                    </ScrollView>
                </View>
            </View >
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageContainer: {
        flex: 1,
        backgroundColor: '#3ECEB1'
    },
    detailsContainer: {
        flex: 3,
        marginTop: -20,
    },
    details: {
        // flex: 3,
        // marginTop: -20,
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    name: {
        fontSize: 30
    }
});