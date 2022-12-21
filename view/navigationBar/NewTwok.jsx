import Icon from "react-native-vector-icons/MaterialIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class NewTwok extends Component {
    state = {
        icon: <Icon name="add-circle-outline" size={30} color="white"></Icon>
    }

    render() {
        return (
            <TouchableHighlight style={this.props.style} onPress={() => {}}>
                <View style={styles.button}>
                    {this.state.icon}
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: "#fff",
        backgroundColor: "#6200ee",
        padding: 10
    }
});

export default NewTwok;