import React from "react";
import { StyleSheet } from 'react-native';
import { useState, useEffect } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DetailsBox from "./DetailsBox";

const DetailsMap = ({ lat, lon, name }) => {


    // https://stackoverflow.com/questions/72485989/react-native-maps-google-directions-toolbar
    // possible solution for directing uer to maps app, needed for ios
    return (
        <DetailsBox title='Map' cardStyle={styles.card} >
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                region={initialRegion = {
                    latitude: lat,
                    longitude: lon,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                }} 
                mapType="terrain"
                showsCompass={true}
                showsScale={true}
                toolbarEnabled={true} >

                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: lon
                    }}
                    title={name}
                />
            </MapView>
        </DetailsBox>
    )
}


const styles = StyleSheet.create({
    card: {
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
})

export default DetailsMap;