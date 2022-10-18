import { useNavigation, useRoute } from "@react-navigation/native";
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View ,Alert, KeyboardAvoidingView, ScrollView, TouchableOpacity, Image, SafeAreaView, Platform } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from "./ImagePicker";
import { imgStorageRegi, createDataRegi, createUpdate, listViewReq } from "../util/diaryAPI";
import { memo, useContext, useEffect, useState } from "react";
import EmojiComponent from "./emoji";
import { AccountContext, ContentContext } from "../context/context";
import CustomButton from "./customButton";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons'; 

function ModifyList() {
    const route = useRoute();
    const item = route.params;

    const ctx = useContext(AccountContext);
    const contentCtx = useContext(ContentContext);
    const navigation = useNavigation();
    
    const [content, setContent] = useState();
    const [image, setImage] = useState();
    const [emoji, setEmoji] = useState();
    const [tag, setTag] = useState([]);
    const [createDate, setCreateDate] = useState(item.chooseDate.substr(0,10));
    const [dateValue, setDateValue] = useState(new Date());
    const [andDatePicker, setAndDatePicker] = useState(false)
    const chooseDate = createDate;
    const {_id, email, nickname, createdAt} = item;
    const [dateChk,setDateChk] = useState(false);

    useEffect(()=>{
        setEmoji(item.emoji)
        setContent(item.content)
        setTag(item.tag.join("#"))
        setImage(item.image)
      },[])
     
   
    
     /** 글쓰기 페이지에서 달력아이콘을 누르면 캘린더 출력 */
     const calendarViewHandle = ()=>{
        setAndDatePicker(true)
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
        let today = new Date().toISOString().slice(0,10);




        if(chooseDate <= today){
        try {
            let data = await createUpdate(_id, email, content, nickname, image, emoji, chooseDate, createdAt, tag);
            Alert.alert("DayGram", "일기 수정에 성공하셨습니다.", [

                {
                    text: '확인',
                    onPress: () => {
                        contentCtx?.setEmojiPreview(null)
                        contentCtx?.setImgPreview(null)
                        setContent("");
                        setTag("");
                        setEmoji("");
                        setImage(null);
                        navigation.goBack()
                    }
                }
            ])

        } catch (err) {
            console.log(err, "수정실패")
            Alert.alert("DayGram","내용을 입력해주세요!",[
                  {
                    text: '확인',
                    onPress: () => console.log('Install Pressed')
                  }
            ])
        }



    } else{
    Alert.alert("DayGram","날짜를 다시 선택해주세요!")
}}


    
    const emojiPressHandle = (emoji) => {
        setEmoji(emoji)
    }

    
    return (
        <SafeAreaView style={{flex:1}}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}
        >
            <View style={styles.container}>

            <ScrollView>




                <View style={styles.firstHeader}>

                    
                <Text style={styles.emoji}>{item?.emoji !== null ? item?.emoji  :<Entypo name="emoji-happy" size={50} color="grey" />}</Text>
                    
                    <Text style={styles.date}>{createDate}</Text>
                </View>

                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="# 태그 를 입력해보세요."
                        onChangeText={tagChangeHandle}
                        value={tag}
                        style={styles.tag}
                    />
                    

                        {image !== null&& image!=="" ? <View style={styles.imagePreviewBox}>
                            {image !== null&& image!=="" ? <Image source={{ uri: image }} style={{ flex: 1 }} /> : null}

                        </View> :
                            null}

                        <TextInput
                            placeholder={"일기를 작성해보세요."}
                            value={content}
                            multiline={true}
                            onChangeText={contentChangeHandle}
                            style={styles.input}
                        />
                </View>
                    </ScrollView>


                {Platform.OS === "ios" ?
                        <View style={styles.iosButtonGroup}>
                            <View style={styles.iosIconButton}>
                                <View style={styles.iosImgPick}>
                                    <ImagePicker onImage={imageRegiHandle} />
                                </View>

                                <View style={{ width: 120 }}>
                                    <DateTimePicker
                                        style={{ flex: 1 }}
                                        locale="ko"
                                        testID="dateTimePicker"
                                        value={dateValue}
                                        mode="date"
                                        is24Hour={true}
                                        onChange={(d) => {
                                            let selDate = new Date(d.nativeEvent.timestamp).toISOString().slice(0, 10);
                                            setCreateDate(selDate);
                                            setDateValue(new Date(d.nativeEvent.timestamp));
                                        }}
                                        onTouchEnd={true}
                                    />
                                </View>
                            </View>

                            <TouchableOpacity onPress={createPressHandle}
                                style={styles.button}>
                                <CustomButton>
                                    수정
                                </CustomButton>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={styles.AndButtonGroup}>
                            <View style={styles.AndIconButton}>
                                <View style={styles.AndImgPick}>


                                    <ImagePicker onImage={imageRegiHandle} />

                                </View>

                                <TouchableOpacity onPress={calendarViewHandle} style={styles.calender}>
                                    <Ionicons size={24} name="calendar" />
                                </TouchableOpacity>
                            </View>

                            {andDatePicker ?

                                <DateTimePicker
                                    style={{ flex: 1 }}
                                    locale="ko"
                                    testID="dateTimePicker"
                                    value={dateValue}
                                    mode="date"
                                    is24Hour={true}
                                    
                                    onChange={(d) => {
                                        if (d.type == "set") {
                                            let selDate = new Date(d.nativeEvent.timestamp).toISOString().slice(0, 10);
                                            setCreateDate(selDate);
                                            setDateValue(new Date(d.nativeEvent.timestamp));
                                        }
                                        setAndDatePicker(false);
                                    }
                                    }
                                />
                                : null}

                            <TouchableOpacity onPress={createPressHandle}
                                style={styles.button}>
                                <CustomButton>
                                    수정
                                </CustomButton>
                            </TouchableOpacity>

                        </View>
                    }
                </View>

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
        </SafeAreaView>
    )

}


const styles = StyleSheet.create({
    date: {
        flex: 1,
        fontSize: 18,
        color: "#333",
        paddingVertical: 10,
    },
    firstHeader: {
        flex: 1,
        alignItems: "center"
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom:10
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
        fontFamily: "GamjaFlower",
        fontSize: 20,
        paddingLeft: 5,
        minHeight: 350,
        textAlignVertical: 'top',
    },
    emoji: {
        fontSize: 40,
        textAlign: "center",
    },
    button: {
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: 10,
    },
    calender: {
        backgroundColor: "#d0d0d0",
        marginHorizontal: 3,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    iosButtonGroup: {
        borderTopWidth: 0.5,
        paddingTop: 10,
        borderTopColor: "#d0d0d0",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    iosIconButton: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    iosImgPick: {
        justifyContent: "center",
    },
    imagePreviewBox: {
        flex: 1,
        backgroundColor: "#fOfada",
        marginHorizontal: 10,
        marginTop: 10,
        justifyContent: "center",
        borderRadius: 20,
        minHeight: 300
    },
    AndButtonGroup: {
        borderTopWidth: 0.5,
        paddingTop: 10,
        borderTopColor: "#d0d0d0",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    AndIconButton: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    AndImgPick: {
        paddingVertical: 6,
        justifyContent: "center",
    },
    AndCalender: {
        justifyContent: "center"
    }
});

export default ModifyList;