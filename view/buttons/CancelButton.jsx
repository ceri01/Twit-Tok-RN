import {StyleSheet, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign"

const CancelButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                props.onCancel()
            }}>
                <View style={styles.button}>
                    <Icon name="close" size={20} color="white"></Icon>
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
        paddingVertical: 10,
    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
        height: 40,
        width: 40,
        borderRadius: 100
    },
    touchableHighlight: {
        borderRadius: 100
    }
});


export default CancelButton;