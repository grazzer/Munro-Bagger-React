import React, {useState, useEffect} from "react";
import { Button, StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Spacer from "../components/Spacer";
import DetailsBox from "../components/DetailsBox";
import DetailsRow from "./DetailsRow";
import CarouselCard from "../components/DetailsCarouselCard";

const DetailsClimbed = ({ navigation, climbed, climbedList, munro }) => {
    
    const [activeIndex, setActiveIndex] = useState(0);

    function render(data){
        return (<CarouselCard item={data.item} index={data.index} navigation={navigation} munro={munro} />)
    }

    if (climbedList.length > 0) {
        return (
            <DetailsBox title='My Climbs' cardStyle={styles.customCard}>
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
        <DetailsBox title='Add Climb'>
            <CarouselCard item={{"AddClimb": "noClimb"}} index={0} navigation={navigation} munro={munro} />
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
})

export default DetailsClimbed;