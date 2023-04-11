import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

export function addFollow(uid) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.follow(sid, uid).then(() => {
            console.log("follow " + uid)
        })
    })
}

export function removeFollow(uid) {
    UtilityStorageManager.getSid().then(sid => {
        CommunicationController.unfollow(sid, uid).then(() => {
            console.log("unfollow " + uid)
        })
    })
}

export default async function getFollowed() {
    let sid = await UtilityStorageManager.getSid()
    return await CommunicationController.getFollowed(sid)
}