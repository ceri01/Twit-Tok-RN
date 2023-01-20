import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {useRef, useState} from "react";

const EditXAlignButton = (props) => {

    const alignX = useRef(1);
    const reset = useRef(false)
    const [icon, setIcon] = useState(<Icon name="format-align-center" size={20} color="white"/>);

    if (reset.current !== props.reset) {
        reset.current = props.reset
        props.onReset();
        alignX.current = 1;
        setIcon(<Icon name="format-align-center" size={20} color="white"/>);
    } else {
        reset.current = false;
    }

    function handleIcon() {
        switch (alignX.current) {
            case 1:
                setIcon(<Icon name="format-align-center" size={20} color="white"/>);
                break;
            case 2:
                setIcon(<Icon name="format-align-right" size={20} color="white"/>);
                break;
            default:
                setIcon(<Icon name="format-align-left" size={20} color="white"/>);
                break;
        }
    }

    function handleAlignment() {
        if (alignX.current < 2) {
            alignX.current += 1;
        } else {
            alignX.current = 0
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                handleAlignment();
                handleIcon();
                props.onPress(alignX.current);
            }}>
                <View style={styles.button}>
                    {icon}
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee",
        height: 40,
        width: 40,
        borderRadius: 100
    },
    touchableHighlight: {
        borderRadius: 100
    }
});

export default EditXAlignButton;