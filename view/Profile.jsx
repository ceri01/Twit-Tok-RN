import React, {Component} from "react";
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native";
import UserView from "./user/UserView";
import UserPicture from "./user/UserPicture";

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

class Profile extends Component{
    render() {

        return (
            <SafeAreaView>
                <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
                <View style={style.profile}>
                    <UserPicture></UserPicture>
                    <Text style={style.text}>Nome utente</Text>
                </View>
                <View>
                    <FlatList data={DATA}
                              renderItem={(element) => {return <UserView data={element}></UserView>}}
                              keyExtractor={(element) => element.id}>
                    </FlatList>
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    profile: {
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    followedList: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        textAlign: "center"
    }
});

export default Profile;