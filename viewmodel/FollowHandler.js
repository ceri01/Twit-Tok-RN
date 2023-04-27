import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import Followed from "../model/Followed";
import {Alert} from "react-native";
import {getUserPicture} from "./PictureHandler";

const followed = new Followed()

export async function initFollowed() {
    let sid = await UtilityStorageManager.getSid()
    let followedList = await CommunicationController.getFollowed(sid)
    for (const element of followedList) {
        getUserPicture(sid, element.uid, element.pversion, (pic, pversion) => {
            element.pversion = pversion;
            element.picture = pic;
            followed.add(element.uid, element)
        })
    }
}


export function addFollow(uid, name, pversion) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.follow(sid, uid).then(() => {
            getUserPicture(sid, uid, pversion, (picture, pversion) => {
                followed.add(uid, {uid: uid, name: name, pversion: pversion, picture: picture})
            })
        }).catch(() => {
            Alert.alert("Connection error.", "Is not possible to follow " + name + ", " + "check your connection")
        })
    })
}

export function removeFollow(uid) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.unfollow(sid, uid).then(() => {
            followed.remove(uid)
            console.log("unfollow " + uid)
        }).catch(() => {
            Alert.alert("Connection error.", "Is not possible to unfollow " + name + ", " + "check your connection")
        })
    })
}

export function getFollowed() {
    return followed.getImmutableData()
}

export function getFollowedLenght() {
    return followed.getLength()
}