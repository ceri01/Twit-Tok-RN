import UtilityStorageManager from "../model/UtilityStorageManager";
import DBManager from "../model/DBManager";
import {Alert} from "react-native";
import ComunicationController from "../model/ComunicationController";

export async function initProfile(name, pic) {
    if (name !== null && pic !== null) {
        let sid = await UtilityStorageManager.getSid();
        await ComunicationController.setProfile(sid, name, pic);
        DBManager.database.updateProfilePicture(pic);
        DBManager.database.updateProfileName(name);
    } else {
        Alert.alert("Input error", "Missing name or picture");
    }
}

export async function initEnvironment() {
    let firstStart = await UtilityStorageManager.isFirstStart()
    if (firstStart) {
        await UtilityStorageManager.firstStart();
        let register = "Rxvl9SVDA3ADaoKIVV3X" // await ComunicationController.register();
        await UtilityStorageManager.setSid(register.sid.toString());
        let profile = await ComunicationController.getProfile(register.sid.toString());
        await UtilityStorageManager.setProfileUid(profile.uid.toString());
        DBManager.database = new DBManager(await UtilityStorageManager.getProfileUid());
        return "Register";
    } else {
        DBManager.database = new DBManager(await UtilityStorageManager.getProfileUid());
        return "Main";
    }
}

export async function resetEnv() {
    let sid = await UtilityStorageManager.getSid()
    console.log(sid)
}