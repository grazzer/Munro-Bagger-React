import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableWithoutFeedback, ActivityIndicator, TextInput, SafeAreaView, Dimensions, TouchableOpacity, Alert, Modal, Button } from 'react-native';
import Database from "../../Database";
import SafeViewAndroid from "../styleSheets/AndroidSafeArea.js";
import Spacer from "../components/Spacer";
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import {add, getListAsync} from "../../redux/features/BaggedList";
import {getMunroAsync} from "../../redux/features/MunroList";
import { useSelector, useDispatch } from "react-redux";
import fetchMunrosAPI from "../services/HillDataBaseAPI";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { BlurView } from 'expo-blur';

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);


export default function MyClimbsScreen({ navigation, route }) {

    const myClimbsState = useSelector(state => state.baggedlist);
    const munroData = useSelector(state => state.munroList);
    const dispatch = useDispatch();

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [logNum, setLogNum] = useState(null);

    const handleDeleteModal = (bool, logNum) => {
        setDeleteModalVisible(bool)
        setLogNum(logNum)
    };

    const deleteClimb = () => {
        Database.removeClimb(logNum)
        dispatch(getListAsync());
        handleDeleteModal(false, null)
    }

    // data = Database.getAllClimbs()
    //     return await data.then(
    //         (climbsData) => {
    //             return climbsData;
    //         },
    //         (message) => {
    //             console.log("Error: " + message)
    //     })  


    return (  
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <Modal
                    animationType="slide"
                    transparent={true}
                    visible={deleteModalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setDeleteModalVisible(!deleteModalVisible);
                    }}
                >
                    <BlurView intensity={100} tint="light" style={styles.modal}>
                        <View style={styles.modal}/>
                        <View style={styles.modal}>
                            <View style={styles.ModalContainer}>
                                <Text style={styles.ModalTitle}> Delete Log </Text>
                                <Text style={styles.ModalText}> Are you sure you want to delete this log? </Text>
                                <View style={styles.ModalRow}>
                                    <TouchableOpacity style={styles.modelButton} onPress={() => deleteClimb()}>
                                        <Text style={styles.modelText}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.modelButton} onPress={() => handleDeleteModal(false)}>
                                        <Text style={styles.modelText}>No</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.modal}/>
                    </BlurView>
                </Modal>
            <View style={styles.container}>
                <Text style={styles.tital}>My Climbs</Text>
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item) => item}
                    data={myClimbsState.assentList}
                    renderItem={({ item }) => (<ClimbedCard munro={item} allClimbs={myClimbsState.climbData} munroData={munroData.munroList} changeState={handleDeleteModal}/>)}
                />
            </View>
        </SafeAreaView>
    );
}

const ClimbedCard = (props) => {
    const { munro, allClimbs, munroData, changeState } = props

    const array = allClimbs.filter(item => item.munro == munro);
    const hillData = munroData.filter(item => item.Number == munro);
    const _hillData = hillData[0]
    const [activeIndex, setActiveIndex] = useState(0);


    function render(data){
        // return(<Text>{data.index}</Text>);
        return (<CarouselCard climb={data.item} index={data.index} changeState={changeState}/>)
        // return (<CarouselCard climb={data.item} index={data.index} navigation={navigation} munro={munro} />)
    }

    return (
            <View style={styles.munroContainer}> 
                <View style={[styles.munroCard, styles.Shadow]}>
                    <View style={styles.munroCardDetails}>
                        <Text style={styles.munroNameText} numberOfLines={1}>{_hillData.Name}</Text>
                        <Details IconName="hashtag" data={_hillData.Number} />
                        <Spacer size={5} />
                        <Details IconName="location" data={_hillData.County} />
                        <Spacer size={15} />
                        <View
                            style={{
                                borderBottomColor: 'gray',
                                borderBottomWidth: StyleSheet.hairlineWidth,
                            }}
                        />
                        <Spacer size={15} />
                        <Carousel

                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={array}
                            renderItem={render}
                            // TODO FIX WIDTH
                            sliderWidth={300}
                            itemWidth={300}
                            enableSnap={true} 
                            onSnapToItem={(slideIndex) => setActiveIndex(slideIndex)}
                        />
                        <View padding={8} margin={4}>
                        <Pagination
                        activeDotIndex={activeIndex}
                        dotsLength={array.length}
                        containerStyle={{
                            paddingVertical: 0, 
                        }}
                        dotStyle={{
                            marginHorizontal:6,
                            backgroundColor: '#3ECEB1',
                        }}
                        />
                    </View>
                        {/* <FlatList
                            keyExtractor={(item) => item.id}
                            data={array}
                            renderItem={({ item, index }) => (<ShowClimb climb={item} assent={index} />)}
                        // ListEmptyComponent
                        /> */}
                    </View>
                </View>
            </View>
    )
}

function CarouselCard({climb, index, changeState}){

    function popup(){
        changeState(true, climb.id)
    }

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

    return(
        <View style={styles.carouselCard}>
            <View style={styles.carouselCardRow}>
                <View style={styles.carouselCardCol}>
                    <Text>{assentNum} assent</Text>
                </View>
                <View style={styles.carouselCardCol}>
                    <TouchableOpacity
                                onPress={() => popup()}
                            >
                        <Icon name="backpack" size={18} color='#3ECEB1' style={styles.carouselCardColBin}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.carouselCardRow}>
                <View style={styles.carouselCardCol}>
                    <Details IconName="calendar" data={climb.date}/>
                </View>

            </View>
            <View style={styles.carouselCardRow}>
                <View style={styles.carouselCardCol}>
                    <Details IconName="distance" data={climb.distance}/>
                </View>
                <View style={styles.carouselCardCol}>
                    <Details IconName="time" data={' ' + climb.time}/>
                </View>
                <View style={styles.carouselCardCol}>
                    <Details IconName="weather" data={climb.weather}/>
                </View>
            </View>
            <Details IconName="freinds" data={climb.freind}/>
        </View>
    )    
}


// function ShowClimb({ climb, assent }) {
//     const [show, setShow] = useState(false);
//     let assentNum = assent + 1
//     switch (assentNum) {
//         case 1:
//             assentNum = '1st'
//             break;
//         case 2:
//             assentNum = '2nd'
//             break;
//         case 3:
//             assentNum = '3rd'
//             break;
//         default:
//             assentNum = (assentNum + 'th')
//     }

//     if (show) {
//         return (
//             <View>
//                 <TouchableWithoutFeedback onPress={() => setShow(false)}>
//                     <View>
//                         <Details IconName="hashtag" data={assentNum + ' assent'} />
//                         <Spacer size={5} />
//                         <View
//                             style={{
//                                 borderBottomColor: 'black',
//                                 borderBottomWidth: StyleSheet.hairlineWidth,
//                             }}
//                         />
//                         <Spacer size={5} />
//                     </View>
//                 </TouchableWithoutFeedback>
//                 <Details IconName="calendar" data={climb.date} />
//                 <Details IconName="distance" data={climb.distance} />
//                 <Details IconName="time" data={' ' + climb.time} />
//                 <Details IconName="weather" data={climb.weather} />
//                 <Details IconName="freinds" data={climb.freind} />
//                 <View style={styles.munroCardBag}>
//                     <Icon name='backpack' size={22} />
//                 </View>
//                 <Spacer size={10} />
//             </View>
//         )

//     }
//     else {
//         return (
//             <TouchableWithoutFeedback onPress={() => setShow(true)}>
//                 <View>
//                     <Details IconName="hashtag" data={assentNum + ' assent'} />
//                     <Spacer size={5} />
//                     <View
//                         style={{
//                             borderBottomColor: 'black',
//                             borderBottomWidth: StyleSheet.hairlineWidth,
//                         }}
//                     />
//                     <Spacer size={5} />
//                 </View>
//             </TouchableWithoutFeedback >
//         )
//     }
// }

function Details({ IconName, data }) {
    return (
        <View style={styles.InfoRow}>
            <Icon name={IconName} size={18} color='#3ECEB1' style={styles.InfoSymble} />
            <Text style={styles.InfoText} numberOfLines={1}> {data}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#F5F5F5',
    },
    tital: {
        fontSize: 25,
        padding: 5,
        alignSelf: "center",
    },
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
        // height: 130,
    },
    munroContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    flatList: {
        flex: 1,
        borderRadius: 20,
        marginBottom: 20
    },
    carouselCard: {
        flex: 1,

    },
    carouselCardRow: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5
    },
    carouselCardCol: {
        flex: 1,
    },
    carouselCardColBin: {
        flex: 1,
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    modal:{
        flex: 1,
    },
    ModalContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#3ECEB1',
        padding: 10
    },
    ModalTitle: {
        alignSelf: 'center',
        fontSize: 20,
        padding: 20
    },
    ModalText: {
        alignSelf: 'center',
        paddingBottom: 30
    },
    ModalRow: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    vodelButttonRow: {

    },
    modelButton: {
        backgroundColor: '#3ECEB1',
        alignItems: 'center',
        backgroundColor: '#3ECEB1',
        borderRadius: 5,
        marginHorizontal: 10,
        width: 80,
        padding: 8,
        },
    modelText: {
        color: 'white',
        fontSize: 20,
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }
})

