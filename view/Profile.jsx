import React, {Component, useState} from "react";
import {FlatList, Modal, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View} from "react-native";
import UserView from "./user/UserView";
import UserPicture from "./user/UserPicture";
import UserName from "./user/UserName";
import CancelButton from "./buttons/CancelButton";
import ConfirmButton from "./buttons/ConfirmButton";
import Icon from "react-native-vector-icons/MaterialIcons";

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

function Profile() {
    const [username, setUsername] = useState("Test");
    const [tmpUsername, setTmpUsername] = useState(username);
    const [modalVisible, setModalVisible] = useState(false)

    const handleConfirmNewName = () => {
        setUsername(tmpUsername)
        setModalVisible(!modalVisible)
    }

    const handleCancelNewName = () => {
        setModalVisible(!modalVisible)
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={style.profile}>
                <UserPicture></UserPicture>
                <View style={style.usernameView}>
                    <View style={style.username}>
                        <UserName isProfileName={true} userName={username}></UserName>
                    </View>
                    <Pressable style={style.editButton}
                               onPress={() => {
                                   setModalVisible(true)
                               }
                               }>
                        <View style={style.button}>
                            <Modal animationType={"fade"}
                                   transparent={true}
                                   visible={modalVisible}
                                   onRequestClose={() => {
                                       setModalVisible(!modalVisible)
                                   }
                                   }>
                                <View style={style.modalCenteredView}>
                                    <View style={style.modalView}>
                                        <TextInput style={style.textinput}
                                                   onChangeText={(newName) => setTmpUsername(newName)}
                                                   value={tmpUsername}
                                        />
                                        <View style={style.modalButtons}>
                                            <CancelButton onCancel={handleCancelNewName}/>
                                            <ConfirmButton onConfirm={handleConfirmNewName}/>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                            <Icon name="edit" size={20} color="white"></Icon>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View>
                <FlatList data={DATA}
                          renderItem={(element) => {
                              return <UserView data={element.item}></UserView>
                          }}
                          keyExtractor={(element) => element.id}>
                </FlatList>
            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    profile: {
        height: 150,
        alignItems: "center",
        justifyContent: "center",
    },
    usernameView : {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    editButton: {
        flex: 0.1,
        paddingHorizontal: 5
    },
    username: {
        flex: 1,
        paddingHorizontal: 5
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee",
        height: 30,
        width: 30,
        borderRadius: 5
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalCenteredView: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalButtons: {
        paddingTop: 20,
        flexDirection: "row"
    },
    followedList: {
        flex: 1,
    },
    text: {
        fontSize: 25,
        textAlign: "center"
    },
});

export default Profile;