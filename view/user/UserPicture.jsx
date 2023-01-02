import {Component} from "react";
import {Image, StyleSheet, View} from "react-native";

class UserPicture extends Component {

    pictureDimension() {
        if (this.props.changePicDimension) {
            return ({
                height: 40,
                width: 40
            });
        }
        return style.img
    }
    render() {
        return (
            <View style={style.imgContainer}>
                <Image
                    style={this.pictureDimension()}
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
        height: 50,
        width: 50,
    }
});



export default UserPicture;