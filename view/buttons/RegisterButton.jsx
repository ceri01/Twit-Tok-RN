import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

const RegisterButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                props.onPress()
            }}>
                <View style={styles.button}>
                    <Text style={styles.text}>Start!</Text>
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
        padding: 10,
        borderWidth: 1,
        width: 300,
        backgroundColor: "#6200ee",
        borderRadius: 10
    },
    touchableHighlight: {
        borderRadius: 100
    },
    text: {
        fontSize: 50,
        color: "white"
    }
});

export default RegisterButton;