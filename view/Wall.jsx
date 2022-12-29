import React, {Component} from "react";
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from "react-native";

class Wall extends Component{
    render() {
        return (
            <SafeAreaView style={style.container}>
                <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
                <Text>Bacheca</Text>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    }
});

export default Wall;