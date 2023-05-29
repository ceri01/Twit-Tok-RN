import {Button, NativeModules, Text, View} from "react-native"
import {reloadApp} from "../../viewmodel/initApp"
import React from "react"

const OfflineView = () => {
    return (
        <View style={style.waiting}>
            <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrieve data
                of followed users, please check your connection and retry. Try to click button below or restart
                app</Text>
            <Button title="Reload" onPress={() => {
                reloadApp().then(() => {
                    NativeModules.DevSettings.reload()
                })
            }}/>
        </View>
    )
}

export default OfflineView