import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Spacer from "../components/Spacer";
import DetailsBox from "../components/DetailsBox";
import DetailsRow from "./DetailsRow";


const CarouselCard = ({ item, index, navigation, munro }) =>{
    
    let assentNum = index + 1
    switch (assentNum) {
        case 1:
            assentNum = '1st'
            break;
        case 2:
            assentNum = '2nd'
            break;
        case 3:
            assentNum = '3rd'
            break;
        default:
            assentNum = (assentNum + 'th')
    }
    
    if (item.AddClimb == "true")
    {
        //TODO TouchableOpacity need to fill space, removed fixed pixel size
        return(
            <DetailsBox cardStyle={styles.customCard}>
                <View>
                    <TouchableOpacity
                        style = {styles.button}
                        onPress={() => navigation.navigate('AddClimbScreen', { munro })}
                    >
                        <Text>+</Text>
                    </TouchableOpacity>
                    <Text>Add New Climb</Text>
                </View>
            </DetailsBox>
        )
    }
    if (item.AddClimb == "noClimb")
        {
            //TODO TouchableOpacity need to fill space, removed fixed pixel size
            return(
                <DetailsBox cardStyle={styles.customCardAdd}>
                    <View>
                        <TouchableOpacity
                            style = {styles.button}
                            onPress={() => navigation.navigate('AddClimbScreen', { munro })}
                        >
                            <Text>+</Text>
                        </TouchableOpacity>
                        <Text>Add New Climb</Text>
                    </View>
                </DetailsBox>
            )
        }
    return(
        <DetailsBox cardStyle={styles.customCard}>
            <View style={styles.column}>
                <DetailsRow IconName={'hashtag'} data={assentNum + " assent"} size={15} />
                <Spacer size={2} />
                <DetailsRow IconName={'time'} data={"  " + item.time + " h"} size={15} />
            </View>
            <View style={styles.column}>
                <DetailsRow IconName={'calendar'} data={item.date} size={15} />
                <Spacer size={2} />
                <DetailsRow IconName={'distance'} data={item.distance + " Km"} size={15} />

            </View>
        </DetailsBox>
    )
}

const styles = StyleSheet.create({
    column: {
        flex: 1
    },
    customCard: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 15,
        margin: 15,
        height:100,
        borderRadius: 8,
    },

    customCardAdd: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 15,
        height:100,
        borderRadius: 8,
    },
    button: {
        // flex: 1,
        borderWidth:1,
        borderColor:'#3ECEB1',
        alignItems:'center',
        justifyContent:'space-around',
        alignSelf:'center',
        width:45,
        height:45,
        backgroundColor:'#fff',
        borderRadius:50,
      }
})

export default CarouselCard;