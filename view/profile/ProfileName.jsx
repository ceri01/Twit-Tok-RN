import {Button, StyleSheet, Text, TouchableHighlight, View} from "react-native";

const ProfileName = (props) => {
    return (
        <View style={style.layout}>
            <View style={style.userName}>
                <TouchableHighlight onPress={() => {
                }}>
                    <Text style={style.text}>{props.userName}</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    layout: {
        flex: 1,
        padding: 10
    },
    text: {
        fontSize: 18,
    },
    userName: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
    },

});

export default ProfileName;