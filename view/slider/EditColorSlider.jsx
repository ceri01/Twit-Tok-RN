import {LinearGradient} from "expo-linear-gradient"
import * as React from "react";
import {Dimensions, StyleSheet} from "react-native"
import {Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue, withSpring, withTiming,
} from "react-native-reanimated";
import {useRef, useState} from "react";

const SLIDER_WIDTH = Dimensions.get('window').width * 0.9;
const CIRCLE_PICKER_SIZE = 24
const COLORS = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white',
];

const EditColorSlider = (props) => {
    const translateX = useSharedValue(props.start !== undefined ? props.start : 0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const context = useSharedValue(0);
    const reset = useRef(false);
    const [reRender, setReRender] = useState(0)

    const adjustedTranslateX = useDerivedValue(() => {
        return Math.min(Math.max(translateX.value, 0), SLIDER_WIDTH);
    });

    if (reset.current !== props.reset) {
        reset.current = props.reset;
        context.value = 0;
        translateY.value = 0;
        scale.value = 1;
        translateX.value = props.start !== undefined ? props.start : SLIDER_WIDTH - 15;
        props.onReset();
        setReRender(reRender + 1);
    } else {
        reset.current = false;
    }

    const panGestureEvent = Gesture.Pan()
        .onStart(() => {
            context.value = adjustedTranslateX.value;
            translateY.value = withSpring(-24);
            scale.value = withSpring(1.2);
        })
        .onUpdate((event) => {
            translateX.value = event.translationX + context.value;
        })
        .onEnd(() => {
            translateY.value = withSpring(0);
            scale.value = withSpring(1);
        });

    const tapGestureEvent = Gesture.Tap()
        .onBegin((event) => {
            translateX.value = withTiming(event.absoluteX - CIRCLE_PICKER_SIZE, {
                duration: 0,
            })
        })
        .onFinalize(() => {
        });

    const animatedPickerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: adjustedTranslateX.value},
                {scale: scale.value},
                {translateY: translateY.value}
            ],
        };
    });

    const animatedInternalPickerStyle = useAnimatedStyle(() => {
        const inputRange = COLORS.map((_, index) => (index / COLORS.length) * SLIDER_WIDTH);
        const color = interpolateColor(adjustedTranslateX.value, inputRange, COLORS, "RGB");
        props.onColorChange(color, adjustedTranslateX.value);
        return {
          backgroundColor: color
        };
    })

    return <GestureHandlerRootView style={style.gestureContainer}>
        <GestureDetector gesture={tapGestureEvent}>
            <Animated.View style={style.gestureContainer}>
                <LinearGradient
                    colors={COLORS}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={style.gradient}
                />
                <GestureDetector gesture={panGestureEvent}>
                    <Animated.View style={[style.picker, animatedPickerStyle]}>
                        <Animated.View style={[style.internalPicker, animatedInternalPickerStyle]}/>
                    </Animated.View>
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    </GestureHandlerRootView>
}

const style = StyleSheet.create({
    gestureContainer: {
        justifyContent: "center",
        width: SLIDER_WIDTH,
    },
    gradient: {
        position: "absolute",
        borderColor: "black",
        borderWidth: 0.15,
        height: 12,
        width: SLIDER_WIDTH,
        borderRadius: 12/2
    },
    picker: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#abc",
        width: CIRCLE_PICKER_SIZE,
        height: CIRCLE_PICKER_SIZE,
        borderRadius: 12,
    },
    internalPicker: {
        width: CIRCLE_PICKER_SIZE / 2,
        height: CIRCLE_PICKER_SIZE / 2,
        borderRadius: 6,
        borderWidth: 1.0,
        borderColor: 'rgba(0,0,0,0.2)',
    }
});

export default EditColorSlider;