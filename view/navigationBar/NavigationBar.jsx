import {StyleSheet, View} from "react-native";
import {Component} from "react";
import Profile from "./Profile";
import NewTwok from "./NewTwok";
import TwoksButton from "./TwoksButton";

class NavigationBar extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TwoksButton style={{flex: 3}}/>
                <NewTwok style={{flex: 3}}/>
                <Profile style={{flex: 3}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
});


export default NavigationBar;