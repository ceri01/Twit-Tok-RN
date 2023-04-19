import CommunicationController from "../model/CommunicationController"
import UtilityStorageManager from "../model/UtilityStorageManager"
import {Alert} from "react-native";
import DBManager from "../model/DBManager";

export async function setNewProfileName(name) {
    if (typeof (name) === "string" && name.length <= 99) {
        await DBManager.getInstance().updateProfileName(name, () => {
            console.log("name modified database")
        }, (err) => {
            console.log("errore " + err)
        });
        await UtilityStorageManager.getSid().then((sid) => {
            CommunicationController.setProfileName(sid, name).then(() => {
                console.log("name modified server")
            })
        })
    } else {
        Alert.alert("Input error", "Bad format of name");
    }
}

export async function setNewProfilePic(pic) {
    if (pic !== undefined && typeof(pic) === "string" && pic.length < 137000) {
        await DBManager.getInstance().updateProfilePicture(pic, () => {
            console.log("pic modified database")
        }, (err) => {
            console.log("errore " + err)
        });
        await UtilityStorageManager.getSid().then((sid) => {
            CommunicationController.setProfilePicture(sid, pic).then(() => {
                console.log("pic modified server")
            })
        })
    } else {
        Alert.alert("Input error", "Bad format of name");
    }
}

export function getProfile(onResult) {
    DBManager.getInstance().getProfileFromDB((result) => {
        onResult(result)
    }, (error) => {
        console.log("errore => " + error);
    })
}

