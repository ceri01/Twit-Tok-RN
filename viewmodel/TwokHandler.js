import {interpolateColor} from "react-native-reanimated";
import UtilityStorageManager from "../model/UtilityStorageManager";
import ComunicationController from "../model/ComunicationController";
import {Alert} from "react-native";

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
        if (lat !== undefined && lon !== undefined) {
            await ComunicationController.addTwok(sid, text, bgcol, fontcol, fontsize, fonttype, Xalign, Yalign, lat, lon)
        } else {
            await ComunicationController.addTwok(sid, text, bgcol, fontcol, fontsize, fonttype, Xalign, Yalign)
        }
    }
}