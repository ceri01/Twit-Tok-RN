import {SafeAreaView, StyleSheet, View} from "react-native";
import ProfileName from "./ProfileName";
import ProfilePicture from "./ProfilePicture";
import FollowUnfollowButton from "../buttons/FollowUnfollowButton";
import {addFollow, removeFollow} from "../../viewmodel/FollowHandler";
import {useRef} from "react";
import ProfileButtons from "./ProfileButtons";


const ProfileView = (props) => {
/*    const followStatus = useRef(props.followed);

    function follow(followed) {
        followStatus.current = followed;
        addFollow(props.uid);
    }

    function unfollow(followed) {
        followStatus.current = followed;
        removeFollow(props.uid);
    }*/

    // user picture => getUserPicture(props.uid, props.pversion)

    return (
        <View style={style.ProfileViewContainer}>
            <View style={style.pic}>
                <ProfilePicture pic={props.profilePicture}/>
            </View>
            <View style={style.profile}>
                <ProfileName userName={props.profileName}/>
                <ProfileButtons userName={props.profileName} pic={props.profilePicture}></ProfileButtons>
            </View>
            {/*            <View style={style.button}>
                <FollowUnfollowButton follow={follow} unfollow={unfollow} isFollow={followStatus.current} />
            </View>*/}
        </View>
    );
}

const style = StyleSheet.create({
    ProfileViewContainer: {
        flex: 1,
        flexDirection: "row",
    },
    pic: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 10
    },
    profile: {
        flex: 3,
        flexDirection: "column"
    },
});

export default ProfileView;