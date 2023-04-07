import {Image, StyleSheet, View} from "react-native";
import {createPictureSource} from "../../viewmodel/PictureHandler"


const UserPicture = (props) => {
    function pictureDimension() {
        if (props.changePicDimension) {
            return ({
                height: 90,
                width: 90
            });
        }
        return styles.img
    }

    // TODO: Fix with user pic
    return (
        <View style={styles.imgContainer}>
            <Image
                style={pictureDimension()}
                source={{uri: createPictureSource(props.source)}}/>
        </View>
    );
}

const styles = StyleSheet.create({
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        height: 40,
        width: 40,
    }
});

export default UserPicture;