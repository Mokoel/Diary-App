import { View, Text, Pressable, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { useCameraPermissions, useMediaLibraryPermissions, PermissionStatus, launchImageLibraryAsync } from "expo-image-picker";
import { sendData } from "../util/diaryAPI";
import { ContentContext } from "../context/context";





function ImagePicker({ onImage }) {
    const contentCtx = useContext(ContentContext);
    const [imgUri, setImgUri] = useState(null);
    const [img, setImg] = useState(null);
    const [base64data, setImgBase64] = useState(null);
    const [cameraStatus, requestCameraPermission] = useCameraPermissions();
    const [albumStatus, requestAlbumPermission] = useMediaLibraryPermissions();
    /**라이브러리로 접근 */
    const albumPressHandle = async () => {


        try {
            if (albumStatus.status === PermissionStatus.DENIED || cameraStatus.status === PermissionStatus.UNDETERMINED) {
                const res = await requestAlbumPermission();

                if (!res.granted) {
                    Alert.alert("DayGram", "사진앨범 접근권한이 필요합니다.");
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

        //console.log(rst)
        if (!rst.cancelled) {
            contentCtx?.setImgPreview(rst.uri);
            onImage(rst.uri, rst.base64)

        }

    }

    return (
            <TouchableOpacity onPress={albumPressHandle} style={styles.imgPicker}>
                <Ionicons name="image-outline" size={24} color="black" />
            </TouchableOpacity>
        );
}


const styles = StyleSheet.create({
    imgPicker:{
        backgroundColor:"#d0d0d0",
        paddingVertical:5,
        paddingHorizontal:8,
        borderRadius:10,
        alignItems:"center",    
    }
});
export default ImagePicker;