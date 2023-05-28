import TwokBuffer from "../model/TwokBuffer";
import {getUserTwoks} from "./TwokHandler";
import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

const userTwoks = new TwokBuffer();

export function getUserData() {
    return userTwoks.getImmutableData();
}

export async function initUserWall(uid) {
    await emptyUserBuffer();
    const elements = [...((await getUserTwoks(uid)).values())];
    const sid = await UtilityStorageManager.getSid();
    const isFollowed = (await CommunicationController.isFollowed(sid, uid)).followed// isInFollowed(elements[0].uid, followed);
    elements.map((element) => {
        element.followed = isFollowed;
    });
    for (let element of elements) {
        userTwoks.add(element);
    }
}

export async function updateUserBuffer(uid) {
    const newTwoks = [...((await getUserTwoks(uid)).values())]
    for (const newTwok of newTwoks) {
        if (userTwoks.getImmutableData().findIndex(obj => obj.tid === newTwok.tid) === -1) {
            userTwoks.add(newTwok);
        }
    }
}

export async function emptyUserBuffer() {
    userTwoks.empty()
}