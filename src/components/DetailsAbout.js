import React from "react";
import { Text, StyleSheet, View } from 'react-native';
import Spacer from "../components/Spacer";
import DetailsBox from "../components/DetailsBox";
import DetailsRow from "./DetailsRow";
import { A } from '@expo/html-elements';

const DetailsAbout = ({ munro }) => {
    return (
        <DetailsBox title='About' cardStyle={styles.card}>
            <View>
                <View>
                    <Row leftText={'Classification:'} rightText={munro.Classification}/>
                    <Row leftText={'County top:'} rightText={munro.Feature}/>
                    <Spacer size={20}/>
                    {/* <Row leftText={'Parent SMC:'} rightText={munro.Parent_name_SMC}/>
                    <Row leftText={'Parent Ma:'} rightText={munro.Parent_name_Ma}/>
                    <Spacer size={20}/> */}
                    <Row leftText={'Summit feature:'} rightText={munro.Feature}/>
                    <Row leftText={'Observations:'} rightText={munro.Observations}/>
                    <Spacer size={20}/>
                    <Row leftText={'Survey:'} rightText={munro.Survey}/>
                </View>
                <Spacer size={20}/>
                <View style={styles.linkContainer}>
                    <A style={styles.textLink} href={munro.Hill_bagging}>See Hill bagging Database</A>
                </View>
            </View>
        </DetailsBox>
    )
}

const Row = ({leftText, rightText}) => {
    return(
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.text}>{leftText}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.text}>{rightText}</Text>                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    column: {
        flex: 1
    },


    linkContainer: {
        alignItems:'center',
    },
    text: {
        padding: 2,
        fontSize: 15,

    },
    textLink: {
        padding: 4,
        fontSize: 18,
        color: '#3ECEB1',
    },
    card: {
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        padding: 15,
        borderRadius: 8,
    },
})

export default DetailsAbout;