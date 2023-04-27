import UserWall from "./UserWall";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Profile from "./Profile";

const Stack = createNativeStackNavigator();

function ProfileStack({route}) {
    return (
        <Stack.Navigator initialRouteName="GenericWall"
                         screenOptions={{headerShown: false}}>
            <Stack.Screen name="ProfileScreen" initialParams={{WindowHeight: route.params.WindowHeight, StatusBarHeight: route.params.StatusBarHeight}} component={Profile}/>
            <Stack.Screen name="UserWall" initialParams={{WindowHeight: route.params.WindowHeight, StatusBarHeight: route.params.StatusBarHeight}} component={UserWall}/>
        </Stack.Navigator>
    )
}

export default ProfileStack