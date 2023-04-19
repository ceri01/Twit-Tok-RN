import {Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native";
import RegisterButton from "./buttons/RegisterButton"
import {useState} from "react";
import {openImagePicker, createPictureSource} from "../viewmodel/PictureHandler";
import DefaultImage from "../assets/favicon.png";
import ChooseImageButton from "./buttons/ChooseImageButton";
import {initProfile} from "../viewmodel/initApp";

function Register({ route, navigation }) {
    const [image, setImage] = useState(null);
    const [name, setName] = useState("");

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

    console.log(image)

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
                <RegisterButton onPress={() => {
                    if (typeof(name) === "string" && name.length > 0) {
                        initProfile(name, image).then(() => {
                            navigation.navigate("Main", {screen: "Wall"})
                        }).catch((err) => {
                            Alert.alert("Error", "An error has occurred\n" + err);
                        })
                    } else {
                        Alert.alert("Missing name", "Insert a name.");
                    }
                }}/>
            </View>
        </SafeAreaView>
    );
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
