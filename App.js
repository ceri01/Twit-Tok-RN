import React, {useRef, useState} from "react";
import Register from "./view/Register";
import {SafeAreaProvider} from "react-native-safe-area-context";
import Main from "./view/Main";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import {initEnvironment} from "./viewmodel/initApp";
import {StyleSheet, Text} from "react-native";

const Stack = createNativeStackNavigator();

function App() {
    const load = useRef("")
    const [isLoading, setIsLoading] = useState(true);
    if (isLoading) {
        initEnvironment().then((res) => {
            load.current = res
            setIsLoading(false)
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
        );
    }

}

const style = StyleSheet.create({
    loading: {
        alignItems: "center",
        justifyContent: "center"
    },
})

export default App;