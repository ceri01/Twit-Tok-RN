import React, {Component} from "react";
import {StyleSheet, Text, View, StatusBar, SafeAreaView} from "react-native";

class Wall extends Component{
    render() {
        return (
            <SafeAreaView style={style.safeViewArea}>
                <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
                <View style={style.container}>
                    <Text>Bacheca</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    safeViewArea : {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default Wall;