import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import {Component, useRef, useState} from "react";

const FollowUnfollowButton = (props) => {
    const contentToShow = useRef(props.isFollow ?
        <Icon name="user-unfollow" color="white" size={20}/> : <Text style={styles.text}>Segui</Text>);

    function changeState() {
        if (props.isFollow) {
            contentToShow.current = <Text style={styles.text}>Segui</Text>;
            props.unfollow(!props.follow)
            //setContentToShow(<Text style={styles.text}>Segui</Text>);
        } else {
            contentToShow.current = <Icon name="user-unfollow" color="white" size={20}/>;
            props.follow(!props.follow)
            // setContentToShow(<Icon name="user-unfollow" color="white" size={20}/>);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                changeState();
                props.follow(contentToShow)
            }}>
                <View style={styles.button}>
                    {contentToShow.current}
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