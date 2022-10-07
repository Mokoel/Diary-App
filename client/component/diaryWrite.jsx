import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from "./ImagePicker";
import { imgStorageRegi } from "../util/diaryAPI";

import { useEffect } from "react";

function DiaryWrite() {
 
     const route = useRoute();

     const navigation = useNavigation()
     const calendarViewHandle = ()=>{
        navigation.navigate("calendarView")
     }

     const ImageRegiHandle = async (img, base64data)=>{
        let imgdata = await imgStorageRegi(img, base64data);
    }


    return ( 
        <>
        <View style={styles.container}>


        <Text >{route.params}
        <Text onPress={calendarViewHandle}><Ionicons size={24} name="calendar"/></Text></Text>

            <Text style={{fontSize:20,marginBottom:10}}>😊😁😍😒🤩</Text>
            <TextInput placeholder={"글을 입력해주세요!."} multiline={true} style={{width:"90%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:10,height:200,marginBottom:30 }}/>


            </View>
            <View style={{flex:1}}>


            </View>
            <ImagePicker onImage={ImageRegiHandle}/>
            <Button title="입력"></Button>
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