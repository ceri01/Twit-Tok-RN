import {StyleSheet, View} from "react-native";
import UserName from "./UserName";
import UserPicture from "./UserPicture";
import FollowUnfollowButton from "../buttons/FollowUnfollowButton";
import {addFollow, removeFollow} from "../../viewmodel/FollowHandler";
import {useRef, useState} from "react";


const UserView = (props) => {
    const [followStatus, setFollowStatus] = useState(props.followed);

    function follow(followed) {
        setFollowStatus(followed)
        addFollow(props.uid);
        props.edit();
    }

    function unfollow(followed) {
        setFollowStatus(followed);
        removeFollow(props.uid);
        props.edit();
    }

    return (
        <View style={style.userViewContainer}>
            <View style={style.pic}>
                <UserPicture source="aaa"/>
            </View>
            <View style={style.userName}>
                <UserName userName={props.name}/>
            </View>
            <View style={style.button}>
                <FollowUnfollowButton textSize={props.dimensions} follow={follow} unfollow={unfollow} isFollow={followStatus} />
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