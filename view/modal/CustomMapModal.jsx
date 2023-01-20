import {Modal, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import MapView, {MarkerAnimated} from "react-native-maps";
import CancelButton from "../buttons/CancelButton";
import ConfirmButton from "../buttons/ConfirmButton";

function CustomMapModal(props) {
    // This variable is necessary to rerender component and put marker on map. Is different from latitude and longitude in addTwock (not violating single source of truth)
    const [markerPosition, setMarkerPosition] = useState({
        latitude: props.latitude.current,
        longitude: props.longitude.current
    });

    if (props.isReset.current === true) {
        props.onReset()
    }

    const handleConfirmPositionChange = () => {
        props.onChangeLatitude(markerPosition.latitude)
        props.onChangeLongitude(markerPosition.longitude)
        props.onChangeVisibility(!props.visibility)
    }

    const handleCloseModal = () => {
        props.onChangeVisibility(!props.visibility)
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
                <View style={style.modalView}>
                    <View style={style.mapContainer}>
                        <MapView style={style.map}
                                 initialRegion={{
                                     latitude: markerPosition.latitude,
                                     longitude: markerPosition.longitude,
                                     latitudeDelta: 1,
                                     longitudeDelta: 1
                                 }}

                                 onPress={(event) => {
                                     setMarkerPosition({
                                         latitude: event.nativeEvent.coordinate.latitude,
                                         longitude: event.nativeEvent.coordinate.longitude
                                     })
                                 }}>
                            <MarkerAnimated coordinate={{latitude: markerPosition.latitude, longitude: markerPosition.longitude}}/>
                        </MapView>
                    </View>
                    <View style={style.modalButtons}>
                        <CancelButton onCancel={handleCloseModal}/>
                        <ConfirmButton onConfirm={handleConfirmPositionChange}/>
                    </View>
                </View>
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
})

export default CustomMapModal;