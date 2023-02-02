import React from "react";
import Options from "./Options"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from "./Profile";
import AddTwok from "./AddTwok";
import Wall from "./Wall";
import Icon from "react-native-vector-icons/FontAwesome";
import {SafeAreaProvider} from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

function Main({ navigation }) {
    React.useEffect(() => navigation.addListener('beforeRemove', (event) => {
        event.preventDefault()
    }),
        [navigation]
    );
    return (
        <SafeAreaProvider>
            <Tab.Navigator
                initialRouteName="Wall"
                screenOptions={({route}) => ({
                    tabBarIcon: () => {
                        let iconName;
                        if (route.name === 'Wall') {
                            iconName = "home";
                        } else if (route.name === 'Profile') {
                            iconName = "user-o";
                        } else {
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
                <Tab.Screen name="Options" component={Options}></Tab.Screen>
                <Tab.Screen name="Wall" component={Wall}></Tab.Screen>
                <Tab.Screen name="NewTwok" component={AddTwok}></Tab.Screen>
                <Tab.Screen name="Profile" component={Profile}></Tab.Screen>
            </Tab.Navigator>
        </SafeAreaProvider>
    );
}

export default Main;