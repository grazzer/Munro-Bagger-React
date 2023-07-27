import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import Spacer from './Spacer';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);


const MunroCard = (props) => {

    const { munro, climbed } = props
    if (climbed == true) {
        backpackColour = 'gold'
    }
    else { backpackColour = '#D9D8D8' }

    return (
        <View style={styles.munroContainer}>
            <View style={[styles.munroCard, styles.Shadow]}>
                <View style={styles.munroCardImage}></View>
                <View style={styles.munroCardDetails}>
                    <Text style={styles.munroNameText}>{munro.Name}</Text>
                    <Spacer size={5} />
                    <Details IconName="location" data={munro.County} />
                    <Details IconName="mountain" data={munro.Metres} />
                    <Details IconName="hashtag" data={munro.Number} />
                </View>
                <View style={styles.munroCardBag}>
                    <Icon name='backpack' size={22} color={backpackColour} />
                </View>
            </View>
        </View>
    )
}

// TO_LEARN whats the difference function or const?
function Details({ IconName, data }) {
    return (
        <View style={styles.InfoRow}>
            <Icon name={IconName} size={18} color='#3ECEB1' style={styles.InfoSymble} />
            <Text style={styles.InfoText}> {data}</Text>
        </View>
    )
}

// const details = test => {
//   return (
//     <View style={styles.InfoRow}>
//       <Icon name="hastag" size={18} color="red" style={styles.InfoSymble} />
//       <Text style={styles.InfoText}>test</Text>
//     </View>
//   )
// }


const styles = StyleSheet.create({
    InfoText: {
        fontSize: 16
    },
    InfoSymble: {
        margin: 2,
        paddingRight: 5,
    },
    InfoRow: {
        flexDirection: 'row',
        flex: 1
    },
    munroNameText: {
        fontSize: 20
    },
    munroCardBag: {
        flex: 1,
        position: "absolute", bottom: 12, right: 12
    },
    munroCardDetails: {
        flex: 6,
        paddingLeft: 15,
    },
    munroCardImage: {
        aspectRatio: 1 / 1,
        borderRadius: 8,
        backgroundColor: '#3ECEB1',
    },
    Shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10
    },
    munroCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        padding: 12,
        backgroundColor: '#FFF',
        borderRadius: 8,
        height: 130,
    },
    munroContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
});

export default MunroCard