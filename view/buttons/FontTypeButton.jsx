 import Icon from "react-native-vector-icons/FontAwesome"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class FontTypeButton extends Component {
    state = {
        type: 0,
        font: "Arial"
    }
    icon = <Icon name="font" size={20} color="white"></Icon>

    handleTextType() {
        switch (this.state.type) {
            case 0:
                this.state.type++;
                this.state.font = "Times New Roman";
                break;
            case 1:
                this.state.type++;
                this.state.font = "ourier New";
                break;
            default:
                this.state.type = 0;
                this.state.font = "Arial";
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                    this.handleTextType();
                    this.props.onPress(this.state.type, this.state.font);
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


export default FontTypeButton;