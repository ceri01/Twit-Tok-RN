import React, {useCallback, useRef, useState} from "react"
import {Alert, Dimensions, Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View} from "react-native"
import EditColorSlider from "./slider/EditColorSlider"
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated"
import EditXAlignButton from "./buttons/EditXAlignButton"
import EditYAlignButton from "./buttons/EditYAlignButton"
import ConfirmButton from "./buttons/ConfirmButton"
import FontSizeButton from "./buttons/FontSizeButton"
import FontTypeButton from "./buttons/FontTypeButton"
import MapButton from "./buttons/MapButton"
import ResetButton from "./buttons/ResetButton"
import CustomTextModal from "./modal/CustomTextModal"
import CustomMapModal from "./modal/CustomMapModal"
import {getColorHex, sendTwok} from "../viewmodel/TwokHandler"

const ALIGNAMENTS = new Map([[0, "flex-start"], [1, "center"], [2, "flex-end"]])
const PAGE_WIDTH = Dimensions.get('window').width * 0.9

function AddTwok({route}) {
    // Data to be provided to the server (through model)
    const alignXData = useRef(1)
    const alignYData = useRef(1)
    const fontTypeData = useSharedValue(0)
    const fontSizeData = useSharedValue(1)
    const [twokTextData, setTwokTextData] = useState("")
    const latitudeData = useRef(null)
    const longitudeData = useRef(null)

    // these two data must be adapted to be sended
    const positionOfBgColorPicker = useSharedValue(0) // used to generate hex code of backfround color
    const positionOfTextColorPicker = useSharedValue(0) // used to generate hex code of text color

    // data used to manage view
    const backgroundColorData = useSharedValue(-1) // value to set color of view (value unsuitable to be passed to the server)
    const twokTextColorData = useSharedValue(270) // value to set color of Text (value unsuitable to be passed to the server)
    const reset = useRef(false) // flag to reset page
    const [textModalVisible, setTextModalVisible] = useState(false) // flag to display text modal
    const [mapModalVisible, setMapModalVisible] = useState(false) // flag to display text modal
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
        'worklet'
        fontTypeData.value = type
    }, [])

    const onFontSizeChanged = useCallback((size) => {
        'worklet'
        fontSizeData.value = size
    }, [])

    const onBackgroundColorChanged = useCallback((color, val) => {
        'worklet'
        positionOfBgColorPicker.value = val
        backgroundColorData.value = color
    }, [])

    const backgroundColorAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: backgroundColorData.value
        }
    })

    const onTwokTextColorChanged = useCallback((color, val) => {
        'worklet'
        positionOfTextColorPicker.value = val
        twokTextColorData.value = color
    }, [])

    const twokTextAnimatedStyle = useAnimatedStyle(() => {
        let textFontType = new Map([[0, "System"], [1, "monospace"], [2, "serif"]])
        if (Platform.OS === 'ios') {
            textFontType = new Map([[0, "System"], [1, "Menlo"], [2, "Palatino"]])
        }
        return {
            color: twokTextColorData.value,
            fontSize: (fontSizeData.value + 1) * 20,
            fontFamily: textFontType.get(fontTypeData.value)
        }
    })

    const handleLatitude = (latitude) => {
        latitudeData.current = latitude
    }

    const handleLongitude = (longitude) => {
        longitudeData.current = longitude
    }

    const handleMap = () => {
        setMapModalVisible(true)
    }

    const showMap = () => {
        if (mapModalVisible) {
            return <CustomMapModal visibility={mapModalVisible}
                                   width={route.params.WindowWidth}
                                   onChangeVisibility={setMapModalVisible}
                                   latitude={latitudeData.current}
                                   longitude={longitudeData.current}
                                   onChangeLatitude={handleLatitude}
                                   onChangeLongitude={handleLongitude}
                                   isInWall={false}
                                   isReset={reset}
                                   onReset={handleReset}>
            </CustomMapModal>
        }
    }

    const resetPageState = () => {
        reset.current = true
        alignYData.current = 1
        alignXData.current = 1
        backgroundColorData.value = -1
        twokTextColorData.value = 270
        fontTypeData.value = 0
        fontSizeData.value = 1
        setTextViewStyle({
            flex: 1,
            paddingVertical: 20,
            paddingHorizontal: 20,
            alignItems: ALIGNAMENTS.get(alignXData.current),
            justifyContent: ALIGNAMENTS.get(alignYData.current)
        })
        latitudeData.current = null
        longitudeData.current = null
        handleMap(false)
        setTextModalVisible(false)
        setMapModalVisible(false)
        setTwokTextData("")
    }

    const handleReset = () => {
        reset.current = false
    }

    const renderSlider = () => {
        if (twokTextData.trim() !== "") {
            return (
                <View style={style.slidersView}>
                    <Text>Background color</Text>
                    <EditColorSlider onColorChange={onBackgroundColorChanged} start={200} reset={reset.current}
                                     onReset={handleReset}/>
                    <Text>Text Color</Text>
                    <EditColorSlider onColorChange={onTwokTextColorChanged} reset={reset.current}
                                     onReset={handleReset}/>
                </View>
            )
        }
        return (
            <View style={style.backgroundSliderView}>
                <Text>Background color</Text>
                <EditColorSlider onColorChange={onBackgroundColorChanged} start={200} reset={reset.current}
                                 onReset={handleReset}/>
            </View>
        )
    }

    return (
        <SafeAreaView style={style.safeViewArea}>
            <StatusBar barStyle="light-content" backgroundColor="#6200ee"/>
            <View style={style.mainContainer}>
                <Pressable style={style.twokPressableView}
                           onPress={() => {
                               setTextModalVisible(true)
                           }}
                >
                    <Animated.View style={[style.twokBackground, backgroundColorAnimatedStyle]}>
                        <CustomTextModal visibility={textModalVisible}
                                         onChangeVisibility={setTextModalVisible}
                                         text={twokTextData}
                                         onChangeText={setTwokTextData}
                                         isReset={reset}
                                         onReset={handleReset}>
                        </CustomTextModal>
                        <View style={textViewStyle}>
                            <Animated.Text style={[twokTextAnimatedStyle]}>{twokTextData}</Animated.Text>
                        </View>
                    </Animated.View>
                </Pressable>
                <View style={style.buttonsView}>
                    <View style={style.element}>
                        <ResetButton onPress={resetPageState}></ResetButton>
                    </View>
                    <View style={style.element}>
                        <EditXAlignButton reset={reset.current} onReset={handleReset}
                                          onPress={onTextXChanged}/>
                    </View>
                    <View style={style.element}>
                        <EditYAlignButton reset={reset.current} onReset={handleReset}
                                          onPress={onTextYChanged}/>
                    </View>
                    <View style={style.element}>
                        <FontSizeButton onPress={onFontSizeChanged}/>
                    </View>
                    <View style={style.element}>
                        <FontTypeButton onPress={onFontTypeChanged}/>
                    </View>
                    <View style={style.element}>
                        <MapButton onPress={handleMap}/>
                    </View>
                    <View style={style.ConfirmButtonView}>
                        <ConfirmButton onConfirm={() => {
                            sendTwok(twokTextData,
                                getColorHex(positionOfBgColorPicker.value, PAGE_WIDTH),
                                getColorHex(positionOfTextColorPicker.value, PAGE_WIDTH),
                                fontSizeData.value,
                                fontTypeData.value,
                                alignXData.current,
                                alignYData.current,
                                latitudeData.current,
                                longitudeData.current).then(() => {
                                resetPageState()
                                Alert.alert("Success!", "Twok sent")
                            }).catch(() => {
                                Alert.alert("Connection error.", "Is not possible to send twok, check your connection")
                            })
                        }}></ConfirmButton>
                    </View>
                </View>
            </View>
            {renderSlider()}
            {showMap()}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    safeViewArea: {
        flex: 1
    },
    element: {
        flex: 0.5
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
})
export default AddTwok