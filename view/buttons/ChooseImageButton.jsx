import {StyleSheet, Text, TouchableHighlight, View} from "react-native"

const ChooseImageButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                props.onPress()
            }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Choose image</Text>
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
        padding: 10,
        borderWidth: 1,
        width: 150,
        backgroundColor: "#6200ee",
        borderRadius: 8
    },
    touchableHighlight: {
        borderRadius: 100
    },
    text: {
        fontSize: 15,
        color: "white"
    }
})

export default ChooseImageButton