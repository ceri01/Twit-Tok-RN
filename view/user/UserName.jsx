import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

const UserName = (props) => {
    return (
        <View style={style.layout}>
            <TouchableHighlight onPress={() => {
            }}>
                <Text style={style.text}>{props.userName}</Text>
            </TouchableHighlight>
        </View>
    );
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
    },
    layout: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingHorizontal: 10,
    }

});

export default UserName;