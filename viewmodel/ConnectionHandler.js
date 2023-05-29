import CommunicationController from "../model/CommunicationController"

export function checkConnection(callback) {
    CommunicationController.checkConnectionStatus(callback)
}