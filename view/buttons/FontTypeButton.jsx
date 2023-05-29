import Icon from "react-native-vector-icons/FontAwesome"
import {StyleSheet, TouchableHighlight, View} from "react-native"
import {useRef, useState} from "react"

const FontTypeButton = (props) => {

    const type = useRef(0)
    const [icon, _] = useState(<Icon name="font" size={20} color="white"/>)

    function handleTextType() {
        switch (type.current) {
            case 0:
                type.current++
                break
            case 1:
                type.current++
                break
            default:
                type.current = 0
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                handleTextType()
                props.onPress(type.current)
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


export default FontTypeButton