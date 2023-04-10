import {Pressable, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import CustomTextModal from "../modal/CustomTextModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {setNewProfileName, setNewProfilePic} from "../../viewmodel/ProfileUserHandler";
import {useState} from "react";
import CustomImageModal from "../modal/CustomImageModal";

const ProfileButtons = (props) => {
    const [modalNameVisible, setModalNameVisible] = useState(false);
    const [modalPicVisible, setModalPicVisible] = useState(false);

    function changeText(name) {
        setNewProfileName(name).then(() => {
            props.onPress()
        })
    }

    function changePic(pic) {
        setNewProfilePic(pic).then(() => {
            props.onPress()
        })
    }

    return (
        <View style={style.layout}>
            <Pressable style={style.editButton}
                       onPress={() => {
                           setModalNameVisible(!modalNameVisible)
                       }
                       }>
                <View style={style.textButton}>
                    <CustomTextModal visibility={modalNameVisible}
                                     text={props.userName}
                                     onChangeVisibility={setModalNameVisible}
                                     onChangeText={changeText}
                                     isName={true}
                                     isReset={false}>
                    </CustomTextModal>
                    <Icon name="file-edit" size={25} color="white"></Icon>
                </View>
            </Pressable>
            <Pressable style={style.editButton}
                       onPress={() => {
                           setModalPicVisible(!modalPicVisible)
                       }
                       }>
                <View style={style.imageButton}>
                    <CustomImageModal visibility={modalPicVisible}
                                      image={props.pic}
                                      onChangeVisibility={setModalPicVisible}
                                      onChangeImage={changePic}
                                      isReset={false}
                    >
                    </CustomImageModal>
                    <Icon name="image-edit" size={25} color="white"></Icon>
                </View>
            </Pressable>
        </View>
    );
}

const style = StyleSheet.create({
    layout: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
    },
    textButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee",
        borderRadius: 5
    },
    imageButton: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee",
        borderRadius: 5
    },
    editButton: {
        flex: 1,
        paddingHorizontal: 10
    },


});

export default ProfileButtons;



