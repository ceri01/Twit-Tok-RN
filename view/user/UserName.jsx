import {StyleSheet, Text, TouchableHighlight, View} from "react-native"

const UserName = (props) => {
    function renderName() {
        if (props.pressable) {
            return (
                <TouchableHighlight onPress={() => {
                    props.navigate()
                }}>
                    <Text style={style.text}>{props.userName}</Text>
                </TouchableHighlight>
            )
        } else {
            return (
                <Text style={style.text}>{props.userName}</Text>
            )
        }
    }

    return (
        <View style={style.layout}>
            {renderName()}
        </View>
    )
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

})

export default UserName