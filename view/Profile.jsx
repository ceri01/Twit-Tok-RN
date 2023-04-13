import React, {useEffect, useRef, useState} from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import UserView from "./user/UserView";
import ProfileView from "./profile/ProfileView";
import DBManager from "../model/DBManager";
import {getFollowed, getFollowedLenght, initFollowed} from "../viewmodel/FollowHandler";

function Profile({route}) {
    const [ready, setReady] = useState(false);
    let profile = useRef(null);
    let [followed, setFollowed] = useState(null)

    useEffect(() => {
        setTimeout(() => {}, 2000)
        DBManager.getInstance().getProfileFromDB((resultQuery) => {
            if (!ready) {
                initFollowed().then(() => {
                    profile.current = resultQuery
                    setReady(true);
                    setFollowed(getFollowed())
                })
            } else if (followed != null && getFollowedLenght() !== followed.length) {
                console.log("qui")
                setFollowed(getFollowed())
            }
            console.log(getFollowed())
            console.log(followed)
        }, (error) => {
            console.log("errore => " + error);
        })
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
                    <FlatList data={followed}
                              renderItem={(element) => {
                                  // TODO: Metti foto profilo
                                  return <UserView dimensions={route.params.WindowHeight / 50} name={element.item.name} uid={element.item.uid} followed={true} edit={reload}/>
                              }}
                              keyExtractor={(element) => element.uid}>
                    </FlatList>
                </View>
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