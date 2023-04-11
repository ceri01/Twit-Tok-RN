import {Dimensions, Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import UserView from "../user/UserView";

function TwokRow(props) {
    const ALIGNAMENTS = ["flex-start", "center", "flex-end"];
    let FONTTYPE = null;
    if (Platform.OS === 'ios') {
        FONTTYPE = ["System", "Menlo", "Palatino"];
    } else {
        FONTTYPE = ["System", "monospace", "serif"];
    }

    function twokStyle() {
        return {
            alignItems: ALIGNAMENTS[props.data.halign],
            justifyContent: ALIGNAMENTS[props.data.valign],
            backgroundColor: "#" + props.data.bgcol,
        }
    }

    function twokTextStyle() {
        return {
            color: "#" + props.data.fontcol,
            fontSize: (props.data.fontsize + 1) * 20,
            fontFamily: FONTTYPE[props.data.fonttype],
        }
    }

    return (
        <View style={style.twokStyle}>
            <View style={style.user}>
                <UserView name={props.data.name} pversion={props.data.pversion} uid={props.data.uid} followed={props.data.followed}></UserView>
            </View>
            <View style={twokStyle()}>
                <Text style={twokTextStyle()}>{props.data.text}</Text>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    user: {
        height: 60,
        borderBottomWidth: 1,
        borderRadius: 30

    },
    twokStyle: {
        width: "100%",
        height: Dimensions.get('window').height, // 90 is dimension of navigation bar
    },
    text: {
        fontSize: 40,
        fontWeight: "700",
    }
});

export default TwokRow;