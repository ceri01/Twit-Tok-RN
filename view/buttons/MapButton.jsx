import Icon from "react-native-vector-icons/FontAwesome5"
import {StyleSheet, TouchableHighlight, View} from "react-native";
import {Component} from "react";

class MapButton extends Component {
    icon = <Icon name="map-marked-alt" size={20} color="white"></Icon>

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                    this.props.onPress(true);
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



export default MapButton;