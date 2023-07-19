import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import MunroCard from './src/components/MunroCard';

// font
import { useFonts } from 'expo-font';

const hillBaggerPath = "https://hill-bagging-api.onrender.com";
const munroQuery = "/munros";
const munroBaggerPath = `${hillBaggerPath}${munroQuery}`;

export default function App() {


  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("refresh")
    setTimeout(() => {
      setRefreshing(false);
      console.log("refresh")
    }, 2000);
  }, []);

  // load font 
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });


  const [munros, setMunros] = useState([]);
  const getMunros = 1;
  useEffect(() => {
    const fetchMunros = async () => {
      const munroResults = await fetch(munroBaggerPath)
      const munros = await munroResults.json();
      console.log("UseEffect runs");
      setMunros(munros)
    }
    fetchMunros();
  }, [])

  if (!fontsLoaded) {
    return (<Text>No Font</Text>);
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <FlatList
        keyExtractor={(item) => item.Number}
        data={munros}
        renderItem={({ item }) => (<MunroCard munro={item} climbed={true} />)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  test: {
    flex: 1,
    // borderRadius: 20,
  },
});