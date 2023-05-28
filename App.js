import React, {useRef, useState} from "react";
import Register from "./view/Register";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Main from "./view/Main";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Alert, Button, NativeModules, SafeAreaView, StyleSheet, Text, View} from "react-native";
import UtilityStorageManager from "./model/UtilityStorageManager";
import {initEnvironment, reloadApp} from "./viewmodel/initApp";
import {NavigationContainer} from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function App() {
    const load = useRef("")
    const [isLoading, setIsLoading] = useState(true);
    const [offline, setOffline] = useState(false)

    if (offline) {
        return (
            <SafeAreaView style={style.waiting}>
                <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrive data of followed users, please check your connection and retry. Try to click button below or restart app</Text>
                <Button title="Reload" onPress={() => {
                    reloadApp().then(() => {
                        NativeModules.DevSettings.reload();
                    })
                }}/>
            </SafeAreaView>
        );
    } else {
        if (isLoading) {
            UtilityStorageManager.isFirstStart().then((res) => {
                if (res) {
                    initEnvironment().then(() => {
                        load.current = "Register";
                    }).catch((err) => {
                        Alert.alert("Connection Error", "Network request failed, check your connection.");
                        setOffline(true)
                    })
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
}

const style = StyleSheet.create({
    loading: {
        alignItems: "center",
        justifyContent: "center"
    },
    waiting: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
})

export default App;