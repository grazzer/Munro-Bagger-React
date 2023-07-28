import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import Spacer from "../components/Spacer";
import DetailsBox from "../components/DetailsBox";
import DetailsRow from "./DetailsRow";

const DetailsAbout = ({ munro }) => {
    return (
        <DetailsBox title='About' cardStyle={styles.card}>
            <Text style={styles.text}>{'Classification:       ' + munro.Classification}</Text>
            <Text style={styles.text}>{'Summit feature:    ' + munro.Feature}</Text>
            <Text style={styles.text}>{'County top:            ' + munro.County_Top}</Text>
            <Text style={styles.text}>{'Survey:                    ' + munro.Survey}</Text>
            <Text style={styles.text}>{'Parent SMC:           ' + munro.Parent_name_SMC}</Text>
            <Text style={styles.text}>{'Parent Ma:              ' + munro.Parent_name_Ma}</Text>
            <Text style={styles.text}>{'Observations:        ' + munro.Observations}</Text>
            <Text style={styles.text}>{'Hill bagging URL:    ' + munro.Hill_bagging}</Text>
        </DetailsBox>
    )
}

const styles = StyleSheet.create({
    text: {
        padding: 2,
        fontSize: 15
    },
    card: {
        backgroundColor: '#FFF',
        // flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 8,
    },
})

export default DetailsAbout;