import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View ,Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from "./ImagePicker";
import { imgStorageRegi, createDataRegi } from "../util/diaryAPI";
import { useEffect, useState } from "react";
import EmojiComponent from "./emoji";


function DiaryWrite() {

    const route = useRoute();
    const navigation = useNavigation();

    const [emojimodalShow, setEmojimodalShow] = useState(false);
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [emoji, setEmoji] = useState(null);
    //const [chooseDate, setChooseDate] = useState("");
    const [tag, setTag] = useState("");
    
     /** 글쓰기 페이지에서 달력아이콘을 누르면 캘린더 출력 */
     const calendarViewHandle = ()=>{
        navigation.navigate("calendarView")
     }

    /**[서버]스토리지 폴더에 저장*/
    const imageRegiHandle = async (img, base64data) => {
        let imgdata = await imgStorageRegi(img, base64data);
        setImage(imgdata.path)
    }


    const contentChangeHandle = (val) => {
        setContent(val)
    }



    /**글 등록 데이터: email, content, nickname, image, emoji, chooseDate, createdAt, tag  // !!!필수 데이터: email, content, nickname */
    const createPressHandle = async () => {

        // let email = "testyu@naver.com";
        // let nickname = "닉네임1";


        try {

            let data = await createDataRegi(email, content, nickname, image, emoji, route.params, new Date(), tag);
            console.log(data, "등록결과")


            Alert.alert("Diary","일기 등록에 성공하셨습니다.",[
                {
                    text: '취소',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                  },
                  {
                    text: '확인',
                    onPress: () => {
                        return navigation.navigate("list")
                    }
                  }
            ])
        } catch (err) {
            console.log(err, "등록실패")
            Alert.alert("Diary","내용을 입력해주세요!",[
                  {
                    text: '확인',
                    onPress: () => console.log('Install Pressed')
                  }
            ])
        }
    }

    
    const emojiPressHandle = (emoji) => {
        setEmoji(emoji)
    }

    const tagChangeHandle = (val)=>{
        setTag(val)
    }
    return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  

                <View style={styles.container}>
               
                <View style={styles.dateSelect}>
                <Text>{route?.params}</Text>
                <Text onPress={calendarViewHandle}><Ionicons size={24} name="calendar" /></Text>
                </View>

                <EmojiComponent onEmoji={emojiPressHandle}/>

                <TextInput 
                placeholder="#태그를 입력해보세요."
                onChangeText={tagChangeHandle}
                value={tag}
                />

                <TextInput
                    placeholder={"글을 입력해주세요!."}
                    value={content}
                    multiline={true}
                    onChangeText={contentChangeHandle}
                    style={styles.input}
                />
                <View style={styles.imgBox}>
                <ImagePicker onImage={imageRegiHandle} />
                </View>
                <Pressable>
                    <Button onPress={createPressHandle} title="입력"></Button>
                </Pressable>
        
                </View>
            </TouchableWithoutFeedback>


    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:"center",
        textAlign: "center",
        fontFamily: "GamjaFlower",
        marginTop:20
    },
    font: {
        fontFamily: "GamjaFlower",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 10
    },
    input: {
        width: "90%",
        fontFamily: "GamjaFlower", 
        fontSize: 20, 
        borderWidth: 1, 
        borderRadius: 5,
         paddingLeft: 10, 
         height: 200, 
         marginBottom: 30
    },
    emoji: {
        fontSize: 40, 
        textAlign: "center", 
        marginTop: 20
    },
    dateSelect:{
        flexDirection:"row"
    },
    imgBox:{
        flex:1,

    }
});

export default DiaryWrite ;