import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class EditYAlignButton extends Component {
    state = {
        alignY: 1,
        icon: <Icon name="format-align-middle" size={30} color="white"></Icon>
    }


    handleIcon() {
        switch (this.state.alignY) {
            case 1:
                this.state.icon = <Icon name="format-align-middle" size={30} color="white"></Icon>
                break;
            case 2:
                this.state.icon = <Icon name="format-align-bottom" size={30} color="white"></Icon>
                break;
            default:
                this.state.icon = <Icon name="format-align-top" size={30} color="white"></Icon>
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
                    console.log(this.state.icon)
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


export default EditYAlignButton;