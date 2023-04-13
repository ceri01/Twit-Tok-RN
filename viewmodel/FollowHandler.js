import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import Followed from "../model/Followed";

const followed = new Followed()

export async function initFollowed() {
    let sid = await UtilityStorageManager.getSid()
    let followedList = await CommunicationController.getFollowed(sid)
    for (const element of followedList) {
        followed.add(element.uid, element)
    }
}


export function addFollow(uid, name, pversion) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.follow(sid, uid).then(() => {
            followed.add(uid, {uid: uid, name: name, pversion: pversion})
            console.log("follow " + uid)
        })
    })
}

export function removeFollow(uid) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.unfollow(sid, uid).then(() => {
            followed.remove(uid)
            console.log("unfollow " + uid)
        })
    })
}

export function getFollowed() {
    return followed.getImmutableData()
}

export function getFollowedLenght() {
    return followed.getLength()
}