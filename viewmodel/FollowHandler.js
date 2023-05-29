import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import Followed from "../model/Followed";
import {getUserPicture} from "./PictureHandler";

export default class FollowHandler {
    static instance = null
    #followed = null
    constructor() {
        this.#followed = new Followed()
    }

    static getFollowedInstance() {
        if (this.instance === null) {
            FollowHandler.instance = new FollowHandler()
        }
        return this.instance
    }

    async addFollow(uid, name, pversion, onError) {
        UtilityStorageManager.getSid().then(sid => {
            CommunicationController.follow(sid, uid).then(() => {
                getUserPicture(sid, uid, pversion, (picture, pversion) => {
                    this.#followed.add(uid, {uid: uid, name: name, pversion: pversion, picture: picture})
                })
            }).catch(() => {
                onError()
            })
        })
    }

    async removeFollow(uid, onError) {
        UtilityStorageManager.getSid().then(sid => {
            CommunicationController.unfollow(sid, uid).then(() => {
                this.#followed.remove(uid)
                console.log("fine")
            }).catch(() => {
                onError()
            })
        })
    }

    getFollowed() {
        return this.#followed.getImmutableData()
    }
}