import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import DetailScreen from "../screens/DetailScreen";
import AddClimbScreen from "../screens/AddClimbScreen";
import MyClimbsScreen from "../screens/MyClimbsScreen";
import Test from "../screens/Test";
import {add, getListAsync} from "../../redux/features/BaggedList";
import { useSelector, useDispatch } from "react-redux";

const Stack = createNativeStackNavigator();

// API path
const hillBaggerPath = "https://hill-bagging-api.onrender.com";
const munroQuery = "/munros";
const munroBaggerPath = `${hillBaggerPath}${munroQuery}`;

export default function HillFinderLS() {


    const testList = useSelector(state => state.baggedlist);
    const dispatch = useDispatch();


    // useEffect(() => {
    //   dispatch(getListAsync());
    //   },[])
    

    // API constants 
    const [munroData, setMunroData] = useState([]);
    const [Loading, setloading] = useState(false);
    const [error, setError] = useState(null);
    // reload API
    const [reloadMunroData, setReloadMunroData] = useState(false);
    const toggleSwitch = () => setReloadMunroData(previousState => !previousState);

    // get API data
    useEffect(() => {
        const fetchMunros = async () => {
        console.log("fetching Munro's");
        const munroResults = await fetch(munroBaggerPath)
        const munros = await munroResults.json();
        setMunroData(munros)
        setloading(false)
        }
        try {
        setloading(true)
        fetchMunros();
        }
        catch (error) {
        setloading(false)
        setError(error)
        }
    }, [reloadMunroData])

    if (Loading) {
        console.log("Loading")
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size='large' color='#3ECEB1' />
          </View>
        );
    }
    
    if (error) {
        console.log("error")
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>
              {error}
            </Text>
          </View>
        );
    }
    
    const munro = munroData[0]
    
    return (
        <Stack.Navigator 
        screenOptions={{
            headerShown: false
          }}
        initialRouteName="ListScreen">
            <Stack.Screen name="ListScreen" component={ListScreen} initialParams={{ munroData }} />
            <Stack.Screen name="DetailScreen" component={DetailScreen} initialParams={{ munro }} />
            <Stack.Screen name="AddClimbScreen" component={AddClimbScreen} initialParams={{ munro }} />
            <Stack.Screen name="MyClimbsScreen" component={MyClimbsScreen} />
            <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
    );
}