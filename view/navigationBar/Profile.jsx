import Icon from "react-native-vector-icons/FontAwesome"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class Profile extends Component {
    state = {
        icon: <Icon name="user-o" size={30} color="white"></Icon>
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
        backgroundColor: "#6200ee",
        padding: 10
    }
});

export default Profile;