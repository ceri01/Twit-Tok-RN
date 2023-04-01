import UtilityStorageManager from "../model/UtilityStorageManager";
import ComunicationController from "../model/ComunicationController";
import {Alert, Image} from "react-native";
import DefaultImage from "../assets/favicon.png";
import database from "../model/DBManager";

export async function initProfile(name, pic) {
    let sid = await UtilityStorageManager.getSid();
    database().updateProfileName(name, () => {
        if (pic !== null) {
            database().updateProfilePicture(pic, async () => {
                await ComunicationController.setProfile(sid, name, pic);
            }, () => {
                Alert.alert("Input Error", "Picture format not valid")
            });
        } else {
            let defaultPic = Image.resolveAssetSource(DefaultImage).uri
            database().updateProfilePicture(defaultPic, async () => {
                await ComunicationController.setProfile(sid, name, defaultPic);
            }, () => {
                Alert.alert("Input Error", "Picture format not valid")
            });
        }
    }, () => {
        Alert.alert("Input Error", "Name format not valid")
    });
}

export async function initEnvironment() {
    // TODO: fixare questa parte nel caso in cui manchi la connessioe
    let firstStart = await UtilityStorageManager.isFirstStart();
    if (firstStart) {
        await UtilityStorageManager.firstStart();
        let register = {sid: "Rxvl9SVDA3ADaoKIVV3X"} // await ComunicationController.register();
        await UtilityStorageManager.setSid(register.sid.toString());
        let profile = await ComunicationController.getProfile(register.sid.toString());
        await UtilityStorageManager.setProfileUid(profile.uid.toString());
        database();
        await UtilityStorageManager.DBInit();
    }
}