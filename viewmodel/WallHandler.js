import TwokBuffer from "../model/TwokBuffer";
import {getTwoks} from "./TwokHandler";
import ComunicationController from "../model/ComunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

const twoks = new TwokBuffer();

function isInFollowed(uid, followed) {
    for (const elementOfData of followed) {
        if (elementOfData.uid === uid) {
            return true
        }
    }
    return false
}

export function getData() {
    return twoks.getImmutableData();
}

export async function initWall() {
    const elements = await getTwoks();
    let sid = await UtilityStorageManager.getSid();
    let followed = await ComunicationController.getFollowed(sid)
    elements.map((element) => {
        element.followed = isInFollowed(element.uid, followed);
    });
    for (let element of elements) {
        twoks.add(element);
    }
}

export async function updateBuffer() {
    if (twoks.getLength() > 32) {
        return true;
    }
    const elements = await getTwoks()
    for (let element of elements) {
        twoks.add(element);
    }
    return false
}

export async function resetBuffer() {
    let newTwoks = await getTwoks()
    twoks.reset(newTwoks);
}