import React, {useCallback, useRef, useState} from "react";
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
import ConfirmButton from "./buttons/ConfirmButton";
import CancelButton from "./buttons/CancelButton";
import FontSizeButton from "./buttons/FontSizeButton";
import FontTypeButton from "./buttons/FontTypeButton";
import MapButton from "./buttons/MapButton";

function AddTwok({navigation, route}) {
    const textAlignament = new Map([[0, "flex-start"], [1, "center"], [2, "flex-end"]]);

    const alignX = useRef(1);
    const alignY = useRef(1);

    const [text, setText] = useState("");
    const [tmpText, setTmpText] = useState("");
    const [textViewStyle, setTextViewStyle] = useState({
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: textAlignament.get(alignX.current),
        justifyContent: textAlignament.get(alignY.current)
    })

    const [map, setMap] = useState(false);

    const [modalVisible, setModalVisible] = useState(false)
    const xBackgroundSlider = useSharedValue(-1);
    const xTextSlider = useSharedValue(270);
    const fontType = useSharedValue(0);
    const fontSize = useSharedValue(1);

    const onTextXChanged = (x) => {
        alignX.current = x
        setTextViewStyle({
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: textAlignament.get(alignX.current),
            justifyContent: textAlignament.get(alignY.current)
        })
    }

    const onTextYChanged = (y) => {
        alignY.current = y
        setTextViewStyle({
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: textAlignament.get(alignX.current),
            justifyContent: textAlignament.get(alignY.current)
        })
    }

    const onFontTypeChanged = useCallback((type) => {
        'worklet';
        fontType.value = type
    }, []);

    const onFontSizeChanged = useCallback((size) => {
        'worklet';
        fontSize.value = size
    }, []);

    const onBackgroundColorChanged = useCallback((color) => {
        'worklet';
        xBackgroundSlider.value = color;
    }, []);

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: xBackgroundSlider.value
        }
    });

    const onTextColorChanged = useCallback((color) => {
        'worklet';
        xTextSlider.value = color;
    }, []);

    const textStyle = useAnimatedStyle(() => {
        const textFontType = new Map([[0, "System"], [1, "monospace"], [2, "serif"]]);
        console.log(textFontType.get(fontType.value))
        return {
            color: xTextSlider.value,
            fontSize: (fontSize.value + 1) * 25,
            fontFamily: textFontType.get(fontType.value)
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
                               }
                               }>
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
                        <View style={textViewStyle}>
                            <Animated.Text style={[textStyle]}>{text}</Animated.Text>
                        </View>
                    </Animated.View>
                </Pressable>
                <View style={style.buttonsView}>
                    <EditXAlignButton onPress={onTextXChanged}></EditXAlignButton>
                    <EditYAlignButton onPress={onTextYChanged}></EditYAlignButton>
                    <FontSizeButton onPress={onFontSizeChanged}></FontSizeButton>
                    <FontTypeButton onPress={onFontTypeChanged}></FontTypeButton>
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