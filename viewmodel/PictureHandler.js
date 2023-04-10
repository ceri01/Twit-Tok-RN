import * as ImagePicker from 'expo-image-picker';
import {Alert, Image} from "react-native";
import DefaultImage from "../assets/favicon.png";
import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import DBManager from "../model/DBManager";

export const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        base64: true
    });
    return 'data:image/png;base64,' + result.assets[0].base64
};

export function createPictureSource(rawData) {
    if (rawData !== undefined && typeof(rawData) === "string" && rawData.length < 137000) {
        return rawData;
    }
    return Image.resolveAssetSource(DefaultImage).uri
}

/*export function getImage(setImage) {
    openImagePicker().then((result) => {
        if (!result.canceled) {
            if (result.length > 137000) {
                Alert.alert("Size error", "Image size must be less then 100KB, default icon setted.");
            }
            setImage(createPictureSource(result));
        }
    }).catch((err) => {
        Alert.alert("Error", "Image not selected, default icon setted.");
        setImage(Image.resolveAssetSource(DefaultImage).uri);
    })
}*/

export function getUserPicture(uid, pversion) { // to be refactored
    let pic = null
    DBManager.getInstance().getUserPicture(uid, (result) => {
        if (result.length > 0) {
            if(result[0].pversion === pversion) {
                pic = result
            } else if (result.pversion !== pversion) {
                UtilityStorageManager.getSid().then((sid) => {
                    CommunicationController.getPicture(sid, uid).then((res) => {
                        DBManager.getInstance().updateUserPicture(uid, res.picture, res.pversion);
                        pic = res.picture;
                    });
                })
            }
        } else {
            UtilityStorageManager.getSid().then((sid) => {
                CommunicationController.getPicture(sid, uid).then((res) => {
                    if (res.picture === null) {
                        DBManager.getInstance().addUserPicture(res.uid, Image.resolveAssetSource(DefaultImage).uri, 0);
                        pic = Image.resolveAssetSource(DefaultImage).uri;
                    } else {
                        DBManager.getInstance().addUserPicture(res.uid, res.picture, res.pversion);
                        pic = res.picture;
                    }
                });
            })
        }
    })
    return createPictureSource(pic)
}

