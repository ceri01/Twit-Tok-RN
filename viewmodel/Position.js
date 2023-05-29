import * as Location from 'expo-location'

export async function getCurrentPosition() {
    let havePermission = false
    const grantedPermission = await Location.getForegroundPermissionsAsync()
    if (grantedPermission.status === "granted") {
        havePermission = true
    } else {
        const permissionResponse = await Location.requestForegroundPermissionsAsync()
        if (permissionResponse.status === "granted") {
            havePermission = true
        }
    }
    if (havePermission) {
        let location = await Location.getLastKnownPositionAsync()
        if (location === null) {
            location = await Location.getCurrentPositionAsync()
        }
        return [location.coords.latitude, location.coords.longitude]
    }
    return null
}