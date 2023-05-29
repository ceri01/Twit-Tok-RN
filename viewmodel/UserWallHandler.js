import TwokBuffer from "../model/TwokBuffer";
import {getUserTwoks} from "./TwokHandler";
import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

export default class UserWallHandler {
    static instance = null
    #userTwoks = null
    constructor() {
        this.#userTwoks = new TwokBuffer();
    }

    static getFollowedInstance() {
        if (this.instance === null) {
            UserWallHandler.instance = new UserWallHandler()
        }
        return this.instance
    }

    getUserData() {
        return this.#userTwoks.getImmutableData();
    }

    async initUserWall(uid) {
        await this.emptyUserBuffer();
        const elements = [...((await getUserTwoks(uid)).values())];
        const sid = await UtilityStorageManager.getSid();
        const isFollowed = (await CommunicationController.isFollowed(sid, uid)).followed // isInFollowed(elements[0].uid, #followed);
        elements.map((element) => {
            element.followed = isFollowed;
        });
        for (let element of elements) {
            this.#userTwoks.add(element);
        }
    }

    async updateUserBuffer(uid) {
        const newTwoks = [...((await getUserTwoks(uid)).values())]
        for (const newTwok of newTwoks) {
            if (this.#userTwoks.getImmutableData().findIndex(obj => obj.tid === newTwok.tid) === -1) {
                this.#userTwoks.add(newTwok);
            }
        }
    }

    async resetUserBuffer() {
        let newTwoks
        newTwoks = await getUserTwoks()
        this.#userTwoks.reset(newTwoks)
    }

    async emptyUserBuffer() {
        this.#userTwoks.empty()
    }
}

