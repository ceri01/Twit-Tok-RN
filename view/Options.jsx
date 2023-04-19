import {Button, SafeAreaView, StatusBar, View} from "react-native";
import React from "react";
import utilityStorageManager from "../model/UtilityStorageManager";
import DBManager from "../model/DBManager";


export default function Options() {
    return (
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={{alignItems: "center", justifyContent: "center"}}>
                <Button title="Clear DB" onPress={() => {
                    utilityStorageManager.clear().then(r => console.log("reset"));
                    DBManager.getInstance().clearDB()
                }}></Button>
                <Button title="test" onPress={() => {
                    DBManager.getInstance().getProfileFromDB((res) => {console.log("\nnome => " + res.name + "\npic => " + res.picture + "\npversion => " + res.pversion + "\nuid => " + res.uid)}, (err) => console.log(err))
                }}></Button>
                <Button title="pics" onPress={() => {
                    DBManager.getInstance().getPicsFromDB((res) => {
                        for (const re of res) {
                            console.log("\nuid =>" + re.uid + "\n " + "pic => " + re.picture.substring(0,10) + "\n " + "pversion => " + re.pversion)
                        }
                    }, (err) => console.log(err))
                }}></Button>
            </View>
        </SafeAreaView>
    );
}

