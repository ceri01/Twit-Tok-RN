import API from "../config/config.js"
export default class ComunicationController {
    static async _call(endpoint, parameters) {
        console.log("ComunicationController -> _Call: " + parameters);
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
            console.log("HTTP reaquest successful")
            return await response.json();
        } else {
            return new Error("HTTP request failed, HTTP status: " + status);
        }
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
        if(name.length > 20) throw new Error("name must be a amximum of 20 characters long")
        const parameters = {
            sid: sid,
            name: name,
            picture: picture
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
        // controlla se funziona, lat e lon devono essere entrambi settati o no
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
}