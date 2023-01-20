import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {useRef, useState} from "react";

const EditYAlignButton = (props) => {
    const alignY = useRef(1);
    const reset = useRef(false)
    const [icon, setIcon] = useState(<Icon name="format-align-middle" size={20} color="white"/>);

    if (reset.current !== props.reset) {
        reset.current = props.reset
        props.onReset();
        alignY.current = 1;
        setIcon(<Icon name="format-align-middle" size={20} color="white"/>);
    } else {
        reset.current = false;
    }

    function handleIcon() {
        switch (alignY.current) {
            case 1:
                setIcon(<Icon name="format-align-middle" size={20} color="white"/>);
                break;
            case 2:
                setIcon(<Icon name="format-align-bottom" size={20} color="white"/>);
                break;
            default:
                setIcon(<Icon name="format-align-top" size={20} color="white"/>);
                break;
        }
    }

    function handleAlignment() {
        if (alignY.current < 2) {
            alignY.current++;
        } else {
            alignY.current = 0;
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                handleAlignment();
                handleIcon();
                props.onPress(alignY.current);
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

export default EditYAlignButton;