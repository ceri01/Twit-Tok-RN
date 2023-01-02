import {LinearGradient} from "expo-linear-gradient"
import * as React from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native"
import {Gesture, GestureDetector, GestureHandlerRootView, PanGestureHandler} from "react-native-gesture-handler";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue, withSpring, withTiming,
} from "react-native-reanimated";


const SLIDER_WIDTH = Dimensions.get('window').width * 0.9;
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
    const translateX = useSharedValue(-SLIDER_WIDTH);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);
    const context = useSharedValue(0);

    const adjustedTranslateX = useDerivedValue(() => {
        return Math.max(Math.min(translateX.value, SLIDER_WIDTH/2), -(SLIDER_WIDTH/2));
    });

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
            translateX.value = withTiming(event.absoluteX - (SLIDER_WIDTH / 1.8), {
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
        const inputRange = COLORS.map((_, index) => ((index - Math.floor(COLORS.length/2)) / COLORS.length) * SLIDER_WIDTH);
        const backgroundColor = interpolateColor(translateX.value, inputRange, COLORS);
        props.onColorChange(backgroundColor);
        return {
            backgroundColor
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
        width: SLIDER_WIDTH,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red"
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
        width: 24,
        height: 24,
        borderRadius: 12,
    },
    internalPicker: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 1.0,
        borderColor: 'rgba(0,0,0,0.2)',
    }
});

export default EditColorSlider;