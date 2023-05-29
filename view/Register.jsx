import {Alert, Button, Image, NativeModules, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import RegisterButton from "./buttons/RegisterButton"
import React, {useEffect, useState} from "react";
import {openImagePicker, createPictureSource} from "../viewmodel/PictureHandler";
import DefaultImage from "../assets/favicon.png";
import ChooseImageButton from "./buttons/ChooseImageButton";
import {initApplication, initProfile, reloadApp} from "../viewmodel/initApp";
import {checkConnection} from "../viewmodel/ConnectionHandler";

function Register({ navigation }) {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");
    const [online, setOnline] = useState(true);

    useEffect(() => {
        checkConnection(setOnline)
    });

    function confirmRegistration() {
        console.log("entro")
        if (online) {
            if (typeof(name) === "string" && name.length > 0) {
                initApplication().then(() => {
                    initProfile(name, image).then().catch(() => {
                        console.log("init profile failed")
                    })
                    navigation.navigate("Main", {screen: "Wall"})
                }).catch(() => {
                    console.log("Application not initialized")
                })
            } else {
                Alert.alert("Missing name", "Insert a name.");
            }
        } else {
            Alert.alert("Connection error", "Is not possible to sing up due to a network error");
        }
    }

    function getImage() {
        openImagePicker().then((result) => {
            if (!result.canceled) {
                if (result.length > 137000) {
                    Alert.alert("Size error", "Image size must be less then 100KB, default icon setted.");
                }
                setImage(result);
            }
        }).catch((err) => {
            Alert.alert("Error", "Image not selected, default icon setted.");
            setImage(Image.resolveAssetSource(DefaultImage).uri);
        })
    }

    if (!online) {
        return (
            <View style={style.waiting}>
                <Text style={{fontSize: 25, fontStyle: "italic"}}>Connection error. Is not possible to retrieve data of
                    followed users, please check your connection and retry. Try to click button below or
                    restart app
                </Text>
                <Button title="Reload" onPress={() => {
                    reloadApp().then(() => {
                        NativeModules.DevSettings.reload();
                    })
                }}/>
            </View>
        );
    } else {
        return (
            <SafeAreaView style={style.mainContainer}>
                <View style={style.welcomeContainer}>
                    <Text style={style.welcomeText}>Wellcome on Twit Tok!</Text>
                </View>
                <View style={style.form}>
                    <Text style={style.text}>Insert your name</Text>
                    <TextInput style={style.inputField} maxLength={19} textAlign="center" onChangeText={(value) => {
                        setName(value)
                    }}/>
                    <Text style={style.text}>Insert your profile pic (optional)</Text>
                    {image && <Image source={{ uri: createPictureSource(image) }} style={{ width: 100, height: 100 }} />}
                    <ChooseImageButton onPress={getImage}/>
                </View>
                <View style={style.button}>
                    <RegisterButton onPress={confirmRegistration}/>
                </View>
            </SafeAreaView>
        );
    }
}

const style = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        flex: 1
    },
    welcomeContainer: {
        flex: 0.3,
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 55,
        fontStyle: "italic",
        color: "#6200ee"
    },
    text: {
        fontSize: 30,
        color: "#6200ee"
    },
    button: {
        flex: 0.4,
        alignItems: "center",
        justifyContent: "center",
    },
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
    },
    inputField: {
        fontSize: 30,
        width: 260,
        borderBottomWidth: 1,
        borderRadius: 50,
        borderColor: "black"
    }
});

export default Register;
