import Icon from "react-native-vector-icons/FontAwesome5"
import {StyleSheet, TouchableHighlight, View} from "react-native";

const MapButton = (props) => {
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                props.onPress(true);
            }}>
                <View style={styles.layout}>
                    <Icon name="map-marked-alt" size={20} color="white"></Icon>
                </View>
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    touchableHighlight: {
        borderRadius: 100
    },
    layout: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6200ee",
        height: 40,
        width: 40,
        borderRadius: 100
    }
});

export default MapButton;