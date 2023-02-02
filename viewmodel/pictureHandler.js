import * as ImagePicker from 'expo-image-picker';
import {Image} from "react-native";
import DefaultImage from "../assets/favicon.png";

export const openImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        base64: true
    });
    return result.assets[0].base64
};

export function getPictureSource(rawData) {
    if (rawData !== undefined && typeof(rawData) === "string" && rawData.length < 137000) {
        rawData.match(/^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/);
        return "data:image/png;base64," + rawData;
    }
    return Image.resolveAssetSource(DefaultImage).uri
}

