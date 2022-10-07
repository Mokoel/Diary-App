import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from "./ImagePicker";
import { imgStorageRegi } from "../util/diaryAPI";

import { useEffect } from "react";

function DiaryWrite() {
 
    
     const route = useRoute();  // 캘린더에서 누른 날짜를 글쓰기 페이지에서 출력하기 위해 씀
    
     const navigation = useNavigation()
     /** 글쓰기 페이지에서 달력아이콘을 누르면 캘린더 출력 */
     const calendarViewHandle = ()=>{
        navigation.navigate("calendarView")
     }
/** 카메라 버튼 클릭시 갤러리에서 사진 가져오기 스토리지에 파일 생성됨 */
     const ImageRegiHandle = async (img, base64data)=>{
        let imgdata = await imgStorageRegi(img, base64data);
    }
/** 입력버튼 클릭시 글등록 완료 후 리스트 페이지로 이동 */
    const listShowHandle = ()=>{
        navigation.navigate("list",{email:route.params})
    }

    return ( 
        <>
        <View style={styles.container}>


        <Text >{route.params}
        <Text onPress={calendarViewHandle}><Ionicons size={24} name="calendar" /></Text></Text>

            <Text style={{fontSize:20,marginBottom:10}}>😊😁😍😒🤩</Text>
            <TextInput placeholder={"글을 입력해주세요!."} style={{width:"90%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:10,height:200,marginBottom:30}}/>


            </View>
            
            <View style={{flex:1}}>

            
            <Pressable  android_ripple={{color:"lightblue",borderless:true,}}>
            <View style={{alignItems:"flex-end"}}>
                <Ionicons size={24} name="camera-outline" />
            </View>
            </Pressable>
            </View>
            <ImagePicker onImage={ImageRegiHandle}/>
            <Button onPress={listShowHandle} title="입력"></Button>
        </>
     );
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        textAlign:"center",
        alignItems:"center",
        fontFamily:"GamjaFlower",
        marginTop:20
    },
    font :{
        fontFamily:"GamjaFlower",
        fontSize:20,
        marginBottom:10,
        marginTop:10
    }
  });
export default DiaryWrite;