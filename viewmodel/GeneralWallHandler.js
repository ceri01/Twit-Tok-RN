import TwokBuffer from "../model/TwokBuffer";
import {getGeneralTwoks} from "./TwokHandler";
import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";
import {Alert} from "react-native";

const generalTwoks = new TwokBuffer();

export function getGeneralData() {
    return generalTwoks.getImmutableData();
}

export async function initGeneralWall(tidSequence) {
    let sid = await UtilityStorageManager.getSid();
    await emptyGeneralBuffer()
    let elements
    if (tidSequence !== -1) {
        elements = await getGeneralTwoks(tidSequence);
    } else {
        elements = await getGeneralTwoks();
    }

    elements.map(async (element) => {
        element.followed = (await CommunicationController.isFollowed(sid, element.uid)).followed;
    });
    for (let element of elements) {
        generalTwoks.add(element);
    }
}

export async function updateGeneralBuffer(tidSequence) {
    let elements
    if (generalTwoks.getLength() > 32) {
        return true;
    }

    if (tidSequence !== -1) {
        elements = await getGeneralTwoks(tidSequence)
    } else {
        elements = await getGeneralTwoks()
    }

    for (let element of elements) {
        generalTwoks.add(element);
    }
    return false
}

export async function resetGeneralBuffer(tidSequence) {
    let newTwoks
    if (tidSequence !== -1) {
        newTwoks = await getGeneralTwoks(tidSequence)
    } else {
        newTwoks = await getGeneralTwoks()
    }
    generalTwoks.reset(newTwoks);
}

export async function emptyGeneralBuffer() {
    generalTwoks.empty()
}