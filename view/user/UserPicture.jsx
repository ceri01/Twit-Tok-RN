import {Image, StyleSheet, View} from "react-native"
import {createPictureSource} from "../../viewmodel/PictureHandler"

const UserPicture = (props) => {
    return (
        <View style={styles.imgContainer}>
            <Image
                style={styles.img}
                source={{uri: createPictureSource(props.source)}}/>
        </View>
    )
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
})

export default UserPicture