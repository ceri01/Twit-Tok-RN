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
}

export async function initEnvironment() {
    // TODO: fixare questa parte nel caso in cui manchi la connessioe
    await UtilityStorageManager.firstStart();
    let register = {sid: "Rxvl9SVDA3ADaoKIVV3X"} // await CommunicationController.register();
    await UtilityStorageManager.setSid(register.sid.toString());
    let profile = await CommunicationController.getProfile(register.sid.toString());
    await UtilityStorageManager.setProfileUid(profile.uid.toString());
}