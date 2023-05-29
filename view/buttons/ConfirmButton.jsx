import {StyleSheet, TouchableHighlight, View} from "react-native"
import Icon from "react-native-vector-icons/AntDesign"

const ConfirmButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                props.onConfirm()
            }}>
                <View style={styles.button}>
                    <Icon name="check" size={20} color="white"></Icon>
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
        backgroundColor: "green",
        height: 40,
        width: 40,
        borderRadius: 100
    },
    touchableHighlight: {
        borderRadius: 100
    }
})

export default ConfirmButton