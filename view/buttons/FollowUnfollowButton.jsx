import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import {Component, useState} from "react";

const FollowUnfollowButton = (props) => {
    const [contentToShow, setContentToShow] = useState(props.follow ? <Icon name="user-unfollow" color="white" size={20}/> : <Text style={styles.text}>Segui</Text>);

    function changeState() {
        if(props.follow) {
            props.changeFollowStatus(!props.follow)
            setContentToShow(<Text style={styles.text}>Segui</Text>);
        } else {
            props.changeFollowStatus(!props.follow)
            setContentToShow(<Icon name="user-unfollow" color="white" size={20}/>);
        }
    }
    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                changeState();
                props.onPress(contentToShow)
            }}>
                <View style={styles.button}>
                    {contentToShow}
                </View>
            </TouchableHighlight>
        </View>
    );
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