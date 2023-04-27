import React, {useRef, useState} from "react";
import {
    StyleSheet,
    SafeAreaView,
    FlatList,
    StatusBar,
    View,
    Text,
    DeviceEventEmitter,
    Alert,
    Button
} from "react-native";
import GenericTwokRow from "./twok/GenericTwokRow";
import {getGeneralData, initGeneralWall, resetGeneralBuffer, updateGeneralBuffer} from "../viewmodel/GeneralWallHandler";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";

function GenericWall({route, navigation}) {
    const TabHeight = useBottomTabBarHeight()
    const [listUpdater, setListUpdater] = useState(0); // used to re-render page when new batch of twok is loaded
    const [listrefresher, setListrefresher] = useState(true) // used to re-render page when the twok buffer is reset
    let [offline, setOffline] = useState(false)

    DeviceEventEmitter.addListener("event.goback", (page) => {navigation.navigate(page.key)}) // this is used to create event to go back to GenericWall

    if (listUpdater === 0) {
        initGeneralWall().then(() => {
            setListUpdater(listUpdater + 1)
        }).catch((err) => {
            Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
            setOffline(true)
        });
    } else if (!listrefresher) {
        resetGeneralBuffer().then(() => {
            setListrefresher(true);
        }).catch((err) => {
            Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
            setOffline(true)
        });
    }

    function displayContent() {
        if (listrefresher) {
            return (
                <FlatList
                    style={style.listStyle}
                    extraData={listrefresher}
                    data={getGeneralData()}
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
                        updateGeneralBuffer().then((res) => {
                            if (res) {
                                setListrefresher(false)
                            } else {
                                setListUpdater(listUpdater + 1);
                            }
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