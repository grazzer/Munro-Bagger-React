import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';
import MunroCard from "../components/MunroCard";
import filter from 'lodash.filter';

export default function ListScreen({ list }) {

    // List search bar 
    const [query, setQuery] = useState('');
    const [ListData, setListData] = useState([]);

    useEffect(() => {
        setListData(list)
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
            <FlatList
                style={styles.flatList}
                keyExtractor={(item) => item.Number}
                data={ListData}
                renderItem={({ item }) => (<MunroCard munro={item} climbed={false} />)}
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