import React from "react";
import { Button, StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import Spacer from "../components/Spacer";

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

function Details({ IconName, data, size = 20 }) {
    let iconSize = size + 8;
    return (
        <View style={styles.InfoRow}>
            <Icon name={IconName} size={iconSize} color='#3ECEB1' style={styles.InfoSymble} />
            <Text style={{ fontSize: size }}> {data}</Text>
        </View>
    )
}

export default function DetailScreen({ route }) {
    const munro = route.params.munro

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}></View>
            <View style={styles.detailsContainer}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.details}>
                        <Text style={styles.name}>{munro.Name}</Text>
                        <Details IconName={'location'} data={munro.County} size={15} />
                        <Spacer size={20} />
                        <HightDetails hight={munro.Drop} seaLevel={munro.Metres} />
                        <Spacer size={20} />
                        <ClimbedDetails climbed={false} />
                        <Spacer size={20} />
                        <Map lat={munro.Latitude} lon={munro.Longitude} name={munro.Name} />
                    </View>
                </ScrollView>
            </View>

        </View >
    )
}

const HightDetails = ({ hight, seaLevel }) => {
    return (
        <View style={[styles.detailBox, styles.Shadow]}>
            <View style={styles.coulm}>
                <Details IconName={'mountain'} data={hight + ' m'} size={20} />
            </View>
            <View style={styles.coulm}>
                <Details IconName={'sea-level'} data={seaLevel + ' m'} size={20} />
            </View>
        </View>

    )
}


const ClimbedDetails = ({ climbed }) => {
    if (climbed == true) {
        return (
            <View>
                <Text style={styles.detailBoxTitalText}>Climbed</Text>
                <Spacer size={5} />
                <View style={[styles.detailBox, styles.Shadow]}>
                    <View style={styles.coulm}>
                        <Details IconName={'calendar'} data='data' size={20} />
                        <Spacer size={2} />
                        <Details IconName={'time'} data='data' size={20} />
                        <Spacer size={2} />
                        <Details IconName={'freinds'} data='data' size={20} />
                    </View>
                    <View style={styles.coulm}>
                        <Details IconName={'distance'} data='data' size={20} />
                        <Spacer size={2} />
                        <Details IconName={'weather'} data='data' size={20} />
                    </View>
                </View>
            </View>
        )
    }
    return (
        <View>
            <Text style={styles.detailBoxTitalText}>Climbed</Text>
            <Spacer size={5} />
            <View style={[styles.detailBox, styles.Shadow]}>
                <Button
                    color='#3ECEB1'
                    title="+ Add Climb"
                    onPress={() => console.log('pressed')}
                />
            </View>
        </View>
    )
}


const Map = ({ lat, lon, name }) => {
    return (
        <View>
            <Text style={styles.detailBoxTitalText}>Map</Text>
            <Spacer size={5} />
            <View style={[styles.mapBox, styles.Shadow]}>
                <MapView
                    style={styles.map}
                    region={initialRegion = {
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }} >

                    <Marker
                        coordinate={{
                            latitude: lat,
                            longitude: lon
                        }}
                        title={name}
                    />

                </MapView>
            </View>
        </View>
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
    image: {
        flex: 1,
        backgroundColor: '#3ECEB1'
    },

    name: {
        fontSize: 30
    },
    detailBox: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 8,
    },
    detailBoxTitalText: {
        fontSize: 20
    },
    Shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    },
    coulm: {
        flex: 1
    },
    climbButton: {

    },
    mapBox: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        borderRadius: 8,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
        aspectRatio: 2 / 1.4,
        width: '100%',
        height: '100%',
    },




    InfoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    InfoSymble: {
        aspectRatio: 1 / 1,
        margin: 2,
        paddingRight: 5,
        // backgroundColor = 
    },

});