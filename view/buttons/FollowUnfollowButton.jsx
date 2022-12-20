import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import {Component} from "react";

class FollowUnfollowButton extends Component {
    state = {
        contentToShow: null
    }

    constructor(props) {
        super(props)
        if(this.props.follow === true) {
            this.state.contentToShow = <Icon name="user-unfollow" color="white" size={20}></Icon>
        } else {
            this.state.contentToShow = <Text style={styles.text}>Segui</Text>
        }
    }

    changeState() {
        if(this.state.follow === true) {
            this.state.follow = false
            this.state.contentToShow = <Text style={styles.text}>Segui</Text>
        } else {
            this.state.follow = true
            this.state.contentToShow = <Icon name="user-unfollow" color="white" size={20}></Icon>
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                    this.changeState();
                    this.forceUpdate();
                    this.props.onPress(this.state.contentToShow)
                }}>
                    <View style={styles.button}>
                        {this.state.contentToShow}
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        height: 60,
        width: 120
    },
    button: {
        backgroundColor: "#6200ee",
        padding: 10,
        borderRadius: 5
    },
    touchableHighlight: {
        borderRadius: 5
    },
    text: {
        color: "white",
        fontSize: 19
    }
});

export default FollowUnfollowButton;