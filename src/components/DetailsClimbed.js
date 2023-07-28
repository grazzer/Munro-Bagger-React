import React from "react";
import { Button, StyleSheet, View } from 'react-native';
import Spacer from "../components/Spacer";
import DetailsBox from "../components/DetailsBox";
import DetailsRow from "./DetailsRow";

const DetailsClimbed = ({ climbed }) => {
    if (climbed == true) {

        return (
            <DetailsBox title='Climbed'>
                <View style={styles.column}>
                    <DetailsRow IconName={'calendar'} data='data' size={20} />
                    <Spacer size={2} />
                    <DetailsRow IconName={'time'} data='data' size={20} />
                    <Spacer size={2} />
                    <DetailsRow IconName={'freinds'} data='data' size={20} />
                </View>
                <View style={styles.column}>
                    <DetailsRow IconName={'distance'} data='data' size={20} />
                    <Spacer size={2} />
                    <DetailsRow IconName={'weather'} data='data' size={20} />
                </View>
            </DetailsBox>
        )
    }
    return (
        <DetailsBox title='Climbed'>
            <Button
                color='#3ECEB1'
                title="+ Add Climb"
                onPress={() => console.log('pressed')}
            />
        </DetailsBox>
    )
}

const styles = StyleSheet.create({
    column: {
        flex: 1
    }
})

export default DetailsClimbed;