import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import ListScreen from '../screens/ListScreen';
import DetailScreen from "../screens/DetailScreen";
import AddClimbScreen from "../screens/AddClimbScreen";
import MyClimbsScreen from "../screens/MyClimbsScreen";
import Test from "../screens/Test";
import {getMunroAsync} from "../../redux/features/MunroList";
import {getListAsync} from "../../redux/features/BaggedList";
import { useSelector, useDispatch } from "react-redux";

import BottomNavLS from "./BottomNavLS";


export default function HillFinderLS() {

    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getMunroAsync());
      dispatch(getListAsync());
      },[])

    const muroList = useSelector(state => state.munroList);

    const munroData = muroList
    const munro = munroData[0]

  if (muroList.status == "pending") {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#3ECEB1' />
        <Text fontcolor='#3ECEB1'>LOADING YOUR MUNRO DATA</Text>
      </View>
    );
  }

  if (muroList.status == "rejected") {
      console.log("error")
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18 }}>
            {error}
          </Text>
        </View>
      );
  }

  return (
    <BottomNavLS/>
  );
}