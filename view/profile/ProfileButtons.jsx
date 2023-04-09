import {Pressable, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import CustomTextModal from "../modal/CustomTextModal";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {setNewProfileName} from "../../viewmodel/ProfileUserHandler";
import {useRef, useState} from "react";

const ProfileButtons = (props) => {
    const [modalNameVisible, setModalNameVisible] = useState(false);
    const [modalPicVisible, setModalPicVisible] = useState(false);
    return (
        <View style={style.layout}>
            <Pressable style={style.editButton}
                       onPress={() => {
                           console.log(modalNameVisible.current)
                           setModalNameVisible(!modalNameVisible)
                       }
                       }>
                <View style={style.button}>
                    <CustomTextModal visibility={modalNameVisible}
                                     text={props.userName}
                                     onChangeVisibility={setModalNameVisible}
                                     onChangeText={setNewProfileName}
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
                <View style={style.button}>
                    {/*                        <CustomTextModal visibility={modalNameVisible}
                                         onChangeVisibility={setModalNameVisible}
                                         text={profile.current.name}
                                         onChangeText={setNewProfileName}
                                         isReset={reset}
                                         onReset={handleSliderReset}
                                         isName={true}>
                        </CustomTextModal>*/}
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
    button: {
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



