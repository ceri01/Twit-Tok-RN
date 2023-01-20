import {StyleSheet, Text, TouchableHighlight, View} from "react-native";

const UserName = (props) => {
    function handleStyle() {
        if (!props.isProfileName) {
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

    function renderText() {
        if (props.isProfileName) {
            return <Text style={style.text}>{props.userName}</Text>;
        } else {
            return (
                <TouchableHighlight onPress={() => {
                }}>
                    <Text style={style.text}>{props.userName}</Text>
                </TouchableHighlight>
            );
        }
    }

    return (
        <View style={handleStyle()}>
            {renderText()}
        </View>
    );
}

const style = StyleSheet.create({
    text: {
        fontSize: 20,
    }
});

export default UserName;