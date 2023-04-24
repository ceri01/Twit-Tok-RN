import React, {useEffect, useRef, useState} from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import UserView from "./user/UserView";
import ProfileView from "./profile/ProfileView";
import DBManager from "../model/DBManager";
import {getFollowed, getFollowedLenght, initFollowed} from "../viewmodel/FollowHandler";
import {getProfile} from "../viewmodel/ProfileUserHandler";

function Profile({route}) {
    const [ready, setReady] = useState(false);
    let profile = useRef(null);
    let [followed, setFollowed] = useState(null)

    useEffect(() => {
        getProfile((resultQuery) => {
                setTimeout(() => {}, 2000); // used to allow followed list in model to update
                if (!ready) {
                    initFollowed().then(() => {
                        profile.current = resultQuery
                        setReady(true);
                        setFollowed(getFollowed())
                    })
                } else if (followed != null && getFollowedLenght() !== followed.length) {
                    setFollowed(getFollowed())
                }
            }
        )
    })

    // console.log(ready + " " + JSON.stringify(profile))

    function reload() {
        setReady(false)
    }

    function renderFollowed() {
        if (ready) {
            return (
                <View style={style.followed}>
                    <FlatList data={followed}
                              renderItem={(element) => {
                                  return <UserView
                                      dimensions={route.params.WindowHeight / 50}
                                      name={element.item.name}
                                      picture={element.item.picture}
                                      uid={element.item.uid}
                                      followed={true}
                                      edit={reload}
                                      pressable={true}
                                      isInTwokRaw={false}/>
                              }}
                              keyExtractor={(element) => element.uid}>
                    </FlatList>
                </View>
            )
        }
    }

    function renderProfile() {
        if (ready) {
            return (
                <ProfileView profileName={profile.current.name} profilePicture={profile.current.picture} edit={reload}></ProfileView>
            )
        }
    }

    return (
        <SafeAreaView style={style.profileLayout}>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={style.profile}>
                {renderProfile()}
            </View>
            {renderFollowed()}
        </SafeAreaView>
    );
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
    }, profileLayout: {
        flex: 1,
        flexDirection: "column",
    }
});

export default Profile;