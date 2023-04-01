import {Button, SafeAreaView, StatusBar, View} from "react-native";
import React from "react";
import utilityStorageManager from "../model/UtilityStorageManager";
import database from "../model/DBManager";
import {getData} from "../viewmodel/WallHandler";

export default function Options() {
    return (
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Button title="Clear DB" onPress={() => {
                    utilityStorageManager.clear().then(r => console.log("reset"));
                    console.log(database())
                    database().clearDB()
                }}></Button>
                <Button title="test" onPress={() => {
                    getData().then(res => console.log(res))

                }}></Button>
            </View>
        </SafeAreaView>
    );
}

