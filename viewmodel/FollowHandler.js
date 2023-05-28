import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import Followed from "../model/Followed";
import {DeviceEventEmitter} from "react-native";
import {getUserPicture} from "./PictureHandler";

let followed = new Followed()
export async function addFollow(uid, name, pversion, onError) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.follow(sid, uid).then(() => {
            getUserPicture(sid, uid, pversion, (picture, pversion) => {
                followed.add(uid, {uid: uid, name: name, pversion: pversion, picture: picture})
                DeviceEventEmitter.emit("followed.updated");
            })
        }).catch(() => {
            setOffline()
            onError()
        })
    })
}

export async function removeFollow(uid, onError) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.unfollow(sid, uid).then(() => {
            followed.remove(uid)
            DeviceEventEmitter.emit("followed.updated");
        }).catch(() => {
            setOffline()
            onError()
        })
    })
}

export function getFollowed() {
    if (followed.ready) {
        return followed.getImmutableData()
    }
}

export function isOnline() {
    return followed.ready
}

export function setOffline() {
    followed.ready = false
}