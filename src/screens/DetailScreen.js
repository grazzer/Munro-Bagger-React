import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Spacer from "../components/Spacer";
import SafeViewAndroid from "../styleSheets/AndroidSafeArea.js";
import DetailsHeight from "../components/DetailsHeight";
import DetailsMap from "../components/DetailsMap";
import DetailsClimbed from "../components/DetailsClimbed";
import DetailsRow from "../components/DetailsRow";
import DetailsAbout from "../components/DetailsAbout";
import { useSelector } from "react-redux";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

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
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.container}
                        source={{uri: 'https://hillsummits.piwigo.com/_datas/6/9/w/69wjfjw5b4/i/uploads/6/9/w/69wjfjw5b4//2014/11/06/20141106210829-ca587d79-me.jpg',}}                           
                    />
                </View>
                <View style={styles.detailsContainer}>
                    <ScrollView >
                        <View style={styles.details}>
                            <Text style={styles.name}>{munro.Name}</Text>
                            <DetailsRow IconName={'hashtag'} data={munro.Number} size={15} />
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
                <TouchableOpacity
                            style = {styles.button}
                            onPress={() => navigation.goBack()}
                        >
                            <Icon name='back' size={40} color='#3ECEB1' style={styles.icon} />
                </TouchableOpacity>
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
        // backgroundColor: '#3ECEB1'
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
    },
    button: {
        alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        position: 'absolute',                                          
        top: 10,                                                    
        left: 10,
        borderRadius:100,
        backgroundColor: '#00000000',
        // backgroundColor: 'white'
    },
    icon: {
        aspectRatio: 1 / 1,
    }
});