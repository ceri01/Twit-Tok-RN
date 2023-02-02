import {} from "../model/ComunicationController"
import UtilityStorageManager from "../model/UtilityStorageManager"
export function setNewProfileName() {
    UtilityStorageManager.getSid().then((ris) => {
        console.log(ris)
    })
}

export function getProfileName() {
    UtilityStorageManager.getProfileUid().then((name) => {
        console.log(name)
    })
}
