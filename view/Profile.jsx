import React, {useEffect, useRef, useState} from "react";
import {
    Alert,
    Button,
    DeviceEventEmitter,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import UserView from "./user/UserView";
import ProfileView from "./profile/ProfileView";
import {getFollowed, getFollowedLenght, initFollowed} from "../viewmodel/FollowHandler";
import {getProfile} from "../viewmodel/ProfileUserHandler";

function Profile({route, navigation}) {
    const [ready, setReady] = useState(false);
    let [offline, setOffline] = useState(false)
    let profile = useRef(null);
    let [followed, setFollowed] = useState(null)

    DeviceEventEmitter.addListener("event.goback", (page) => {navigation.navigate(page.key)}) // this is used to create event to go back to GenericWall

    useEffect(() => {
        getProfile((resultQuery) => {
                if (!ready) {
                    initFollowed().then(() => {
                        profile.current = resultQuery
                        setFollowed(getFollowed())
                        setReady(true);
                        setOffline(false)
                    }).catch((err) => {
                        Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
                        setOffline(true)
                    })
                } else if (followed != null && getFollowedLenght() !== followed.length) {
                    setFollowed(getFollowed())
                }
            }
        )
    })

    function reload() {
        setReady(false)
    }

    function renderFollowed() {
        if (ready) {
            if (followed === []) {
                return (
                    <View style={style.followed}>
                        <FlatList data={followed}
                                  renderItem={(element) => {
                                      return <UserView
                                          dimensions={route.params.WindowHeight / 50}
                                          navigate={() => {
                                              navigation.navigate("UserWall", {
                                                  params: {
                                                      key: "ProfileScreen", // use ProfileScreen because Profile already exists in Main.jsx
                                                      uid: element.item.uid,
                                                  }
                                              })
                                          }}
                                          name={element.item.name}
                                          picture={element.item.picture}
                                          uid={element.item.uid}
                                          followed={true}
                                          edit={reload}
                                          pressable={true}
                                          isInGenericTwokRow={false}/>
                                  }}
                                  keyExtractor={(element) => element.uid}>
                        </FlatList>
                    </View>
                )
            } else {
                return (
                    <View style={style.empty}>
                        <Text style={{fontSize: 30, fontStyle: "italic"}}>Followed list is empty, find some friends in wall page!</Text>
                    </View>
                )
            }
        } else {
            return (
                <View style={style.waiting}>
                    <Text style={{fontSize: 30, fontStyle: "italic"}}>Waiting...</Text>
                </View>
            );
        }
    }

    function renderProfile() {
        if (ready) {
            return (
                <ProfileView profileName={profile.current.name} profilePicture={profile.current.picture} edit={reload}></ProfileView>
            )
        }
    }

    if (offline) {
        return (
            <View style={style.waiting}>
                <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrive data of followed users, please check your connection and retry</Text>
                <Button title="Reload" onPress={() => {
                    setOffline(false)
                }}/>
            </View>
        );
    } else {
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
    profileLayout: {
        flex: 1,
        flexDirection: "column",
    },
    empty: {
        flex: 6,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default Profile;