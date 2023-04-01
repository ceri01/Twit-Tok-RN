import ComunicationController from "../model/ComunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

export function addFollow(uid) {
    UtilityStorageManager.getSid().then(sid => {
        ComunicationController.follow(sid, uid).then(() => {
            console.log("follow")
        })
    })
}

export function removeFollow(uid) {
    UtilityStorageManager.getSid().then(sid => {
        ComunicationController.unfollow(sid, uid).then(() => {
            console.log("unfollow")
        })
    })
}