import {Platform, StyleSheet, Text, View} from "react-native";
import UserView from "../user/UserView";
const USERVIEWHEIGHT = 60;

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
            height: props.dimensions.WindowHeight - props.dimensions.TabHeight - USERVIEWHEIGHT - props.dimensions.StatusBarHeight,
            width: "100%",
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
        <View>
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
        height: USERVIEWHEIGHT,
        borderBottomWidth: 1,
        borderRadius: 30

    },
    text: {
        fontSize: 40,
        fontWeight: "700",
    }
});

export default TwokRow;