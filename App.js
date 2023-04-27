import React, {useRef, useState} from "react";
import Register from "./view/Register";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Main from "./view/Main";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Alert, StyleSheet, Text} from "react-native";
import UtilityStorageManager from "./model/UtilityStorageManager";
import {initEnvironment} from "./viewmodel/initApp";
import * as Sentry from "@sentry/react-native";
import Constants from "expo-constants";
import DBManager from "./model/DBManager";
import {NavigationContainer} from "@react-navigation/native";

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
                    console.log("done")
                }).catch((err) => {
                    Alert.alert("Connection Error", "Network request failed, is not possible to login with account. \nYou can use app in guest mode");
                    console.log(err)
                })
                load.current = "Register";
            } else {
                load.current = "Main";
            }
            setIsLoading(false)
        }).catch((err) => {
            console.log("isFirstStart " + err)
        })

        return (
            <Text style={style.loading}>Loading...</Text>
        );
    } else {
        return (
            <SafeAreaProvider>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={load.current}
                                     screenOptions={{headerShown: false}}>
                        <Stack.Screen name="Register" component={Register}/>
                        <Stack.Screen name="Main" component={Main}/>
                    </Stack.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        )
    }
}

const style = StyleSheet.create({
    loading: {
        alignItems: "center",
        justifyContent: "center"
    },
})

export default App;