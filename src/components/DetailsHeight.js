import React from "react";
import { Button, StyleSheet, View } from 'react-native';
import DetailsBox from "./DetailsBox";
import DetailsRow from "./DetailsRow";

const DetailsHeight = ({ hight, seaLevel }) => {
    return (
        <DetailsBox title='Height'>
            <View style={styles.column}>
                <DetailsRow IconName={'mountain'} data={hight + ' m'} size={20} />
            </View>
            <View style={styles.column}>
                <DetailsRow IconName={'sea-level'} data={seaLevel + ' m'} size={20} />
            </View>
        </DetailsBox>

    )
}

const styles = StyleSheet.create({
    column: {
        flex: 1
    }
})

export default DetailsHeight;