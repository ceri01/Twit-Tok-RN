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
            CommunicationController.setProfile(sid, name).then(() => {
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
            CommunicationController.setProfile(sid, null, pic).then(() => {
                console.log("pic modified server")
            })
        })
    } else {
        Alert.alert("Input error", "Bad format of name");
    }
}

export async function getProfile() {
    let data = {name: null, picture: null};
    let uid = await UtilityStorageManager.getProfileUid()
    DBManager.getInstance().getProfileFromDB(uid);
    return data;
}

