import {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

class UserName extends Component {
    render() {
        return (
            <View style={style.container}>
                <TouchableHighlight onPress={() => {}}>
                    <Text style={style.text}>{this.props.userName}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 10
    },
    text: {
        fontSize: 20,
    }
});

export default UserName;