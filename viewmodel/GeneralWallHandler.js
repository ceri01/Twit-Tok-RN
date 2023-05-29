import TwokBuffer from "../model/TwokBuffer";
import {getGeneralTwoks} from "./TwokHandler";
import CommunicationController from "../model/CommunicationController";
import UtilityStorageManager from "../model/UtilityStorageManager";

export default class GeneralWallHandler {
    static instance = null
    #generalTwoks = null

    constructor() {
        this.#generalTwoks = new TwokBuffer();
    }

    static getGeneralWallInstance() {
        if (this.instance === null) {
            GeneralWallHandler.instance = new GeneralWallHandler()
        }
        return this.instance
    }

    getGeneralData() {
        return this.#generalTwoks.getImmutableData();
    }

    async initGeneralWall(tidSequence) {
        let sid = await UtilityStorageManager.getSid();
        await this.emptyGeneralBuffer()
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
            this.#generalTwoks.add(element);
        }
    }

    async updateGeneralBuffer(tidSequence) {
        let elements
        if (this.#generalTwoks.getLength() > 32) {
            return true;
        }

        if (tidSequence !== -1) {
            elements = await getGeneralTwoks(tidSequence)
        } else {
            elements = await getGeneralTwoks()
        }

        for (let element of elements) {
            this.#generalTwoks.add(element);
        }
        return false
    }

    async resetGeneralBuffer(tidSequence) {
        let newTwoks
        if (tidSequence !== -1) {
            newTwoks = await getGeneralTwoks(tidSequence)
        } else {
            newTwoks = await getGeneralTwoks()
        }
        this.#generalTwoks.reset(newTwoks);
    }

    async emptyGeneralBuffer() {
        this.#generalTwoks.empty()
    }
}