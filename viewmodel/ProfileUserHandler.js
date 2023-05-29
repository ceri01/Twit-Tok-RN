import CommunicationController from "../model/CommunicationController"
import UtilityStorageManager from "../model/UtilityStorageManager"
import {Alert} from "react-native"
import DBManager from "../model/DBManager"

export async function setNewProfileName(name) {
    if (typeof (name) === "string" && name.length <= 99) {
        await DBManager.getInstance().updateProfileName(name, () => {
        }, (err) => {
            console.log(err)
        })
        const sid = await UtilityStorageManager.getSid()
        CommunicationController.setProfileName(sid, name).then(() => {
        }).catch((err) => {
            console.log(err)
        })
    } else {
        Alert.alert("Input error", "Bad format of name")
    }
}

export async function setNewProfilePic(pic) {
    if (pic !== undefined && typeof (pic) === "string" && pic.length < 137000) {
        await DBManager.getInstance().updateProfilePicture(pic, () => {
        }, (err) => {
            console.log(err)
        })
        const sid = await UtilityStorageManager.getSid()
        CommunicationController.setProfilePicture(sid, pic).then(() => {
        }).catch((err) => {
            console.log(err)
        })
    } else {
        Alert.alert("Input error", "Bad format of name")
    }
}

export function getProfile(onResult) {
    DBManager.getInstance().getProfileFromDB((result) => {
        onResult(result)
    }, (err) => {
        console.log(err)
    })
}

