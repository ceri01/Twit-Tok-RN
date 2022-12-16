import {StyleSheet, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/AntDesign"
import {Component} from "react";

class CancelButton extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {}}>
                    <View style={styles.button}>
                        <Icon name="close" size={30} color="white"></Icon>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
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


export default CancelButton;