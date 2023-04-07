import CommunicationController from "../model/CommunicationController"
import UtilityStorageManager from "../model/UtilityStorageManager"
import {Alert} from "react-native";
import database from "../model/DBManager";

export function setNewProfileName(name) {
    if (typeof(name) === "string") {
        database().updateProfileName(name);
        UtilityStorageManager.getSid().then((sid) => {
            CommunicationController.setProfile(sid, name).then(() => {
                console.log("name modified")
            })
        })
    } else {
        Alert.alert("Input error", "Bad format of name");
    }
}

/*
* (res) => {
            console.log("siuuummmmm " +  res)
            data.name = res.name;
            data.picture = res.picture;
        }*/

export async function getProfile() {
    let data = {name: null, picture: null};
    let uid = await UtilityStorageManager.getProfileUid()
    database().getProfileFromDB(uid);
    return data;
}

