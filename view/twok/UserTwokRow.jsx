import {Platform, StyleSheet, Text, View} from "react-native"
import UserView from "../user/UserView"
import React, {useState} from "react"
import CustomMapModal from "../modal/CustomMapModal"

const USERVIEWHEIGHT = 60
const ALIGNAMENTS = ["flex-start", "center", "flex-end"]

function UserTwokRow(props) {
    const [mapModalVisible, setMapModalVisible] = useState(false) // flag to display text modal
    const [tmpReload, setTmpReload] = useState(0)
    let FONTTYPE = null

    if (Platform.OS === 'ios') {
        FONTTYPE = ["System", "Menlo", "Palatino"]
    } else {
        FONTTYPE = ["System", "monospace", "serif"]
    }

    const showMap = () => {
        if (mapModalVisible) {
            return <CustomMapModal visibility={mapModalVisible}
                                   width={props.dimensions.WindowHeight}
                                   onChangeVisibility={setMapModalVisible}
                                   latitude={props.data.lat}
                                   longitude={props.data.lon}
                                   onChangeLatitude={() => {
                                   }}
                                   onChangeLongitude={() => {
                                   }}
                                   isReset={false}
                                   isInWall={true}
                                   onReset={() => {
                                   }}>
            </CustomMapModal>
        }
    }

    function twokStyle() {
        return {
            alignItems: ALIGNAMENTS[props.data.halign],
            justifyContent: ALIGNAMENTS[props.data.valign],
            height: props.dimensions.WindowHeight - props.dimensions.TabHeight - USERVIEWHEIGHT - props.dimensions.StatusBarHeight,
            width: "100%",
            backgroundColor: "#" + props.data.bgcol,
        }
    }

    function twokTextStyle() {
        return {
            color: "#" + props.data.fontcol,
            fontSize: (props.data.fontsize + 1) * 20,
            fontFamily: FONTTYPE[props.data.fonttype],
        }
    }

    return (
        <View>
            <View style={style.user}>
                <UserView dimensions={props.dimensions.WindowHeight / 50}
                          name={props.data.name}
                          navigate={props.navigate}
                          pressable={false}
                          picture={props.data.picture}
                          pversion={props.data.pversion}
                          uid={props.data.uid}
                          followed={props.data.followed}
                          edit={() => {
                              setTmpReload(tmpReload + 1)
                          }}
                          isInGenericTwokRow={false}/>
            </View>
            {showMap()}
            <View style={twokStyle()}>
                <Text style={twokTextStyle()}>{props.data.text}</Text>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    user: {
        height: USERVIEWHEIGHT,
        borderBottomWidth: 1,
        borderRadius: 30
    },
    text: {
        fontSize: 40,
        fontWeight: "700",
    }
})

export default UserTwokRow