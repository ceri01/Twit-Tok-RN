import * as ImagePicker from 'expo-image-picker'
import {Image} from "react-native"
import DefaultImage from "../assets/favicon.png"
import CommunicationController from "../model/CommunicationController"
import DBManager from "../model/DBManager"

export const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        base64: true
    })
    return result.assets[0].base64
}

export function createPictureSource(rawData) {
    if (rawData === Image.resolveAssetSource(DefaultImage).uri || !pictureIsValid(rawData) || rawData === undefined) {
        return rawData
    } else {
        return 'data:image/png;base64,' + rawData
    }
}

export function pictureIsValid(rawData) {
    return rawData !== undefined && typeof (rawData) === "string" && rawData.length < 137000 && rawData.length > 0
}

export function getUserPicture(sid, uid, pversion, onResult) {
    DBManager.getInstance().getUserPicture(uid, (DBResult) => {
        if (DBResult !== null) {
            if (DBResult.pversion === pversion) {
                onResult(DBResult.picture, DBResult.pversion)
            } else {
                CommunicationController.getPicture(sid, uid).then((serverResult) => {
                    if (serverResult.picture === null) {
                        DBManager.getInstance().updateUserPicture(uid, Image.resolveAssetSource(DefaultImage).uri, serverResult.pversion)
                        onResult(Image.resolveAssetSource(DefaultImage).uri, pversion)
                    } else {
                        DBManager.getInstance().updateUserPicture(uid, serverResult.picture, serverResult.pversion)
                        onResult(serverResult.picture, serverResult.pversion)
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        } else {
            CommunicationController.getPicture(sid, uid).then((serverResult) => {
                if (serverResult.picture === null) {
                    DBManager.getInstance().addUserPicture(serverResult.uid, Image.resolveAssetSource(DefaultImage).uri, serverResult.pversion)
                    onResult(Image.resolveAssetSource(DefaultImage).uri, pversion)
                } else {
                    DBManager.getInstance().addUserPicture(serverResult.uid, serverResult.picture, serverResult.pversion)
                    onResult(serverResult.picture, serverResult.pversion)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    })
}

