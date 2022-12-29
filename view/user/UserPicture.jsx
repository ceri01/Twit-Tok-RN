import {Component} from "react";
import {StyleSheet, View} from "react-native";
import ImageLoad from "react-native-image-placeholder";

class UserPicture extends Component {
    render() {
        return (
            <View style={style.imgContainer}>
                <ImageLoad
                    style={style.img}
                    source={require('../../assets/favicon.png')} />
            </View>
        );
    }
}

const style = StyleSheet.create({
    imgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        height: 70,
        width: 70,
    }
});



export default UserPicture;