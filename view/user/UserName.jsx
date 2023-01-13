import {Component} from "react";
import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

class UserName extends Component {

    handleStyle = () => {
        if (!this.props.isProfileName) {
            return {
                flex: 1,
                justifyContent: "center",
                alignItems: "flex-start",
                paddingHorizontal: 10,
            }
        }
        return {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
        }
    }
    render() {
        return (
            <View style={this.handleStyle()}>
                <TouchableHighlight onPress={() => {}}>
                    <Text style={style.text}>{this.props.userName}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
    }
});

export default UserName;