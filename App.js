import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import MunroCard from './src/components/MunroCard';
import { useFonts } from 'expo-font';
import filter from 'lodash.filter';


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
      setError(error)
    }
    finally {
      setloading(false)
    }
  }, [reloadMunroData])

  //Munro list search bar constants
  const [query, setQuery] = useState('');
  const [ListData, setListData] = useState([]);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(munroData, munro => {
      return contains(munro.Name, munro.Number, formattedQuery);
    });
    setListData(filteredData);
    setQuery(text);
  };

  const contains = (Name, query) => {

    if (Name.includes(query)) {
      return true;
    }

    return false;
  };


  // load font 
  const [fontsLoaded] = useFonts({
    IcoMoon: require('./assets/icomoon/icomoon.ttf'),
  });

  // //TODO - loading componenet occours when flat list is refreshing too
  // // refresh constants 
  // const [RefreshingList, setRefreshingList] = React.useState(false);

  // // refresh FlatList
  // const onRefresh = React.useCallback(() => {
  //   setRefreshingList(true);
  //   console.log("refresh")
  //   toggleSwitch()
  //   setTimeout(() => {
  //     console.log("refreshed")
  //     setRefreshingList(false);
  //   }, 2000);
  // }, []);


  if (Loading) {
    console.log(RefreshingList)
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

  // font loaded check 
  if (!fontsLoaded) {
    return (<Text>No Font</Text>);
  }

  return (
    <View style={styles.container}>
      {/* <StatusBar style="auto" /> */}
      <FlatList
        keyExtractor={(item) => item.Number}
        data={munroData}
        renderItem={({ item }) => (<MunroCard munro={item} climbed={false} />)}
        ListHeaderComponent={renderHeader}
      // refreshControl={
      //   <RefreshControl refreshing={RefreshingList} onRefresh={onRefresh} />
      // } 
      />
    </View>
  );

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={queryText => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }
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