import * as Location from 'expo-location';

export async function getCurrentPosition() {
    let havePermission = false;
    const grantedPermission = await Location.getForegroundPermissionsAsync();
    if (grantedPermission.status === "granted") {
        havePermission = true;
    } else {
        const permissionResponse = await Location.requestForegroundPermissionsAsync();
        if (permissionResponse.status === "granted") {
            havePermission = true;
        }
    }
    if (havePermission) {
        const location = await Location.getLastKnownPositionAsync();
        console.log("recived position: " + location)
        return [location.coords.latitude, location.coords.longitude]
    }
    console.log(havePermission)
    return null
}