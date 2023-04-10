import React, {useRef, useState} from "react";
import {FlatList, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import UserView from "./user/UserView";
import UserPicture from "./user/UserPicture";
import UserName from "./user/UserName";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextModal from "./modal/CustomTextModal";

import {getProfile, setNewProfileName} from "../viewmodel/ProfileUserHandler"
import {createPictureSource} from "../viewmodel/PictureHandler";
import ProfilePicture from "./profile/ProfilePicture";
import ProfileName from "./profile/ProfileName";
import ProfileView from "./profile/ProfileView";
import NativeStatusBarManagerIOS from "react-native/Libraries/Components/StatusBar/NativeStatusBarManagerIOS";
import NativeStatusBarManager from "react-native/Libraries/Components/StatusBar/NativeStatusBarManagerIOS";
import database from "../model/DBManager";
import DBManager from "../model/DBManager";

const DATA = [
    {"id": 1, name: "Mimmo"},
    {"id": 2, name: "Caloggero"},
    {"id": 3, name: "Gennaro"},
    {"id": 4, name: "Danilo"},
    {"id": 5, name: "Elena"},
    {"id": 6, name: "Carmine"},
    {"id": 7, name: "Alberto"},
    {"id": 8, name: "Rosario"},
    {"id": 9, name: "Nicola"},
    {"id": 10, name: "Mimmo"},
    {"id": 11, name: "Caloggero"},
    {"id": 12, name: "Gennaro"},
    {"id": 13, name: "Danilo"},
    {"id": 14, name: "Elena"},
    {"id": 15, name: "Carmine"},
    {"id": 16, name: "Alberto"},
    {"id": 17, name: "Rosario"},
    {"id": 18, name: "Nicola"},
]

function Profile({route}) {
    const [ready, setReady] = useState(false);
    let profile = useRef(null);

    DBManager.getInstance().getProfileFromDB((resultQuery) => {
        profile.current = resultQuery
        setReady(true)
    }, (error) => {
        console.log("a" + error);
    })

    function profileStyle() {
        return ({
                flex: 1,
                flexDirection: "column",
            }
        )
    }

    function reload() {
        setReady(false)
    }

    if (ready) {
        return (
            <SafeAreaView style={profileStyle()}>
                <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
                <View style={style.profile}>
                    <ProfileView profileName={profile.current.name} profilePicture={profile.current.picture} edit={reload}></ProfileView>
                </View>
                <View style={style.followed}>

                </View>
                {/*            <View>
                <FlatList data={DATA}
                          renderItem={(element) => {
                              return <ProfileView data={element.item} isProfile={true}/>
                          }}
                          keyExtractor={(element) => element.id}>
                </FlatList>
            </View>*/}
            </SafeAreaView>
        );
    } else {
        return (
            <View style={style.waiting}>
                <Text style={{fontSize: 30, fontStyle: "italic"}}>Waiting...</Text>
            </View>
        );
    }


}

const style = StyleSheet.create({
    profile: {
        flex: 1,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderRadius: 30
    },
    followed: {
        flex: 6,
    },
    waiting: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Profile;