import React from "react"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import AddTwok from "./AddTwok"
import Icon from "react-native-vector-icons/FontAwesome"
import {SafeAreaProvider} from "react-native-safe-area-context"
import {Dimensions, StatusBar} from "react-native"
import Walls from "./Walls"
import ProfileStack from "./ProfileStack"

const Tab = createBottomTabNavigator()

const WindowHeight = Dimensions.get("window").height
const WindowWidth = Dimensions.get("window").width
const StatusBarHeight = StatusBar.currentHeight

function Main({navigation}) {
    React.useEffect(() => navigation.addListener('beforeRemove', (event) => {
            event.preventDefault()
        }),
        [navigation]
    );
    return (
        <SafeAreaProvider>
            <Tab.Navigator
                initialRouteName="Options"
                independant={true}
                screenOptions={({route}) => ({
                    tabBarIcon: () => {
                        let iconName
                        if (route.name === 'Wall') {
                            iconName = "home"
                        } else if (route.name === 'Profile') {
                            iconName = "user-o"
                        } else {
                            iconName = "plus-circle"
                        }
                        return <Icon name={iconName} size={30} color="white"></Icon>
                    },
                    tabBarActiveTintColor: 'white',
                    headerShown: false,
                    tabBarInactiveTintColor: "#6200ee",
                    tabBarStyle: {
                        backgroundColor: "#6200ee"
                    }
                })}
            >
                <Tab.Screen name="Wall" initialParams={{WindowHeight: WindowHeight, StatusBarHeight: StatusBarHeight}}
                            component={Walls}/>
                <Tab.Screen name="New Twok" initialParams={{WindowWidth: WindowWidth}} component={AddTwok}/>
                <Tab.Screen name="Profile"
                            initialParams={{WindowHeight: WindowHeight, StatusBarHeight: StatusBarHeight}}
                            options={{unmountOnBlur: true}} component={ProfileStack}/>
            </Tab.Navigator>
        </SafeAreaProvider>
    )
}

export default Main