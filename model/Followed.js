import UtilityStorageManager from "./UtilityStorageManager"
import CommunicationController from "./CommunicationController"
import {getUserPicture} from "../viewmodel/PictureHandler"
import {Alert} from "react-native"

class Followed {
    #followed = new Map()

    constructor() {
        UtilityStorageManager.getSid().then((sid) => {
            CommunicationController.getFollowed(sid).then((followedList) => {
                followedList.map((element) => {
                    getUserPicture(sid, element.uid, element.pversion, (pic, pversion) => {
                        element.pversion = pversion
                        element.picture = pic
                        this.add(element.uid, element)
                    })
                })
            }).catch(() => {
                Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection")
            })
        })
    }

    getImmutableData() {
        // ... is usefull to create a copy of this.#buffer to prevent direct changest to the data structure
        return [...this.#followed.values()]
    }

    getLength() {
        return this.#followed.size
    }

    add(uid, element) {
        if (element.hasOwnProperty("name") && element.hasOwnProperty("pversion") && element.hasOwnProperty("uid")) {
            this.#followed.set(uid, element)
        }
    }

    remove(uid) {
        this.#followed.delete(uid)
    }
}

export default Followed