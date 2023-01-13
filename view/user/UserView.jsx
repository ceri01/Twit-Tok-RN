import {Component} from "react";
import {StyleSheet, View} from "react-native";
import UserName from "./UserName";
import UserPicture from "./UserPicture";
import FollowUnfollowButton from "../buttons/FollowUnfollowButton";

class UserView extends Component {

    render() {
        return (
            <View style={style.userViewContainer}>
                <View style={style.pic}>
                    <UserPicture changePicDimension={this.props.isInWall}></UserPicture>
                </View>
                <View style={style.userName}>
                    <UserName userName={this.props.data.name}></UserName>
                </View>
                <View style={style.button}>
                    <FollowUnfollowButton follow={true} onPress={() => {}}></FollowUnfollowButton>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    userViewContainer: {
        flex: 1,
        flexDirection: "row",
    },
    userName: {
        flex: 3,
        alignContent: "flex-start",
    },
    pic: {
        flex: 0.8,
        paddingVertical: 10
    },
    button: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});

export default UserView;