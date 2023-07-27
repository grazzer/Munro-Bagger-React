import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import { useFonts } from 'expo-font';
import ListScreen from './src/screens/ListScreen';
import DetailScreen from "./src/screens/DetailScreen";


// API path
const hillBaggerPath = "https://hill-bagging-api.onrender.com";
const munroQuery = "/munros";
const munroBaggerPath = `${hillBaggerPath}${munroQuery}`;

export default function App() {

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


  // load font 
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });


  if (Loading) {
    console.log("Loading")
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color='#3ECEB1' />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>
          {error}
        </Text>
      </View>
    );
  }

  if (!fontsLoaded) {
    return (<Text>No Font</Text>);
  }

  return (
    <DetailScreen munro={munroData[10]} />
    // <ListScreen list={munroData} />
  );

}

const styles = StyleSheet.create({
  container: {
  },
});