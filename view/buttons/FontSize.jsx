import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class EditYAlignButton extends Component {
    state = {
        size: 1
    }
    icon = <Icon name="format-size" size={30} color="white"></Icon>

    handleTextSize() {
        if (this.state.size < 2) {
            this.state.size++;
        } else {
            this.state.size = 0;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                    this.handleTextSize();
                    this.props.onPress(this.state.size);
                }}>
                    <View style={styles.button}>
                        {this.icon}
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


export default EditYAlignButton;