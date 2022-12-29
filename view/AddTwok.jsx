import React, {Component} from "react";
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";

class AddTwok extends Component{
    render() {
        return (
            <SafeAreaView style={style.safeViewArea}>
                <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
                <View style={style.container}>
                    <Text>Aggiungi twok</Text>
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
export default AddTwok;