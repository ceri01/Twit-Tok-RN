import {StyleSheet, View} from "react-native";
import UserName from "./UserName";
import UserPicture from "./UserPicture";
import FollowUnfollowButton from "../buttons/FollowUnfollowButton";
import {addFollow, removeFollow} from "../../viewmodel/FollowHandler";
import {useRef} from "react";


const UserView = (props) => {
    const followStatus = useRef(props.followed);

    function follow(followed) {
        followStatus.current = followed;
        addFollow(props.uid);
    }

    function unfollow(followed) {
        followStatus.current = followed;
        removeFollow(props.uid);
    }

    // user picture => getUserPicture(props.uid, props.pversion)

    return (
        <View style={style.userViewContainer}>
            <View style={style.pic}>
                <UserPicture source="aaa"/>
            </View>
            <View style={style.userName}>
                <UserName userName={props.name}/>
            </View>
            <View style={style.button}>
                <FollowUnfollowButton follow={follow} unfollow={unfollow} isFollow={followStatus.current} />
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