import {Alert, StyleSheet, View} from "react-native"
import UserName from "./UserName"
import UserPicture from "./UserPicture"
import FollowUnfollowButton from "../buttons/FollowUnfollowButton"
import {useState} from "react"
import MapButton from "../buttons/MapButton"
import CancelButton from "../buttons/CancelButton"
import FollowHandler from "../../viewmodel/FollowHandler"


const UserView = (props) => {
    const [followStatus, setFollowStatus] = useState(props.followed)

    async function follow(followed) {
        await FollowHandler.getFollowedInstance().addFollow(props.uid, props.name, props.pversion, () => {
            Alert.alert("Connection error.", "Is not possible to unfollow, check your connection")
        })
        props.edit()
        setFollowStatus(followed)
    }

    async function unfollow(followed) {
        FollowHandler.getFollowedInstance().removeFollow(props.uid, () => {
            Alert.alert("Connection error.", "Is not possible to unfollow, check your connection")
        }).then(() => {
            /*
                This timeout need to wait the end of removeFollow operations, for some reasons props.edit() is called
                before removeFollow ends
             */
            setTimeout(() => {
                props.edit()
                setFollowStatus(followed)
            }, 80)
        }).catch((err) => {
            console.log(err)
        })
    }

    function renderOtherContent() {
        if (props.isInGenericTwokRow) {
            return <MapButton onPress={() => {
                props.edit()
            }}/>
        } else {
            if (!props.pressable) {
                return (
                    <View style={style.button}>
                        <CancelButton onCancel={() => {
                            props.navigate()
                        }
                        }/>
                        <FollowUnfollowButton textSize={props.dimensions}
                                              follow={follow}
                                              unfollow={unfollow}
                                              isFollow={followStatus}/>
                    </View>
                )
            } else {
                return (
                    <View style={style.button}>
                        <FollowUnfollowButton textSize={props.dimensions}
                                              follow={follow}
                                              unfollow={unfollow}
                                              isFollow={followStatus}/>
                    </View>
                )
            }
        }
    }


    return (
        <View style={style.userViewContainer}>
            <View style={style.pic}>
                <UserPicture source={props.picture}/>
            </View>
            <View style={style.userName}>
                <UserName userName={props.name}
                          pressable={props.pressable}
                          navigate={() => {
                              props.navigate()
                          }}/>
            </View>
            {renderOtherContent()}
        </View>
    )
}

const style = StyleSheet.create({
    userViewContainer: {
        flex: 1,
        flexDirection: "row",
    },
    userName: {
        flex: 1.5,
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
        flexDirection: "row",
    }
})

export default UserView