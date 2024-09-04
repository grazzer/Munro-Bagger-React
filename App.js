import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import Database from './Database'
import { store } from "./redux/store";
import { Provider } from "react-redux";

import HillFinderLS from './src/loadingScreens/HillFinderLS';
import MyClimbsLS from './src/loadingScreens/MyClimbsLS';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

const Icon = createIconSetFromIcoMoon(
    require('./assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

const Tab = createBottomTabNavigator();

// // API path
// const hillBaggerPath = "https://hill-bagging-api.onrender.com";
// const munroQuery = "/munros";
// const munroBaggerPath = `${hillBaggerPath}${munroQuery}`;

export default function App() {

  // is
  Database.createDatabase()

  // // API constants 
  // const [munroData, setMunroData] = useState([]);
  // const [Loading, setloading] = useState(false);
  // const [error, setError] = useState(null);
  // // reload API
  // const [reloadMunroData, setReloadMunroData] = useState(false);
  // const toggleSwitch = () => setReloadMunroData(previousState => !previousState);

  // // get API data
  // useEffect(() => {
  //   const fetchMunros = async () => {
  //     console.log("fetching Munro's");
  //     const munroResults = await fetch(munroBaggerPath)
  //     const munros = await munroResults.json();
  //     setMunroData(munros)
  //     setloading(false)
  //   }
  //   try {
  //     setloading(true)
  //     fetchMunros();
  //   }
  //   catch (error) {
  //     setloading(false)
  //     setError(error)
  //   }
  // }, [reloadMunroData])


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
    console.log("no Font")
    return (<Text>No Font</Text>);
  }

  // const munro = munroData[0]
  // if (munroData) {
  return (
    <Provider store={store}>
          <NavigationContainer>
            <Tab.Navigator
            initialRouteName = "HillFinder"
            screenOptions = {({route}) =>
            ({
              tabBarIcon: ({color, size, focused}) =>
              {
                let iconName;

                switch (route.name) {
                  case "Hill Finder":
                    iconName = "mountain"
                    break;
                  case "My Climbs":
                      iconName = "backpack"
                      break;
                }
                return <Icon name={iconName} size={size} color={color}/>
              },
              tabBarLabel: ({children, color, focused}) => 
              (
                <Text style={{
                  fontSize: 10,
                  color,
                  fontWeight: focused? "bold" : "normal" 
                }}>
                  {children}
                </Text>
              ),
              tabBarActiveTintColor: '#3ECEB1',
              tabBarInactiveTintColor: 'lightgray',
              headerShown: false
            })}>
              {/* <Tab.Screen name="HillFinder" component={HillFinderLS} initialParams={{ munroData, munro }} /> */}
              <Tab.Screen name="Hill Finder" component={HillFinderLS} />
              <Tab.Screen name="My Climbs" component={MyClimbsLS} />
            </Tab.Navigator>
          </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});