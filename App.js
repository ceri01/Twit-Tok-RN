import React, {useRef, useState} from "react";
import Register from "./view/Register";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Main from "./view/Main";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StyleSheet, Text} from "react-native";
import UtilityStorageManager from "./model/UtilityStorageManager";
import {initEnvironment} from "./viewmodel/initApp";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import DBManager from "./model/DBManager";


const Stack = createNativeStackNavigator();

function App() {
    const load = useRef("")
    const [isLoading, setIsLoading] = useState(true);

    if (Constants.expoConfig.extra.sentry_dsn !== undefined && Constants.expoConfig.extra.sentry_dsn !== null) {
        Sentry.init({
            dsn: Constants.expoConfig.extra.sentry_dsn,
            enableInExpoDevelopment: true,
            debug: true,
            enableNative: true,
        })
    }

    if (isLoading) {
        UtilityStorageManager.isFirstStart().then((res) => {
            if (res) {
                initEnvironment().then(() => {
                    console.log("env initialized")
                    DBManager.getInstance()
                })
                setIsLoading(false)
            } else {
                DBManager.getInstance().getProfileFromDB((res) => {
                    if (res === undefined || res.name === "") {
                        load.current = "Register";
                    } else {
                        load.current = "Main";
                    }
                    setIsLoading(false)
                }, (err) => {
                    console.log("errore " + err)
                })}
        })
        return (
            <Text style={style.loading}>Loading...</Text>
        );
    } else {
        if (load.current === "Register") {
            return (
                <SafeAreaProvider>
                    <Register/>
                </SafeAreaProvider>
            )
        } else {
            return (
                <SafeAreaProvider>
                    <Main/>
                </SafeAreaProvider>
            )
        }
    }
}

const style = StyleSheet.create({
    loading: {
        alignItems: "center",
        justifyContent: "center"
    },
})

export default App;