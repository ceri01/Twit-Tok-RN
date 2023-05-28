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
import {resetGeneralBuffer} from "../viewmodel/GeneralWallHandler";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import UserTwokRow from "./twok/UserTwokRow";
import {getUserData, initUserWall, updateUserBuffer} from "../viewmodel/UserWallHandler";
import {reloadApp} from "../viewmodel/initApp";

function UserWall(props) {
    const TabHeight = useBottomTabBarHeight()
    const [offline, setOffline] = useState(false);
    const [listUpdater, setListUpdater] = useState(0); // used to re-render page when new batch of twok is loaded
    const [listrefresher, setListrefresher] = useState(true) // used to re-render page when the twok buffer is reset
    const uid = props.route.params.params.uid
    const WindowHeight = props.route.params.WindowHeight
    const StatusBarHeight = props.route.params.StatusBarHeight

    if (listUpdater === 0) {
        initUserWall(uid).then(() => {
            setListUpdater(listUpdater + 1)
        }).catch((err) => {
            setOffline(true)
            Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
        });
    } else if (!listrefresher) {
        resetGeneralBuffer().then(() => {
            setListrefresher(true);
        }).catch((err) => {
            setOffline(true)
            Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
        });
    }

    function displayContent() {
        if (offline) {
            return (
                <View style={style.waiting}>
                    <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrive data of followed users, please check your connection and retry. Try to click button below or restart app</Text>
                    <Button title="Reload" onPress={() => {
                        reloadApp().then(() => {
                            NativeModules.DevSettings.reload();
                        })
                    }}/>
                </View>
            );
        } else {
            if (listrefresher) {
                return (
                    <FlatList
                        style={style.listStyle}
                        extraData={listrefresher}
                        data={getUserData()}
                        renderItem={(twok) => {
                            return <UserTwokRow data={twok.item}
                                                navigate={() => {
                                                    DeviceEventEmitter.emit("event.goback", {key: props.route.params.params.key})
                                                }}
                                                dimensions={{
                                                    TabHeight: TabHeight,
                                                    WindowHeight: WindowHeight,
                                                    StatusBarHeight: StatusBarHeight
                                                }}
                            />
                        }}
                        keyExtractor={(item, index) => {
                            return index.toString()
                        }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        disableIntervalMomentum={true}
                        snapToInterval={WindowHeight - StatusBarHeight - TabHeight} // 90 is dimension of navigation bar
                        snapToAlignment="start"
                        decelerationRate="fast"
                        onEndReached={(info) => {
                            updateUserBuffer(uid).then(() => {
                                setListUpdater(listUpdater + 1);
                            }).catch(() => {
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
    }

    return (
        <SafeAreaView style={style.safeViewArea}>
            {displayContent()}
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
        </SafeAreaView>
    );

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

export default UserWall;



