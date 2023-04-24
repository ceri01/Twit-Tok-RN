import GenericWall from "./GenericWall";
import UserWall from "./UserWall";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function Walls({route}) {
    return (
        <Stack.Navigator initialRouteName="GenericWall"
                         screenOptions={{headerShown: false}}>
            <Stack.Screen name="GenericWall" initialParams={{WindowHeight: route.params.WindowHeight, StatusBarHeight: route.params.StatusBarHeight}} component={GenericWall}/>
            <Stack.Screen name="UserWall" initialParams={{WindowHeight: route.params.WindowHeight, StatusBarHeight: route.params.StatusBarHeight}} component={UserWall}/>
        </Stack.Navigator>
    )
}

export default Walls