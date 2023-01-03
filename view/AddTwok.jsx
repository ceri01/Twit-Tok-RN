import React, {useCallback, useState} from "react";
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Modal,
    TextInput, Pressable
} from "react-native";
import EditColorSlider from "./slider/EditColorSlider";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import EditXAlignButton from "./buttons/EditXAlignButton";
import EditYAlignButton from "./buttons/EditYAlignButton";
import EditTextButton from "./buttons/EditTextButton";
import ConfirmButton from "./buttons/ConfirmButton";
import CancelButton from "./buttons/CancelButton";
import FontSizeButton from "./buttons/FontSizeButton";
import FontTypeButton from "./buttons/FontTypeButton";
import MapButton from "./buttons/MapButton";

function AddTwok() {
    const [alignX, setAlignX] = useState(1);
    const [alignY, setAlignY] = useState(1);
    const [text, setText] = useState("");
    const [tmpText, setTmpText] = useState("");
    const [fontType, setfontType] = useState(1);
    const [fontSize, setfontSize] = useState(1);
    const [map, setMap] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)
    const xBackground = useSharedValue(-1);
    const xText = useSharedValue(270);

    const onBackgroundColorChanged = useCallback((color) => {
        'worklet';
        xBackground.value = color;
    }, []);

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: xBackground.value
        }
    });

    const onTextColorChanged = useCallback((color) => {
        'worklet';
        xText.value = color;
    }, []);

    const textStyle = useAnimatedStyle(() => {
        return {
            color: xText.value
        }
    });

    const handleConfirmTextChange = () => {
        setText(tmpText)
        setModalVisible(!modalVisible)
    }

    const handleCancelTextChange = () => {
        setTmpText(text)
        setModalVisible(!modalVisible)
    }

    const handleMap = (val) => {
        setMap(val)
    }

    const handleTextColorSlider = () => {
        if (text !== "") {
            return (
                <View style={style.sliders}>
                    <Text>Background color</Text>
                    <EditColorSlider onColorChange={onBackgroundColorChanged} start={0}/>
                    <Text>Text Color</Text>
                    <EditColorSlider onColorChange={onTextColorChanged}/>
                </View>
            );
        }
        return (
            <View style={style.onlyBackgroundSlider}>
                <Text>Background color</Text>
                <EditColorSlider onColorChange={onBackgroundColorChanged} start={0}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={style.safeViewArea}>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={style.container}>
                <Pressable style={
                    style.twokPressableView}
                           onPress={() => {
                               setModalVisible(true)
                           }}
                >
                    <Animated.View style={[style.twokBackground, backgroundStyle]}>
                        <Modal animationType={"fade"}
                               transparent={true}
                               visible={modalVisible}
                               onRequestClose={() => {
                                   setModalVisible(!modalVisible)
                               }}
                        >
                            <View style={style.modalCenteredView}>
                                <View style={style.modalView}>
                                    <TextInput style={style.textinput}
                                               onChangeText={(newTmpText) => setTmpText(newTmpText)}
                                               value={tmpText}
                                    />
                                    <View style={style.modalButtons}>
                                        <CancelButton onCancel={handleCancelTextChange}/>
                                        <ConfirmButton onConfirm={handleConfirmTextChange}/>
                                    </View>
                                </View>
                            </View>
                        </Modal>
                        <View style={style.textView}>
                            <Animated.Text style={textStyle}>{text}</Animated.Text>
                        </View>
                    </Animated.View>
                </Pressable>
                <View style={style.buttonsView}>
                    <EditXAlignButton onPress={setAlignX}></EditXAlignButton>
                    <EditYAlignButton onPress={setAlignY}></EditYAlignButton>
                    <FontSizeButton onPress={setAlignX}></FontSizeButton>
                    <FontTypeButton onPress={setAlignX}></FontTypeButton>
                    <MapButton onPress={handleMap}></MapButton>
                    <View style={style.confirmCancelButtons}>
                        <ConfirmButton></ConfirmButton>
                        <CancelButton></CancelButton>
                    </View>
                </View>
            </View>
            {handleTextColorSlider()}
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeViewArea: {
        flex: 1
    },
    container: {
        flex: 5,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flexDirection: "row",
    },
    twokPressableView: {
        flex: 6,
        marginTop: 30,
        marginBottom: 15,
        marginHorizontal: 5,
        borderRadius: 30
    },
    twokBackground: {
        flex: 1,
        borderRadius: 30
    },
    sliders: {
        flex: 0.75,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    onlyBackgroundSlider: {
        flex: 0.5,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonsView: {
        flex: 1,
        marginVertical: 30,
        flexDirection: "column",
    },
    confirmCancelButtons: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
    textView: {
        paddingVertical: 20,
        paddingHorizontal: 20
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
    textinput: {
        borderColor: "black",
        borderBottomWidth: 1,
        padding: 5
    }


});
export default AddTwok;