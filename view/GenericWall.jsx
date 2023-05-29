import React, {useEffect, useState} from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    View,
    Text,
    DeviceEventEmitter,
    Alert,
    Button, NativeModules
} from "react-native";
import GenericTwokRow from "./twok/GenericTwokRow";
import GeneralWallHandler from "../viewmodel/GeneralWallHandler";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {reloadApp} from "../viewmodel/initApp";
import {checkConnection} from "../viewmodel/ConnectionHandler";

let tidSequence = -1

function GenericWall({route, navigation}) {
    const TabHeight = useBottomTabBarHeight()
    const [listUpdater, setListUpdater] = useState(0); // used to re-render page when new batch of twok is loaded
    const [listrefresher, setListrefresher] = useState(true) // used to re-render page when the twok buffer is reset
    let [online, setOnline] = useState(true)

    DeviceEventEmitter.addListener("event.goback", (page) => {navigation.navigate(page.key)}) // this is used to create event to go back to GenericWall

    useEffect(() => {
        checkConnection(setOnline)
    });

    useEffect(() => {
        if (listUpdater === 0) {
            GeneralWallHandler.getGeneralWallInstance().initGeneralWall(tidSequence).then(() => {
                if (tidSequence !== -1) {
                    tidSequence = tidSequence + 8 // add 8 because getGeneralTwoks (called in initGeneralWall) performs 8 getTwok requests
                }
                setListUpdater(listUpdater + 1)
            }).catch((err) => {
                Alert.alert("Error", "Is not possible to initialize user wall");
            });
        }
    }, [listUpdater]);

    useEffect(() => {
        if (!listrefresher) {
            GeneralWallHandler.getGeneralWallInstance().resetGeneralBuffer(tidSequence).then(() => {
                if (tidSequence !== -1) {
                    tidSequence = tidSequence + 8 // add 8 because resetGeneralBuffer (called in initGeneralWall) performs 8 getTwok requests
                }
                setListrefresher(true);
            }).catch((err) => {
                Alert.alert("Error", "Is not possible to retrieve twoks.");
                setOnline(true)
            });
        }
    }, [listrefresher]);

    function displayContent() {
        if (listrefresher) {
            return (
                <FlatList
                    style={style.listStyle}
                    extraData={listrefresher}
                    data={GeneralWallHandler.getGeneralWallInstance().getGeneralData()}
                    renderItem={(twok) => {
                        return <GenericTwokRow data={twok.item}
                                               navigate={() => {
                                                   navigation.navigate("UserWall", {
                                                       params: {
                                                           key: "GenericWall",
                                                           uid: twok.item.uid,
                                                       }
                                                   })
                                               }}
                                               dimensions={{
                                                   TabHeight: TabHeight,
                                                   WindowHeight: route.params.WindowHeight,
                                                   StatusBarHeight: route.params.StatusBarHeight
                        }}/>
                    }}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    disableIntervalMomentum={true}
                    snapToInterval={route.params.WindowHeight - route.params.StatusBarHeight - TabHeight} // 90 is dimension of navigation bar
                    snapToAlignment="start"
                    decelerationRate="fast"
                    onEndReached={() => {
                        GeneralWallHandler.getGeneralWallInstance().updateGeneralBuffer(tidSequence).then((res) => {
                            if (tidSequence !== -1) {
                                tidSequence = tidSequence + 8 // add 8 because resetGeneralBuffer (called in initGeneralWall) performs 8 getTwok requests
                            }
                            if (res) {
                                setListrefresher(false)
                            } else {
                                setListUpdater(listUpdater + 1);
                            }
                        }).catch(() => {
                            setOnline(true)
                            Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
                        });
                    }}
                    onEndReachedThreshold={2}
                />
            );
        } else {
            return (
                <View style={style.waiting}>
                    <Text style={{fontSize: 30, fontStyle: "italic"}}>Waiting...</Text>
                </View>
            );
        }
    }

    if (!online) {
        return (
            <View style={style.waiting}>
                <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrieve data of
                    followed users, please check your connection and retry. Try to click button below or
                    restart app
                </Text>
                <Button title="Reload" onPress={() => {
                    reloadApp().then(() => {
                        NativeModules.DevSettings.reload();
                    })
                }}/>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={style.safeViewArea}>
                {displayContent()}
                <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    safeViewArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    listStyle: {
        width: "100%"
    },
    waiting: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default GenericWall;