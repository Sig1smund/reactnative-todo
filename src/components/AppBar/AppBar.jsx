import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";

export default function AppBar({title}) {
    return (
        <View style={s.appbar}>
            <Text style={s.text}>{title}</Text>
        </View>
    )
}

const s = StyleSheet.create({
    appbar: {
        width: Dimensions.get('window').width,
        height: 90,
        alignItems: "center",
        justifyContent: 'flex-end',
        backgroundColor: '#3949ab',
        padding: 10,

    },
    text: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic',

    },
});