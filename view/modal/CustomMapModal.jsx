import {Modal, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import MapView, {MarkerAnimated} from "react-native-maps";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";
import {getCurrentPosition} from "../../viewmodel/position";

function CustomMapModal(props) {
    // This variable is necessary to rerender component and put marker on map. Is different from latitude and longitude in addTwock (not violating single source of truth)
    const [coords, setCoords] = useState({latitude: props.latitude, longitude: props.longitude});
    if (coords.latitude === null && coords.longitude === null) {
        getCurrentPosition().then((c) => {
            setCoords({latitude: c[0], longitude: c[1]})
        }).catch((err) => console.log(err))
    }

    if (props.isReset.current === true) {
        props.onReset()
    }

    const handleConfirmPositionChange = () => {
        props.onChangeLatitude(coords.latitude)
        props.onChangeLongitude(coords.longitude)
        props.onChangeVisibility(!props.visibility)
    }

    const handleCloseModal = () => {
        props.onChangeVisibility(!props.visibility)
    }

    function showMap() {
        if (coords.latitude !== null && coords.longitude !== null) {
            return (<View style={style.modalView}>
                <View style={style.mapContainer}>
                    <MapView style={style.map}
                             initialRegion={{
                                 latitude: coords.latitude,
                                 longitude: coords.longitude,
                                 latitudeDelta: 1,
                                 longitudeDelta: 1
                             }}>
                        <MarkerAnimated coordinate={{latitude: coords.latitude, longitude: coords.longitude}}/>
                    </MapView>
                </View>
                <View style={style.modalButtons}>
                    <CancelButton onCancel={handleCloseModal}/>
                    <ConfirmButton onConfirm={handleConfirmPositionChange}/>
                </View>
            </View>);
        } else {
            return (
                <View style={style.modalView}>
                    <View style={style.waitingContainer}>
                        <Text style={{fontSize: 25, fontStyle: "italic"}}>Waiting for position...</Text>
                    </View>
            </View>);
        }
    }

    return (
        <Modal animationType={"fade"}
               transparent={true}
               visible={props.visibility}
               onRequestClose={() => {
                   props.onChangeVisibility(!props.visibility)
               }}
        >
            <View style={style.modalBackgroud}>
                {showMap()}
            </View>
        </Modal>
    );
}

const style = StyleSheet.create({
    modalView: {
        flex: 0.8,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingTop: 25,
        paddingBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalBackgroud: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    modalButtons: {
        flex: 0.1,
        paddingTop: 20,
        justifyContent: "space-evenly",
        flexDirection: "row"
    },
    mapContainer: {
        flex: 0.9,
    },
    map: {
        width: 380,
        height: '100%',
    },
    waitingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: 350
    }
})

export default CustomMapModal;