import React, {Component} from "react";
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";

class AddTwok extends Component{
    render() {
        return (
            <SafeAreaView style={style.container}>
                <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
                <Text>UserProfile</Text>
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

export default AddTwok;