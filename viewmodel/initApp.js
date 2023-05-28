import UtilityStorageManager from "../model/UtilityStorageManager";
import CommunicationController from "../model/CommunicationController";
import {Alert, Image} from "react-native";
import DefaultImage from "../assets/favicon.png";
import DBManager from "../model/DBManager";

export async function initProfile(name, pic) {
    let sid = await UtilityStorageManager.getSid();
    DBManager.getInstance().updateProfileName(name, () => {
        if (pic !== null) {
            DBManager.getInstance().updateProfilePicture(pic, async () => {
                await CommunicationController.setProfile(sid, name, pic);
            }, () => {
                Alert.alert("Input Error", "Picture format not valid")
            });
        } else {
            let defaultPic = Image.resolveAssetSource(DefaultImage).uri
            DBManager.getInstance().updateProfilePicture(defaultPic, async () => {
                await CommunicationController.setProfile(sid, name, defaultPic);
            }, () => {
                Alert.alert("Input Error", "Picture format not valid")
            });
        }
    }, () => {
        Alert.alert("Input Error", "Name format not valid")
    });
    await UtilityStorageManager.firstStart()
}

export async function initEnvironment() {
    let register = await CommunicationController.register()
    if (register !== undefined) {
        let profileData = await CommunicationController.getProfile(register.sid);
        await UtilityStorageManager.setSid(register.sid)
        await UtilityStorageManager.setProfileUid(profileData.uid.toString());
        DBManager.getInstance()
    }
}

export async function reloadApp() {
    let sid = await UtilityStorageManager.getSid()
    if (sid === "" || sid === undefined) {
        await UtilityStorageManager.clear()
    }
}