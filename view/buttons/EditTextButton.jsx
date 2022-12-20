import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class EditTextButton extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {}}>
                    <View style={styles.button}>
                        <Icon name="format-text" size={30} color="white"></Icon>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    button: {
        backgroundColor: "#6200ee",
        padding: 10,
        height: 50,
        width: 50,
        borderRadius: 100
    },
    touchableHighlight: {
        borderRadius: 100
    }
});



export default EditTextButton;