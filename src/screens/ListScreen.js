import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import MunroCard from "../components/MunroCard";
import filter from 'lodash.filter';

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

    return (
        <View style={styles.container}>
            <Text style={styles.tital}>Munros</Text>
            <FlatList
                style={styles.flatList}
                keyExtractor={(item) => item.Number}
                data={ListData}
                renderItem={({ item }) => (<MunroCard munro={item} climbed={false} navigation={navigation} />)}

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
        marginBottom: 20
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