import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View ,Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from "./ImagePicker";
import { imgStorageRegi, createDataRegi, createUpdate } from "../util/diaryAPI";
import { useContext, useEffect, useState } from "react";
import EmojiComponent from "./emoji";
import { AccountContext, ContentContext } from "../context/context";
import CustomButton from "./customButton";


function ModifyList() {
    const route = useRoute();
    const item = route.params;

    console.log("datas!!!@@@@!!@@!!@!@!@!@!@@!",item)
    const ctx = useContext(AccountContext);
    const contentCtx = useContext(ContentContext);
    const navigation = useNavigation();
    const [content, setContent] = useState();
    const [image, setImage] = useState();
    const [emoji, setEmoji] = useState();
    const [tag, setTag] = useState([]);
    
    const chooseDate = item.chooseDate
    //console.log("ctx!!!!!",ctx.auth)
    const {_id, email, nickname, createdAt} = item

    // const [modifyEmoji,setModifyEmoji] = useState();
    // const [modifyContent,setModifyContent] = useState();
    // const [modifyTag,setModifyTag] = useState();
    useEffect(()=>{
        setEmoji(item.emoji)
        setContent(item.content)
        setTag(item.tag)
        
      },[])
      
    //console.log(tag.join())
    
    console.log("tagsssssssssssssssssss",tag)
     /** 글쓰기 페이지에서 달력아이콘을 누르면 캘린더 출력 */
     const calendarViewHandle = ()=>{
        navigation.navigate("calendarView")
     }

    /**[서버]스토리지 폴더에 저장*/
    const imageRegiHandle = async (img, base64data) => {
        try{
            let imgdata = await imgStorageRegi(img, base64data);
            setImage(imgdata.path)
        }catch(err){
            console.log(err)
        }
    }

    const contentChangeHandle = (val) => {
        setContent(val)
    }

    const tagChangeHandle = (val) => {
        let tagText =val.replace(/\s/g, "")
        let tagArr = tagText.split("#");
        setTag(tagArr);
        
    }


    /**글 등록 데이터: email, content, nickname, image, emoji, chooseDate, createdAt, tag  // !!!필수 데이터: email, content, nickname */
    const createPressHandle = async () => {


        try {
            let data = await createUpdate(_id, email, content, nickname, image, emoji, chooseDate, createdAt, tag);
            console.log(data, "수정결과")
            console.log(_id, email, content, nickname, image, emoji, chooseDate, createdAt, tag, "수정결과")


            Alert.alert("Diary","일기 수정에 성공하셨습니다.",[

                  {
                    text: '확인',
                    onPress: () => {
                        navigation.navigate("calendar")

                    }
                  }
            ])
        } catch (err) {
            console.log(err, "수정실패")
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

    // const tagChangeHandle = (val)=>{
    //     let tagArr=val.split("#");
    //     setTag(tagArr);
    // }




    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        >

            <View style={styles.container}>

                <View style={styles.firstHeader}>

                    
                    <Text style={{fontSize:30}}>{item.emoji}</Text>
                    <Text style={styles.date}>{item.chooseDate.substr(0,10)}</Text>

                </View>

                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="# 태그 를 입력해보세요."
                        onChangeText={tagChangeHandle}
                        value={tag.join(" #")}
                        style={styles.tag}
                    />
                    <ScrollView>
                        {contentCtx?.imgPreview !== null ? <View style={styles.imagePreviewBox}>
                            {contentCtx?.imgPreview !== null ? <Image source={{ uri: contentCtx.imgPreview }} style={{ flex: 1 }} /> : null}
                        </View> :
                            null}

                        <TextInput
                            placeholder={"일기를 작성해보세요."}
                           // placeholderTextColor={"black"}
                            value={content}
                            multiline={true}
                            onChangeText={contentChangeHandle}
                            style={styles.input}
                        />
                    </ScrollView>
                </View>


                <View style={styles.buttonGroup}>
                    <View style={styles.iconButton}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={calendarViewHandle} style={styles.calender}>
                                <Ionicons size={24} name="calendar" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.imgPick}>
                            <ImagePicker onImage={imageRegiHandle}/>
                        </View>

                    </View>
                    <TouchableOpacity onPress={createPressHandle}
                        style={styles.button}>
                        <CustomButton>
                            수정
                        </CustomButton>
                    </TouchableOpacity>
                </View>

            </View>

        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>

)

}


const styles = StyleSheet.create({
inputBox: {
    //backgroundColor:"red",
    flex: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#d0d0d0"
},
date: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 10
},
firstHeader: {
    //backgroundColor:"red",
    flex: 2,
    marginTop: "3%",
    alignItems: "center"
},
container: {
    flex: 1,
    fontFamily: "GamjaFlower",
    padding: 24
},
tag: {
    marginBottom: 20,
    fontSize: 16,
    paddingLeft: 10,
    color: "#333",
    backgroundColor: "#d0d0d0",
    padding: 10,
    borderRadius: 15
},
input: {
    color: "#333",
    //backgroundColor:"red",
    minWidth: "90%",
    fontFamily: "GamjaFlower",
    fontSize: 20,
    paddingLeft: 10,
    marginBottom: 30,
    minHeight: 300,
    
},
emoji: {
    fontSize: 40,
    textAlign: "center",
},
buttonGroup: {
    flex: 1,
    flexDirection: "row",
    borderRadius: 20,
    marginBottom: "2%",
    alignItems: "flex-end",
    justifyContent: "center"
},
button: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 10,
    //backgroundColor:"red"
},
calender: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d0d0d0",
    marginHorizontal: 2,
    borderRadius: 10,
    paddingHorizontal: 8
},
iconButton: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor:"red"
},
imgPick: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
},

imagePreviewBox: {
    flex: 1,
    backgroundColor: "#fOfada",
    marginHorizontal: 10,
    marginTop: 10,
    justifyContent: "center",
    borderRadius: 20,
    minHeight:180,

}
});

export default ModifyList;