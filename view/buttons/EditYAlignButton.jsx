import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class EditYAlignButton extends Component {
    state = {
        alignY: 1,
        icon: <Icon name="format-align-middle" size={20} color="white"></Icon>
    }


    handleIcon() {
        switch (this.state.alignY) {
            case 1:
                this.state.icon = <Icon name="format-align-middle" size={20} color="white"></Icon>
                break;
            case 2:
                this.state.icon = <Icon name="format-align-bottom" size={20} color="white"></Icon>
                break;
            default:
                this.state.icon = <Icon name="format-align-top" size={20} color="white"></Icon>
                break;
        }
    }

    handleAlignment() {
        if (this.state.alignY < 2) {
            this.state.alignY++;
        } else {
            this.state.alignY = 0;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                    this.handleAlignment();
                    this.handleIcon();
                    this.forceUpdate();
                    this.props.onPress(this.state.alignY);
                }}>
                    <View style={styles.button}>
                        {this.state.icon}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
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
        backgroundColor: "#6200ee",
        height: 40,
        width: 40,
        borderRadius: 100
    },
    touchableHighlight: {
        borderRadius: 100
    }
});


export default EditYAlignButton;