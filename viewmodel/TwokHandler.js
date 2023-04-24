import {interpolateColor} from "react-native-reanimated";
import UtilityStorageManager from "../model/UtilityStorageManager";
import CommunicationController from "../model/CommunicationController";
import {Alert} from "react-native";
import {getUserPicture} from "./PictureHandler";

const COLORS = [
    'red',
    'purple',
    'blue',
    'cyan',
    'green',
    'yellow',
    'orange',
    'black',
    'white',
];

export function getColorHex(val, pw) {
    const inputRange = COLORS.map((_, index) => (index / COLORS.length) * pw);
    let rgba = interpolateColor(val, inputRange, COLORS)
    let rgbValues = rgba.split(",").slice(0, 3)
    for (let key in rgbValues) {
        rgbValues[key] = rgbValues[key].replace(/[^\d.-]/g, '')
    }
    let r = (rgbValues[0] | 1 << 8).toString(16).slice(1)
    let g = (rgbValues[1] | 1 << 8).toString(16).slice(1)
    let b = (rgbValues[2] | 1 << 8).toString(16).slice(1)
    return r+g+b
}

export async function sendTwok(text, bgcol, fontcol, fontsize, fonttype, Xalign, Yalign, lat, lon) { // to test
    let sid = await UtilityStorageManager.getSid();
    if (text === undefined || text.trim().length < 1) {
        return Alert.alert("Error", "Missing text")
    } else {
        if (lat !== null && lon !== null) {
            await CommunicationController.addTwok(sid, text, bgcol, fontcol, fontsize, fonttype, Xalign, Yalign, lat, lon)
        } else {
            await CommunicationController.addTwok(sid, text, bgcol, fontcol, fontsize, fonttype, Xalign, Yalign)
        }
    }
}

function between(val) {
    return val < 0 || val > 3
}

export function isValid(twok) {
    let regex = /([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/
    if (!(regex.test(twok.bgcol) && regex.test(twok.fontcol))) {
        // console.log("colore sbagliato")
        return false;
    }
    if ((twok.lat === null && twok.lon !== null) || (twok.lat !== null && twok.lon === null)) {
        // console.log("posizione sbagliata")
        return false;
    }
    for (const element of [twok.fontsize, twok.fonttype, twok.halign, twok.valign]) {
        if (between(element) && typeof element === "number") {
            // console.log("font o align sbagliati")
            return false;
        }
    }
    return true;
}

export async function getGeneralTwoks(tid) {
    const sid = await UtilityStorageManager.getSid();
    const tmpArr = []

    for (let i = 0; i < 8; i++) {
        let twok = await CommunicationController.getTwok(sid);
        if (isValid(twok)) {
            tmpArr.push(twok);
        } else {
            i--;
        }
    }

    return tmpArr;
}

export async function getUserTwoks(uid) {
    const sid = await UtilityStorageManager.getSid();
    const tmpArr = new Map()

    for (let i = 0; i < 8; i++) {
        let twok = await CommunicationController.getTwok(sid, uid);
        getUserPicture(sid, twok.uid, twok.pversion, (pic, pversion) => {
            twok.picture = pic
            twok.pversion = pversion
            tmpArr.set(twok.tid, twok)
        })
    }
    return tmpArr
}