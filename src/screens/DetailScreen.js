import React from "react";
import { StyleSheet, Text, View } from 'react-native';
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

export default function DetailScreen({ munro }) {

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
    const climbedDetails = ({ hight, seaLevel }) => {
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

    return (
        <View style={styles.container}>
            <View style={styles.image}></View>
            <View style={styles.details}>
                <Text style={styles.name}>{munro.Name}</Text>
                <Details IconName={'location'} data={munro.County} size={15} />
                <Spacer size={10} />
                <HightDetails hight={munro.Drop} seaLevel={munro.Metres} />
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        backgroundColor: '#3ECEB1'
    },
    details: {
        flex: 3,
        marginTop: -20,
        borderRadius: 20,
        padding: 20,
        backgroundColor: '#F5F5F5',
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