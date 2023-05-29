import API from "../config/config.js"
import NetInfo from '@react-native-community/netinfo';

export default class CommunicationController {
    static async _call(endpoint, parameters) {
        let response = await fetch(API.BASE_URL + endpoint, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters)
        });
        const status = response.status;
        if (status === 200) {
            return await response.json();
        }
    }

    static checkConnectionStatus(callback) {
        return NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                console.log(state.isConnected)
                callback(state.isConnected)
            }
        })
    }

    static register = async () => {
        const endpoint = API.REGISTER;
        const parameters = {};
        return await this._call(endpoint, parameters);
    }

    static getProfile = async (sid) => {
        const endpoint = API.GETPROFILE;
        const parameters = {sid: sid};
        return await this._call(endpoint, parameters);
    }

    static setProfile = async (sid, name, picture) => {
        const endpoint = API.SETPROFILE;
        if(name.length > 20) throw new Error("name must be a maximum of 20 characters long");
        if(picture.length > 137000) throw new Error("pic must be a maximum of 100KB");
        const parameters = {
            sid: sid,
            name: name,
            picture: picture
        };
        return await this._call(endpoint, parameters);
    }

    static setProfilePicture = async (sid, picture) => {
        const endpoint = API.SETPROFILE;
        if(picture.length > 137000) throw new Error("pic must be a maximum of 100KB");
        const parameters = {
            sid: sid,
            picture: picture
        };
        return await this._call(endpoint, parameters);
    }

    static setProfileName = async (sid, name) => {
        const endpoint = API.SETPROFILE;
        if(name.length > 20) throw new Error("name must be a maximum of 20 characters long")
        const parameters = {
            sid: sid,
            name: name,
        };
        return await this._call(endpoint, parameters);
    }

    static getTwok  = async (sid, uid, tid) => {
        const endpoint = API.GETTWOK;
        const parameters = {
            sid: sid,
            uid: uid,
            tid: tid
        };
        return await this._call(endpoint, parameters);
    }

    static addTwok = async (sid, text, bgColor, fontColor, fontSize, fontType, halign, valign, lat, lon) => {
        const endpoint = API.ADDTWOK;
        if((lat === undefined) !== (lon === undefined)) {
            return new Error("Error: lat and lon must be set both or neither")
        }
        const parameters = {
            sid: sid,
            text: text,
            bgcol: bgColor, // stringa senza '#' davanti
            fontcol: fontColor, // stringa senza '#' davanti
            fontsize: fontSize,
            fonttype: fontType,
            halign: halign,
            valign: valign,
            lat: lat,
            lon: lon
        };
        return await this._call(endpoint, parameters);
    }

    static getPicture = async (sid, uid) => {
        const endpoint = API.GETPICTURE;
        const parameters = {
            sid: sid,
            uid: uid
        };
        return await this._call(endpoint, parameters);
    }

    static follow = async (sid, uid) => {
        const endpoint = API.FOLLOW;
        const parameters = {
            sid: sid,
            uid: uid
        };
        return await this._call(endpoint, parameters);
    }

    static unfollow = async (sid, uid) => {
        const endpoint = API.UNFOLLOW;
        const parameters = {
            sid: sid,
            uid: uid
        };
        return await this._call(endpoint, parameters);
    }

    static getFollowed = async (sid) => {
        const endpoint = API.GETFOLLOWED;
        const parameters = {sid:sid};
        return await this._call(endpoint, parameters);
    }

    static isFollowed = async (sid, uid) => {
        const endpoint = API.ISFOLLOWED;
        const parameters = {
            sid:sid,
            uid:uid
        };
        return await this._call(endpoint, parameters);
    }
}