import {Dimensions, FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {useCallback, useState} from "react";
import React from "react";
import EditColorSlider from "./view/slider/EditColorSlider";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import EditYAlignButton from "./view/buttons/EditYAlignButton";
import EditXAlignButton from "./view/buttons/EditXAlignButton";
import FontSize from "./view/buttons/FontSize";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator, useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Profile from "./view/Profile";
import AddTwok from "./view/AddTwok";
import Wall from "./view/Wall";
import Icon from "react-native-vector-icons/FontAwesome";
import {SafeAreaProvider} from "react-native-safe-area-context";
import TwokRow from "./view/twok/TwokRow";


const Tab = createBottomTabNavigator();

const DATA = [
    {tid: 1, text: "Ciao"},
    {tid: 2, text: "Come"},
    {tid: 3, text: "Stai"},
    {tid: 4, text: "Che schifo"},
    {tid: 5, text: "kaffee"},
    {tid: 6, text: "TestTest"},
];
function App() {
    const [x, setX] = useState(0)
//  NECESSARI PER PRENDERE IL VALORE DALLO SLIDER
    /*    const a = useSharedValue(-1)

        const onColorChanged = useCallback((color) => {
            'worklet';
            a.value = color
        }, []);

        const rstyle = useAnimatedStyle(() => {
            return {
                color: a.value
            }
        })*/

    function handle(el) {
        console.log(el)
    }


    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: () => {
                            let iconName;
                            if (route.name === 'Wall') {
                                iconName = "home";
                            } else if (route.name === 'Profile') {
                                iconName = "user-o";
                            } else  {
                                iconName = "plus-circle";
                            }
                            return <Icon name={iconName} size={30} color="white"></Icon>
                        },
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: "#6200ee",
                        tabBarStyle: {
                            backgroundColor: "#6200ee"
                        }
                    })}
                >
                    <Tab.Screen name="Wall" component={Wall}></Tab.Screen>
                    <Tab.Screen name="NewTwok" component={AddTwok}></Tab.Screen>
                    <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

const style = StyleSheet.create({
    safeViewArea : {
        flex: 1,
        backgroundColor: "red",
        alignItems: "center",
        justifyContent: "center"
    },
    listStyle: {
        width: "100%"
    }
});


export default App;