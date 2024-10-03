import React from "react";
import { StyleSheet, Text, View } from 'react-native';
import Spacer from "../components/Spacer";

const DetailsBox = ({ title, cardStyle = styles.card, children }) => {

    if (title != null){
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <Spacer size={5} />
                <View style={[cardStyle, styles.Shadow]}>
                    {children}
                </View>
            </View>
        )
    }
    else {
        return (
            <View style={styles.container}>
                <Spacer size={5} />
                <View style={[cardStyle, styles.Shadow]}>
                    {children}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    text: {
        fontSize: 20
    },
    card: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignSelf:'stretch',
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
    }
})

export default DetailsBox;