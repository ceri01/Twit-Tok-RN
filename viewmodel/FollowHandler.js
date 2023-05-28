import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import Followed from "../model/Followed";
import {DeviceEventEmitter} from "react-native";
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
        console.log(this.instance)
        return this.instance
    }

    async addFollow(uid, name, pversion, onError) {
        UtilityStorageManager.getSid().then(sid => {
            CommunicationController.follow(sid, uid).then(() => {
                getUserPicture(sid, uid, pversion, (picture, pversion) => {
                    this.#followed.add(uid, {uid: uid, name: name, pversion: pversion, picture: picture})
                    DeviceEventEmitter.emit("#followed.updated");
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
                DeviceEventEmitter.emit("#followed.updated");
            }).catch(() => {
                onError()
            })
        })
    }

    getFollowed() {
        if (this.#followed.ready) {
            return this.#followed.getImmutableData()
        }
    }
}