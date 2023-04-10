import {Alert, Image, Modal, StyleSheet, TextInput, View} from "react-native";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";
import React, {useState} from "react";
import {createPictureSource, getImage, openImagePicker} from "../../viewmodel/PictureHandler";
import ChooseImageButton from "../buttons/ChooseImageButton";
import DefaultImage from "../../assets/favicon.png";
import ProfilePicture from "../profile/ProfilePicture";

function CustomImageModal(props) {
    /* this text is for support editing of twok text
       isn't duplicate data, but is necessary to better graphic effect
     */
    const [currentImage, setCurrentImage] = useState(props.text);

    function getImage() { //TODO: Da farci una funzione sola, perchè è uguale a quella in register
        openImagePicker().then((result) => {
            if (!result.canceled) {
                if (result.length > 137000) {
                    Alert.alert("Size error", "Image size must be less then 100KB, default icon setted.");
                }
                setCurrentImage(createPictureSource(result));
            }
        }).catch((err) => {
            Alert.alert("Error", "Image not selected, default icon setted.");
            setCurrentImage(Image.resolveAssetSource(DefaultImage).uri);
        })
    }

    if (props.isReset.current === true) {
        setCurrentImage("")
        props.onReset()
    }

    const handleConfirmImageChange = () => {
        props.onChangeImage(currentImage)
        props.onChangeVisibility(!props.visibility)
    }

    const handleCancelImageChange = () => {
        setCurrentImage(props.text)
        props.onChangeVisibility(!props.visibility)
    }

    return (
        <Modal animationType={"fade"}
               transparent={true}
               visible={props.visibility}
               onRequestClose={() => {
                   props.onChangeVisibility(!props.visibility)
               }}
        >
            <View style={style.modalCenteredView}>
                <View style={style.modalView}>
                    <ChooseImageButton onPress={getImage}></ChooseImageButton>
                    <View style={style.modalButtons}>
                        <View style={{flex: 6}}>
                            <View style={style.pic}>
                                <ProfilePicture pic={currentImage}/>
                            </View>
                            <CancelButton onCancel={handleCancelImageChange}/>
                        </View>
                        <ConfirmButton onConfirm={handleConfirmImageChange}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
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
    pic: {
        flexDirection: "column"
    }
})

export default CustomImageModal;