import TwokBuffer from "../model/TwokBuffer";
import {getGeneralTwoks} from "./TwokHandler";
import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

const generalTwoks = new TwokBuffer();

function isInFollowed(uid, followed) {
    for (const elementOfData of followed) {
        if (elementOfData.uid === uid) {
            return true
        }
    }
    return false
}

export function getGeneralData() {
    return generalTwoks.getImmutableData();
}

export async function initGeneralWall() {
    const elements = await getGeneralTwoks();
    let sid = await UtilityStorageManager.getSid();
    let followed = await CommunicationController.getFollowed(sid)
    await emptyGeneralBuffer()
    elements.map((element) => {
        element.followed = isInFollowed(element.uid, followed);
    });
    for (let element of elements) {
        generalTwoks.add(element);
    }
}

export async function updateGeneralBuffer() {
    if (generalTwoks.getLength() > 32) {
        return true;
    }
    const elements = await getGeneralTwoks()
    for (let element of elements) {
        generalTwoks.add(element);
    }
    return false
}

export async function resetGeneralBuffer() {
    let newTwoks = await getGeneralTwoks()
    generalTwoks.reset(newTwoks);
}

export async function emptyGeneralBuffer() {
    generalTwoks.empty()
}