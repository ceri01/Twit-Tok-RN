import {StyleSheet} from 'react-native';
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from "./view/Profile";
import AddTwok from "./view/AddTwok";
import Wall from "./view/Wall";
import Icon from "react-native-vector-icons/FontAwesome";

const Tab = createBottomTabNavigator();

export default function App() {

    return <NavigationContainer>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    let iconName;
                    if (route.name === 'Wall') {
                        iconName = "home";
                    } else if (route.name === 'UserProfile') {
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
            <Tab.Screen name="UserProfile" component={UserProfile}></Tab.Screen>
        </Tab.Navigator>
    </NavigationContainer>
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    }
});