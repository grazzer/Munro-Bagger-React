import React from "react";
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';

import HillFinderLS from './HillFinderLS';
import MyClimbsLS from './MyClimbsLS';

const Icon = createIconSetFromIcoMoon(
    require('../../assets/icomoon/selection.json'),
    'IcoMoon',
    'icomoon.ttf'
);

const Tab = createBottomTabNavigator();

export default function BottomNavLS() {

  return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName = "HillFinder"
                screenOptions = {({route}) =>
                ({
                    tabBarIcon: ({color, size, focused}) =>
                    {
                        let iconName;

                        switch (route.name) {
                        case "HillFinder":
                            iconName = "mountain"
                            break;
                        case "MyClimbs":
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
                <Tab.Screen name="HillFinder" component={HillFinderLS} />
                <Tab.Screen name="MyClimbs" component={MyClimbsLS} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}