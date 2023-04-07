import CommunicationController from "../model/CommunicationController"
import UtilityStorageManager from "../model/UtilityStorageManager"
import {Alert} from "react-native";
import DBManager from "../model/DBManager";

export function setNewProfileName(name) {
    if (typeof(name) === "string") {
        DBManager.getInstance().updateProfileName(name);
        UtilityStorageManager.getSid().then((sid) => {
            CommunicationController.setProfile(sid, name).then(() => {
                console.log("name modified")
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

