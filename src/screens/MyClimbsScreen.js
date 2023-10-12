import React from "react";
import Database from "../../Database";
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator, TextInput } from 'react-native';

export default function MyClimbsScreen({ route }) {

    Database.LogAllClimbs()
}