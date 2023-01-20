import {StyleSheet, View} from "react-native";
import UserName from "./UserName";
import UserPicture from "./UserPicture";
import FollowUnfollowButton from "../buttons/FollowUnfollowButton";

const UserView = (props) => {
    function onChangeFollow(value) {
        console.log() // TODO: handle
    }

    return (
        <View style={style.userViewContainer}>
            <View style={style.pic}>
                <UserPicture changePicDimension={props.isInWall}/>
            </View>
            <View style={style.userName}>
                <UserName userName={props.data.name}/>
            </View>
            <View style={style.button}>
                <FollowUnfollowButton changeFollowStatus={onChangeFollow} follow={true}/>
            </View>
        </View>
    );
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