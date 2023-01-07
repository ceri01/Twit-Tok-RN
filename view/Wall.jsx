import React, {Component} from "react";
import {StyleSheet, SafeAreaView, FlatList, Dimensions, StatusBar} from "react-native";
import TwokRow from "./twok/TwokRow";

const DATA = [
    {tid: 1, text: "SIUUU", name: "mimmo"},
    {tid: 2, text: "SIUUU", name: "caloggero"},
    {tid: 3, text: "StaSIUU", name: "franco"},
    {tid: 4, text: "Che schifo", name: "guglielmo"},
    {tid: 5, text: "kaffee", name: "anna"},
    {tid: 6, text: "TestTest", name: "franco"},
];

// TODO: Sistemare la parte di viewmodel per prendere i dati correttamente

function Wall() {
    return (
        <SafeAreaView style={style.safeViewArea}>
            <FlatList
                style={style.listStyle}
                data={DATA}
                renderItem={(twok) => {
                    return <TwokRow data={twok.item} isInWall={true}/>
                }}
                keyExtractor={(twok) => twok.tid}
                disableIntervalMomentum={true}
                snapToInterval={Dimensions.get('window').height - StatusBar.currentHeight - 110} // 110 is dimension of navigation bar
                snapToAlignment="start"
                decelerationRate="fast"
                onScrollEndDrag={() => {
                }} // TODO: Valutare se bosogna fare qualcosa ogni volta che avviene uno scroll
            />
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({ // TODO: Sistemare i colori in base ai twok da mostrare
    safeViewArea: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    listStyle: {
        width: "100%"
    }
});

export default Wall;