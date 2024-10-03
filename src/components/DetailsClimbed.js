import React, {useState, useEffect} from "react";
import { Button, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Spacer from "../components/Spacer";
import DetailsBox from "../components/DetailsBox";
import DetailsRow from "./DetailsRow";
import Carousel, { Pagination } from 'react-native-snap-carousel';

const DetailsClimbed = ({ navigation, climbed, climbedList, munro }) => {
    
    const [activeIndex, setActiveIndex] = useState(0);

    function render(data){
        return (<DetailsClimbedCard item={data.item} index={data.index} navigation={navigation} munro={munro} />)
    }

    if (climbedList.length > 0) {
        return (
            <DetailsBox title='Climbed' cardStyle={styles.customCard}>
                <View flexDirection={"column"}>
                    <View>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={climbedList}
                            renderItem={render}
                            sliderWidth={Dimensions.get("window").width-40}
                            itemWidth={Dimensions.get("window").width-40}
                            enableSnap={true} 
                            onSnapToItem={(slideIndex) => setActiveIndex(slideIndex)}
                        />
                    </View>
                    <View padding={8} margin={4}>
                        <Pagination
                        activeDotIndex={activeIndex}
                        dotsLength={climbedList.length}
                        containerStyle={{
                            paddingVertical: 0, 
                        }}
                        dotStyle={{
                            marginHorizontal:6,
                            backgroundColor: '#3ECEB1',
                        }}
                        />
                    </View>
                 </View>
            </DetailsBox>
        )
    }
    return (
        <DetailsBox title='Climbed'>
            <Button
                color='#3ECEB1'
                title="+ Add Climb"
                onPress={() => navigation.navigate('AddClimbScreen', { munro })}
            />
        </DetailsBox>
    )
}

const DetailsClimbedCard = ({ item, index, navigation, munro }) =>{
    if (item.AddClimb == "true")
    {
        //TODO TouchableOpacity need to fill space, removed fixed pixel size
        return(
            <DetailsBox cardStyle={styles.customCardSlider}>
                <View flexDirection={"column"} alignItems={"center"} flex={1}>
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
        <DetailsBox cardStyle={styles.customCardSlider}>
            <View style={styles.column}>
                <DetailsRow IconName={'hashtag'} data={item.id} size={15} />
                <Spacer size={2} />
                <DetailsRow IconName={'time'} data={item.time} size={15} />
            </View>
            <View style={styles.column}>
                <DetailsRow IconName={'calendar'} data={item.date} size={15} />
                <Spacer size={2} />
                <DetailsRow IconName={'distance'} data={item.distance} size={15} />

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
        alignSelf:'stretch',
        justifyContent: 'space-between',
        padding: 0,
        borderRadius: 8,
    },
    customCardSlider: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignSelf:'stretch',
        justifyContent: 'space-between',
        padding: 15,
        margin: 15,
        borderRadius: 8,
        justifyContent: 'space-around',
    },
    button: {
        flex: 1,
        borderWidth:1,
        borderColor:'#3ECEB1',
        alignItems:'center',
        justifyContent:'center',
        width:45,
        height:45,
        backgroundColor:'#fff',
        borderRadius:50,
      }
})

export default DetailsClimbed;