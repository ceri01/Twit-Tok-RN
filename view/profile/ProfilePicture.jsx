import {Dimensions, Image, SafeAreaView, StyleSheet, View} from "react-native";
import {createPictureSource} from "../../viewmodel/PictureHandler"


const ProfilePicture = (props) => {
    return (
        <View style={styles.imgContainer}>
            <Image
                style={styles.img}
                source={{uri: createPictureSource(props.pic)}}/>
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
        aspectRatio: 1,
        height: "80%",
        width: "80%"
    }
});

export default ProfilePicture;