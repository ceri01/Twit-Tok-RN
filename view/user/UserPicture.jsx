import {Image, StyleSheet, View} from "react-native";

const UserPicture = (props) => {
    function pictureDimension() {
        if (props.changePicDimension) {
            return ({
                height: 40,
                width: 40
            });
        }
        return styles.img
    }

    // TODO: Fix with user pic
    return (
        <View style={styles.imgContainer}>
            <Image
                style={pictureDimension()}
                source={require('../../assets/favicon.png')}/>
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
        height: 50,
        width: 50,
    }
});

export default UserPicture;