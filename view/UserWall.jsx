import React, {useState} from "react";
import {StyleSheet, SafeAreaView, FlatList, Dimensions, StatusBar, View, Text} from "react-native";
import TwokRow from "./twok/TwokRow";
import {getData, initWall, resetBuffer, updateBuffer} from "../viewmodel/WallHandler";

function UserWall() {
    const [listUpdater, setListUpdater] = useState(0); // used to re-render page when new batch of twok is loaded
    const [listrefresher, setListrefresher] = useState(true) // used to re-render page when the twok buffer is reset

    if (listUpdater === 0) {
        initWall().then(() => {
            setListUpdater(listUpdater + 1)
        }).catch((err) => {
            console.log(err)
        });
    } else if (!listrefresher) {
        resetBuffer().then(() => {
            setListrefresher(true);
        });
    }

    function displayContent() {
        if (listrefresher) {
            return (
                <FlatList
                    style={style.listStyle}
                    extraData={listrefresher}
                    data={getData()}
                    renderItem={(twok) => {
                        return <TwokRow data={twok.item}/>
                    }}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    disableIntervalMomentum={true}
                    snapToInterval={Dimensions.get('window').height - 90} // 90 is dimension of navigation bar
                    snapToAlignment="start"
                    decelerationRate="fast"
                    onEndReached={(info) => {
                        updateBuffer().then((res) => {
                            if (res) {
                                setListrefresher(false)
                            } else {
                                setListUpdater(listUpdater + 1);
                            }
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