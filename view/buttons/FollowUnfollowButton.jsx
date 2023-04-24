import {StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons"
import {useRef} from "react";

const FollowUnfollowButton = (props) => {
    const contentToShow = useRef(props.isFollow ?
        <Icon name="user-unfollow" color="white" size={20}/> : <Text style={{color: "white", fontSize: props.textSize}}>Segui</Text>);

    function changeState() {
        if (props.isFollow) {
            contentToShow.current = <Text style={{color: "white", fontSize: props.textSize}}>Segui</Text>
            props.unfollow(!props.isFollow);
        } else {
            contentToShow.current = <Icon name="user-unfollow" color="white" size={20}/>
            props.follow(!props.isFollow);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight style={styles.touchableHighlight} onPress={() => {
                changeState();
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
        paddingVertical: 10,
    },
    button: {
        backgroundColor: "#6200ee",
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        borderRadius: 5
    },
    touchableHighlight: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
});

export default FollowUnfollowButton;