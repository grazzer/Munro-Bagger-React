import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Database from './Database'
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { StatusBar } from 'expo-status-bar';

import HillFinderLS from './src/loadingScreens/HillFinderLS';
import MyClimbsLS from './src/loadingScreens/MyClimbsLS';
import DataLS from './src/loadingScreens/DataLS.js';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';


export default function App() {

  Database.createDatabase()
 
  // load font 
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });


  // if (Loading) {
  //   console.log("Loading")
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size='large' color='#3ECEB1' />
  //     </View>
  //   );
  // }

  // if (error) {
  //   console.log("error")
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text style={{ fontSize: 18 }}>
  //         {error}
  //       </Text>
  //     </View>
  //   );
  // }

  if (!fontsLoaded) {
    return null;
    // console.log("no Font")
    // return (<Text>No Font</Text>);
  }

  return(
    <Provider store={store}>
      <StatusBar style="dark" />
      <DataLS/> 
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});