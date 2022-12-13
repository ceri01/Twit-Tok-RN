import AsyncStorage from "@react-native-async-storage/async-storage";

class UtilityStorageManager {
    static async isFirstStart() {
        if(await AsyncStorage.getItem("@First_start") !== null) {
            return true;
        } else {
            await AsyncStorage.setItem("@First_start", "true");
            return false;
        }
    }

    static async getSid() {
        let sid = await AsyncStorage.getItem("@Sid");
        if(sid !== null) {
            return sid;
        } else {
            return undefined;
        }
    }

    static async setSid(sid) {
        if(typeof(sid) !== "string") throw new Error("sid must be a string");
        await AsyncStorage.setItem("@Sid", sid);
    }

    static async setProfileUid(uid) {
        if(typeof(uid) !== "string") throw new Error("uid must be a string");
        await AsyncStorage.setItem("@Uid", uid);
    }

    static async getProfileUid() {
        let uid = await AsyncStorage.getItem("@Uid");
        if(uid !== null) {
            console.log("dentro la utility strg " + uid)
            return uid;
        } else {
            return undefined;
        }
    }

    static async clear() {
        await AsyncStorage.clear();
    }
}
export default UtilityStorageManager;