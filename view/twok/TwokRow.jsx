import {Component} from "react";
import {Dimensions, StatusBar, StyleSheet, Text, View} from "react-native";
import UserView from "../user/UserView";

class TwokRow extends Component {
    render() {
        return (
            <View style={style.twokStyle}>
                <View style={style.user}>
                    <UserView data={this.props.data} isInWall={this.props.isInWall}></UserView>
                </View>
                <View style={style.twokContent}>
                    <Text style={style.text}>{this.props.data.text}</Text>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({ // TODO: Sistemare lo stile in base ai twok da mostrare
    user: {
        height: 60,
        borderBottomWidth: 1,
        borderRadius: 30

    },
    twokContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    twokStyle: {
        flex: 1,
        width: "100%",
        height: Dimensions.get('window').height - StatusBar.currentHeight - 110, // 110 is dimension of navigation bar
    },
    text: {
        fontSize: 40,
        fontWeight: "700",
    }
});

export default TwokRow;