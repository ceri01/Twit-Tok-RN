import {Modal, StyleSheet, TextInput, View} from "react-native";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";
import React, {useState} from "react";

function CustomModal(props) {
    /* this text is for support editing of twok text
       isn't duplicate data, but is necessary to better graphic effect
     */
    const [currentText, setCurrentText] = useState(props.text);

    if (props.isReset.current === true) {
        setCurrentText("")
        props.onReset()
    }

    const handleConfirmTextChange = () => {
        props.onChangeText(currentText)
        props.onChangeVisibility(!props.visibility)
    }

    const handleCancelTextChange = () => {
        setCurrentText(props.text)
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
                    <TextInput style={style.textInputStyle}
                               maxLength={props.isName ? 19 : 99}
                               onChangeText={(newText) => {
                                   setCurrentText(newText)
                               }}
                               value={currentText}
                    />
                    <View style={style.modalButtons}>
                        <CancelButton onCancel={handleCancelTextChange}/>
                        <ConfirmButton onConfirm={handleConfirmTextChange}/>
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
    textInputStyle: {
        borderColor: "black",
        borderBottomWidth: 1,
        fontSize: 20,
        width: 250,
        padding: 5
    }
})

export default CustomModal;