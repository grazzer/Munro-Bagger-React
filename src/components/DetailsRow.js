import React from "react";
import { StyleSheet, View, Text } from 'react-native';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

function DetailsRow({ IconName, data, size = 20 }) {
    let iconSize = size + 8;
    return (
        <View style={styles.InfoRow}>
            <Icon name={IconName} size={iconSize} color='#3ECEB1' style={styles.InfoSymble} />
            <Text style={{ fontSize: size }}> {data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

    InfoRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    InfoSymble: {
        aspectRatio: 1 / 1,
        margin: 2,
        paddingRight: 5,
        // backgroundColor = 
    }
})

export default DetailsRow;