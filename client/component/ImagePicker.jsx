import { View, Text, Pressable, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useCameraPermissions, useMediaLibraryPermissions, PermissionStatus, launchImageLibraryAsync } from "expo-image-picker";
import { sendData } from "../util/diaryAPI";





function ImagePicker({onImage}) {
    const [imgUri, setImgUri] = useState(null);
    const [img, setImg] = useState(null);
    const [base64data, setImgBase64] = useState(null);
    const [cameraStatus, requestCameraPermission] = useCameraPermissions();
    const [albumStatus, requestAlbumPermission] = useMediaLibraryPermissions();
    const albumPressHandle = async () => {


        try {
            if (albumStatus.status === PermissionStatus.DENIED || cameraStatus.status === PermissionStatus.UNDETERMINED) {
                const res = await requestAlbumPermission();

                if (!res.granted) {
                    Alert.alert("Diary", "사진앨범 접근권한이 필요합니다.");
                    return;
                }

            }

        } catch (err) {
            console.log(err);
            return;
        }


        /**권한요청 */
        requestAlbumPermission();


        const rst = await launchImageLibraryAsync({
            quality: 0.5,
            allowsEditing: true,
            aspect: [16, 9],
            exif: true,
            base64: true
        });

        console.log(rst)
        if (!rst.cancelled) {
            setImgUri(rst.uri);
            onImage(rst.uri, rst.base64)
        }

        
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.imagePreviewBox}>
                {imgUri && <Image source={{ uri: imgUri }} style={{ flex: 1 }} />}
            </View>
            <TouchableOpacity onPress={albumPressHandle}>
                <Ionicons name="image-outline" size={24} color="black" />
            </TouchableOpacity>
        </View>);
}


const styles = StyleSheet.create({
    imagePreviewBox: {
        flex: 1,
        backgroundColor: "white",
        maxHeight: 250,
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: "center",
        borderRadius: 10

    }
});
export default ImagePicker;