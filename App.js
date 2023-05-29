import React, {useEffect, useRef, useState} from "react"
import Register from "./view/Register"
import {SafeAreaProvider} from "react-native-safe-area-context"
import Main from "./view/Main"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {Button, NativeModules, SafeAreaView, StyleSheet, Text} from "react-native"
import UtilityStorageManager from "./model/UtilityStorageManager"
import {initEnvironment, reloadApp} from "./viewmodel/initApp"
import {NavigationContainer} from "@react-navigation/native"
import {checkConnection} from "./viewmodel/ConnectionHandler"

const Stack = createNativeStackNavigator()

function App() {
    const load = useRef("")
    const [isLoading, setIsLoading] = useState(true)
    const [online, setOnline] = useState(true)

    useEffect(() => {
        checkConnection(setOnline)
    })

    if (!online) {
        return (
            <SafeAreaView style={style.waiting}>
                <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrieve data of followed users, please check your connection and retry. Try to click button below or restart app</Text>
                <Button title="Reload" onPress={() => {
                    reloadApp().then(() => {
                        NativeModules.DevSettings.reload()
                    })
                }}/>
            </SafeAreaView>
        )
    } else {
        if (isLoading) {
            UtilityStorageManager.isFirstStart().then((res) => {
                if (res) {
                    load.current = "Register"
                    setIsLoading(false)
                } else {
                    initEnvironment().then(() => { // if isn't first start this line is not executed
                        load.current = "Main"
                        setIsLoading(false)
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            }).catch((err) => {
                console.log(err)
            })

            return (
                <Text style={style.loading}>Loading...</Text>
            )
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

export default App