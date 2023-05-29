import React, {useEffect, useMemo, useRef, useState} from "react";
import {
    Button,
    DeviceEventEmitter,
    FlatList, NativeModules,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from "react-native";
import UserView from "./user/UserView";
import ProfileView from "./profile/ProfileView";
import {getProfile} from "../viewmodel/ProfileUserHandler";
import {reloadApp} from "../viewmodel/initApp";
import FollowHandler from "../viewmodel/FollowHandler";
import {checkConnection} from "../viewmodel/ConnectionHandler";

function Profile({route, navigation}) {
    const [ready, setReady] = useState(false);
    const [online, setOnline] = useState(true);
    const followed = useRef(null);
    const profile = useRef(null);

    // this is used to create event to go back to GenericWall
    DeviceEventEmitter.addListener("event.goback", (page) => {
        navigation.navigate(page.key);
    });

    useEffect(() => {
        checkConnection(setOnline)
    });

    useEffect(() => {
        followed.current = FollowHandler.getFollowedInstance().getFollowed()
        getProfile((resultQuery) => {
            profile.current = resultQuery
            setReady(true);
        });
    }, [ready])

    function reload() {
        setReady(false);
    }

    function renderFollowed() {
        if (ready) {
            if (followed.current.length > 0) {
                return (
                    <View style={style.followed}>
                        <FlatList data={followed.current}
                                  renderItem={({item}) => (
                                      <UserView
                                          dimensions={route.params.WindowHeight / 50}
                                          navigate={() => {
                                              navigation.navigate("UserWall", {
                                                  params: {
                                                      // use ProfileScreen because Profile already exists in Main.jsx
                                                      key: "ProfileScreen",
                                                      uid: item.uid,
                                                  },
                                              });
                                          }}
                                          name={item.name}
                                          picture={item.picture}
                                          uid={item.uid}
                                          followed={true}
                                          edit={reload}
                                          pressable={true}
                                          isInGenericTwokRow={false}
                                      />
                                  )}
                                  keyExtractor={(element) => element.uid}>
                        </FlatList>
                    </View>
                );
            } else {
                return (
                    <View style={style.empty}>
                        <Text style={{fontSize: 30, fontStyle: "italic"}}>
                            Followed list is empty, find some friends in wall page!
                        </Text>
                    </View>
                );
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
                <ProfileView profileName={profile.current.name}
                             profilePicture={profile.current.picture}
                             edit={reload}
                />
            );
        }
    }

    if (!online) {
        return (
            <View style={style.waiting}>
                <Text style={{fontSize: 25, fontStyle: "italic"}}>
                    Connection error. Is not possible to retrieve data of followed users, please check your connection and retry. Try to click button below or restart app
                </Text>
                <Button title="Reload"
                    onPress={() => {
                        reloadApp().then(() => {
                            NativeModules.DevSettings.reload();
                        });
                    }}
                />
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