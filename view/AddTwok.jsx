import React, {useCallback, useRef, useState} from "react";
import {
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Pressable
} from "react-native";
import EditColorSlider from "./slider/EditColorSlider";
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import EditXAlignButton from "./buttons/EditXAlignButton";
import EditYAlignButton from "./buttons/EditYAlignButton";
import ConfirmButton from "./buttons/ConfirmButton";
import FontSizeButton from "./buttons/FontSizeButton";
import FontTypeButton from "./buttons/FontTypeButton";
import MapButton from "./buttons/MapButton";
import ResetButton from "./buttons/ResetButton";
import CustomModal from "./modal/CustomModal";

const ALIGNAMENTS = new Map([[0, "flex-start"], [1, "center"], [2, "flex-end"]]);

function AddTwok() {
    // Data to be provided to the server (through model)
    const alignXData = useRef(1);
    const alignYData = useRef(1);
    const fontTypeData = useSharedValue(0);
    const fontSizeData = useSharedValue(1);
    const [twokTextData, setTwokTextData] = useState("");
    // these two data must be adapted to be sended
    const backgroundColorData = useSharedValue(-1);
    const twokTextColorData = useSharedValue(270);
    const latitudeData = useRef(1.0);
    const longitudeData = useRef(1.0);

    const reset = useRef(false); // flag to reset page
    const [modalVisible, setModalVisible] = useState(false) // flag to display modal
    const [textViewStyle, setTextViewStyle] = useState({
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: ALIGNAMENTS.get(alignXData.current),
        justifyContent: ALIGNAMENTS.get(alignYData.current)
    }) // style of twok preview


    const onTextXChanged = (x) => {
        alignXData.current = x
        setTextViewStyle({
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: ALIGNAMENTS.get(alignXData.current),
            justifyContent: ALIGNAMENTS.get(alignYData.current)
        })
    }

    const onTextYChanged = (y) => {
        alignYData.current = y
        setTextViewStyle({
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: ALIGNAMENTS.get(alignXData.current),
            justifyContent: ALIGNAMENTS.get(alignYData.current)
        })
    }

    const onFontTypeChanged = useCallback((type) => {
        'worklet';
        fontTypeData.value = type
    }, []);

    const onFontSizeChanged = useCallback((size) => {
        'worklet';
        fontSizeData.value = size
    }, []);

    const onBackgroundColorChanged = useCallback((color) => {
        'worklet';
        backgroundColorData.value = color;
    }, []);

    const backgroundColorAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundColorData.value
        }
    });

    const onTwokTextColorChanged = useCallback((color) => {
        'worklet';
        twokTextColorData.value = color;
    }, []);

    const twokTextAnimatedStyle = useAnimatedStyle(() => {
        const textFontType = new Map([[0, "System"], [1, "monospace"], [2, "serif"]]);
        return {
            color: twokTextColorData.value,
            fontSize: (fontSizeData.value + 1) * 20,
            fontFamily: textFontType.get(fontTypeData.value)
        }
    });

    const handleMap = (val) => {
        return true // TODO: implement map
    }

    const handleReset = () => {
        reset.current = true
        alignYData.current = 1;
        alignXData.current = 1;
        backgroundColorData.value = -1;
        twokTextColorData.value = 270;
        fontTypeData.value = 0;
        fontSizeData.value = 1;

        setTextViewStyle({
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: ALIGNAMENTS.get(alignXData.current),
            justifyContent: ALIGNAMENTS.get(alignYData.current)
        });
        handleMap(true) // TODO: change parameter
        setModalVisible(false);
        setTwokTextData("");
    }

    const handleSliderReset = () => {
        reset.current = false;
    }

    const renderSlider = () => {
        if (twokTextData !== "") {
            return (
                <View style={style.slidersView}>
                    <Text>Background color</Text>
                    <EditColorSlider onColorChange={onBackgroundColorChanged} start={0} isReset={reset} onReset={handleSliderReset}/>
                    <Text>Text Color</Text>
                    <EditColorSlider onColorChange={onTwokTextColorChanged} isReset={reset} onReset={handleSliderReset}/>
                </View>
            );
        }
        return (
            <View style={style.backgroundSliderView}>
                <Text>Background color</Text>
                <EditColorSlider onColorChange={onBackgroundColorChanged} start={0} isReset={reset} onReset={handleSliderReset}/>
            </View>
        );
    }

    return (
        <SafeAreaView style={style.safeViewArea}>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={style.mainContainer}>
                <Pressable style={style.twokPressableView}
                           onPress={() => {
                               setModalVisible(true)
                           }}
                >
                    <Animated.View style={[style.twokBackground, backgroundColorAnimatedStyle]}>
                        <CustomModal visibility={modalVisible}
                                     onChangeVisibility={setModalVisible}
                                     text={twokTextData}
                                     onChangeText={setTwokTextData}
                                     isReset={reset}
                                     onReset={handleSliderReset}>
                        </CustomModal>
                        <View style={textViewStyle}>
                            <Animated.Text style={[twokTextAnimatedStyle]}>{twokTextData}</Animated.Text>
                        </View>
                    </Animated.View>
                </Pressable>
                <View style={style.buttonsView}>
                    <ResetButton onPress={handleReset}></ResetButton>
                    <EditXAlignButton onPress={onTextXChanged}></EditXAlignButton>
                    <EditYAlignButton onPress={onTextYChanged}></EditYAlignButton>
                    <FontSizeButton onPress={onFontSizeChanged}></FontSizeButton>
                    <FontTypeButton onPress={onFontTypeChanged}></FontTypeButton>
                    <MapButton onPress={handleMap}></MapButton>
                    <View style={style.ConfirmButtonView}>
                        <ConfirmButton></ConfirmButton>
                    </View>
                </View>
            </View>
            {renderSlider()}
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    safeViewArea: {
        flex: 1
    },
    mainContainer: {
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
    slidersView: { // view style used when all slder are rendered
        flex: 0.75,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "space-between"
    },
    backgroundSliderView: { // view style used when text color slider isn't rendered
        flex: 0.5,
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonsView: { // style used for editor buttons view
        flex: 1,
        marginVertical: 30,
        flexDirection: "column",
    },
    ConfirmButtonView: { // style used for confirm button view
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "flex-end",
    },
});
export default AddTwok;