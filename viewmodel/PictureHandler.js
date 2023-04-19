import * as ImagePicker from 'expo-image-picker';
import {Image} from "react-native";
import DefaultImage from "../assets/favicon.png";
import CommunicationController from "../model/CommunicationController";
import DBManager from "../model/DBManager";

export const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        base64: true
    });
    return result.assets[0].base64
};

export function createPictureSource(rawData) {
    if (pictureIsValid(rawData)) return 'data:image/png;base64,' + rawData
    return Image.resolveAssetSource(DefaultImage).uri
}

export function pictureIsValid(rawData) {
    return rawData !== undefined && typeof (rawData) === "string" && rawData.length < 137000 && rawData.length > 0;
}

/*export function getImage(setImage) {
    openImagePicker().then((result) => {
        if (!result.canceled) {
            if (result.length > 137000) {
                Alert.alert("Size error", "Image size must be less than 100KB, default icon setted.");
            }
            setImage(createPictureSource(result));
        }
    }).catch((err) => {
        Alert.alert("Error", "Image not selected, default icon setted.");
        setImage(Image.resolveAssetSource(DefaultImage).uri);
    })
}*/

export function getUserPicture(sid, uid, pversion, onResult) {
    DBManager.getInstance().getUserPicture(uid, (DBResult) => {
        if (DBResult !== null) {
            if (DBResult.pversion === pversion) {
                onResult(DBResult.picture, DBResult.pversion)
            } else {
                CommunicationController.getPicture(sid, uid).then((serverResult) => {
                    if (serverResult.picture === null) {
                        DBManager.getInstance().updateUserPicture(uid, "", serverResult.pversion);
                        onResult("", pversion)
                    } else {
                        DBManager.getInstance().updateUserPicture(uid, serverResult.picture, serverResult.pversion);
                        onResult(serverResult.picture, serverResult.pversion);
                    }
                });
            }
        } else {
            CommunicationController.getPicture(sid, uid).then((serverResult) => {
                if (serverResult.picture === null) {
                    DBManager.getInstance().addUserPicture(serverResult.uid, "", serverResult.pversion);
                    onResult("", pversion)
                } else {
                    DBManager.getInstance().addUserPicture(serverResult.uid, serverResult.picture, serverResult.pversion);
                    onResult(serverResult.picture, serverResult.pversion)
                }
            });
        }
    });
}

