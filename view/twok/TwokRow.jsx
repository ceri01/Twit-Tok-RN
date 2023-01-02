import {Component} from "react";
import {Dimensions, StatusBar, StyleSheet, Text, View} from "react-native";

class TwokRow extends Component {
    render() {
        return (
            <View style={style.twokStyle}>
                <Text style={style.text}>{this.props.data.text}</Text>
            </View>
        );
    }
}

const style = StyleSheet.create({ // TODO: Sistemare lo stile in base ai twok da mostrare
   twokStyle: {
       flex: 1,
       width: "100%",
       height: Dimensions.get('window').height - StatusBar.currentHeight - 110, // 110 is dimension of navigation bar
       backgroundColor: "yellow",
       justifyContent: "center",
       alignItems: "center"
   },
    text: {
       fontSize: 40,
       fontWeight: "700",
       backgroundColor: "green"
   }
});

export default TwokRow;