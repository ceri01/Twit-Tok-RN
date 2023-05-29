import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native"
import {useRef, useState} from "react"

const FontSizeButton = (props) => {
    const size = useRef(1)
    const [icon, _] = useState(<Icon name="format-size" size={20} color="white"/>)

    function handleTextSize() {
        if (size.current < 2) {
            size.current++
        } else {
            size.current = 0
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                handleTextSize()
                props.onPress(size.current)
            }}>
                <View style={styles.button}>
                    {icon}
                </View>
            </TouchableHighlight>
        </View>
    )
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
})

export default FontSizeButton