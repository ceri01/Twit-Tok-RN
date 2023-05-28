import UtilityStorageManager from "./UtilityStorageManager";
import CommunicationController from "./CommunicationController";
import {getUserPicture} from "../viewmodel/PictureHandler";
import {Alert} from "react-native";

class Followed {
    #followed = new Map()
    ready = false
    constructor() {
        UtilityStorageManager.getSid().then((sid) => {
            CommunicationController.getFollowed(sid).then((followedList) => {
                followedList.map((element) => {
                    getUserPicture(sid, element.uid, element.pversion, (pic, pversion) => {
                        element.pversion = pversion;
                        element.picture = pic;
                        this.add(element.uid, element)
                    })
                })
                this.ready = true
            }).catch(() => {

                Alert.alert("Connection Error", "Is not possible to retrieve data from server, check your internet connection");
            })
        })
    }

    getImmutableData() {
        if (this.ready) {
            // ... is usefull to create a copy of this.#buffer to prevent direct changest to the data structure
            return [...this.#followed.values()];
        }
    }

    getLength() {
        return this.#followed.size;
    }

    add(uid, element) {
        if (this.ready && element.hasOwnProperty("name") && element.hasOwnProperty("pversion") && element.hasOwnProperty("uid")) {
            this.#followed.set(uid, element);
        }
    }

    remove(uid) {
        if (this.ready) {
            this.#followed.delete(uid)
        }
    }
}

export default Followed