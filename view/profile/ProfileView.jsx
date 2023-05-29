import {StyleSheet, View} from "react-native"
import ProfileName from "./ProfileName"
import ProfilePicture from "./ProfilePicture"
import ProfileButtons from "./ProfileButtons"


const ProfileView = (props) => {
    function dataEdited() {
        props.edit()
    }

    return (
        <View style={style.ProfileViewContainer}>
            <View style={style.pic}>
                <ProfilePicture pic={props.profilePicture}/>
            </View>
            <View style={style.profile}>
                <ProfileName userName={props.profileName}/>
                <ProfileButtons userName={props.profileName} pic={props.profilePicture}
                                onPress={dataEdited}></ProfileButtons>
            </View>
        </View>
    )
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
})

export default ProfileView