import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput, Button, TouchableHighlight, SafeAreaView } from 'react-native';
import MunroCard from "../components/MunroCard";
import SafeViewAndroid from "../styleSheets/AndroidSafeArea.js";
import filter from 'lodash.filter';

// TODO - VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc. {"contentLength": 11917.8662109375, "dt": 778, "prevDt": 710}

export default function ListScreen({ navigation, route }) {
    const list = route.params.munroData

    const [query, setQuery] = useState('');
    const [ListData, setListData] = useState([]);

    // TO_LEARN the .Name is not always readable, what is happening here
    useEffect(() => {
        // console.log(list[0].Name);
        setListData(list);
        // console.log(list[0].Name);
    }, [])

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(list, munro => {
            return contains(munro.Name, formattedQuery);
        });
        setListData(filteredData);
        setQuery(text);
    };
    const contains = (Name, query) => {
        if (Name.toLowerCase().includes(query)) {
            return true;
        }
        return false;
    };
     
    test = () =>{console.log("PRESSED BAG")};

    return (
        <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
            <View style={styles.container}>
                <Text style={styles.tital}>Munros</Text>
                <FlatList
                    style={styles.flatList}
                    keyExtractor={(item) => item.Number}
                    data={ListData}
                    renderItem={({ item }) => (<MunroCard munro={item} climbed={false} navigation={navigation}/>)}

                    ListHeaderComponent={
                        <View style={styles.searchBox}>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={query}
                                onChangeText={queryText => setQuery(queryText) | handleSearch(queryText)}
                                placeholder="Search"
                                style={styles.searchBoxInput}
                            />
                        </View>}
                // refreshControl={
                //   <RefreshControl refreshing={RefreshingList} onRefresh={onRefresh} />
                // } 
                />
            </View>
        </SafeAreaView>
    );
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
    flatList: {
        flex: 1,
        borderRadius: 20,
        marginBottom: 0
        // TODO maybe have a fade out here
    },
    searchBox: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 20
    },
    searchBoxInput: {
        backgroundColor: '#fff',
        paddingHorizontal: 20
    },
});


// var styles = StyleSheet.create({
//     btnClickContain: {
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'stretch',
//       alignSelf: 'stretch',
//       backgroundColor: '#009D6E',
//       borderRadius: 5,
//       padding: 5,
//       marginTop: 5,
//       marginBottom: 5,
//     },
//     btnContainer: {
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'center',
//       alignItems: 'stretch',
//       alignSelf: 'stretch',
//       borderRadius: 10,
//     },
//     btnIcon: {
//       height: 25,
//       width: 25,
//     },
//     btnText: {
//       fontSize: 18,
//       color: '#FAFAFA',
//       marginLeft: 10,
//       marginTop: 2,
//     }
//   });
  
//   <TouchableHighlight
//     onPress={this.onBooking} style={styles.btnClickContain}
//     underlayColor='#042417'>
//     <View
//       style={styles.btnContainer}>
//       <Icon
//         name='fontawesome|facebook-square'
//         size={25}
//         color='#042'
//         style={styles.btnIcon}/>
//       <Text style={styles.btnText}>Sign In with Facebook</Text>
//     </View>
//   </TouchableHighlight>