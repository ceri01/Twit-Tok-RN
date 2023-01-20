import React, {useRef, useState} from "react";
import {FlatList, Pressable, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";
import UserView from "./user/UserView";
import UserPicture from "./user/UserPicture";
import UserName from "./user/UserName";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomTextModal from "./modal/CustomTextModal";

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
    const [username, setUsername] = useState("Test"); // TODO: fix default username
    const [modalVisible, setModalVisible] = useState(false);
    const reset = useRef(false); // flag to reset page

    const handleSliderReset = () => {
        reset.current = false;
    }

    return (
        <SafeAreaView>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={style.profile}>
                <UserPicture></UserPicture>
                <View style={style.usernameView}>
                    <View style={style.username}>
                        <UserName isProfileName={true} userName={username}/>
                    </View>
                    <Pressable style={style.editButton}
                               onPress={() => {
                                   setModalVisible(true)
                               }
                               }>
                        <View style={style.button}>
                            <CustomTextModal visibility={modalVisible}
                                             onChangeVisibility={setModalVisible}
                                             text={username}
                                             onChangeText={setUsername}
                                             isReset={reset}
                                             onReset={handleSliderReset}
                                             isName={true}>
                            </CustomTextModal>
                            <Icon name="edit" size={20} color="white"></Icon>
                        </View>
                    </Pressable>
                </View>
            </View>
            <View>
                <FlatList data={DATA}
                          renderItem={(element) => {
                              return <UserView data={element.item}/>
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