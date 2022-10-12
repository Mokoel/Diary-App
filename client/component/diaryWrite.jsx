import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, Keyboard, View, Alert, TouchableOpacity, Image, KeyboardAvoidingView, KeyboardAvoidingViewComponent, Platform, ScrollView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import ImagePicker from "./ImagePicker";
import { imgStorageRegi, createDataRegi } from "../util/diaryAPI";
import { useContext, useEffect, useState } from "react";
import EmojiComponent from "./emoji";
import { AccountContext, ContentContext } from "../context/context";
import CustomButton from "./customButton";

import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ko } from "date-fns/locale";


/**글 등록 창
 * 1. 해야 할 일: 키보드 올라오면 버튼도 올라오기
 * 2. 캘린더는 날짜만 선택하게 모달로 띄우기
 */
function DiaryWrite() {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const ctx = useContext(AccountContext);
    const contentCtx = useContext(ContentContext);
    const route = useRoute();
    const navigation = useNavigation();
    const [createDate, setCreateDate] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [emoji, setEmoji] = useState(null);
    const [dateValue, setDateValue] = useState(new Date());
    const [tag, setTag] = useState([]);
    const [andDatePicker,setAndDatePicker] = useState(false)
    const isFocused = useIsFocused();
    //console.log(ctx.auth)
    /** 글쓰기 페이지에서 달력아이콘을 누르면 캘린더 출력 */


    if (!ctx?.auth) {
        return <>
        <Text style={styles.loginX}>로그인 후 사용해주세요!</Text></>;
      }



    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        hideDatePicker();
    };
    useEffect(() => {
        setCreateDate(route?.params)
    }, [route.params])

    const calendarViewHandle = () => {

        setAndDatePicker(true)
    }

    /**[서버]스토리지 폴더에 저장*/
    const imageRegiHandle = async (img, base64data) => {

        try {

            let imgdata = await imgStorageRegi(img, base64data);
            setImage(imgdata.path)
        } catch (err) {
            console.log(err)
        }
    }
    


    const contentChangeHandle = (val) => {
        setContent(val)
    }



    /**글 등록 데이터: email, content, nickname, image, emoji, chooseDate, createdAt, tag  // !!!필수 데이터: email, content, nickname */
    const createPressHandle = async () => {


        try {
            let data = await createDataRegi(ctx.auth?.email, content, ctx.auth?.nickname, image, emoji, createDate , new Date(), tag);
            console.log(data, "등록결과")


            Alert.alert("Diary", "일기 등록에 성공하셨습니다.", [

                {
                    text: '확인',
                    onPress: () => {
                        contentCtx?.setEmojiPreview(null)
                        contentCtx?.setImgPreview(null)
                        setContent("")
                        setTag("")
                        navigation.navigate("list")

                    }
                }
            ])



        } catch (err) {
            Alert.alert("Diary", "내용을 입력해주세요!", [
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

    const tagChangeHandle = (val) => {
        let tagText = val.replace(/\s/g, "")
        let tagArr = tagText.split("#");
        setTag(tagArr);

    }

    

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}
            >



                <View style={styles.container}>

                    <View style={styles.firstHeader}>
                  
                        <EmojiComponent onEmoji={emojiPressHandle} />


                        <Text style={styles.date}>{createDate}</Text>

                    </View>

                    <View style={styles.inputBox}>

                        <TextInput
                            placeholder="# 태그 를 입력해보세요."
                            onChangeText={tagChangeHandle}
                            value={tag}
                            style={styles.tag}
                        />


                        <ScrollView style={{ flex: 1 }}>
                            {contentCtx?.imgPreview !== null ? <View style={styles.imagePreviewBox}>
                                <Image source={{ uri: contentCtx?.imgPreview }} style={{ flex: 1 }} />
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
                            입력
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
                                            if(d.type == "set"){
                                                let selDate = new Date(d.nativeEvent.timestamp).toISOString().slice(0, 10);
                                                setCreateDate(selDate);
                                                setDateValue(new Date(d.nativeEvent.timestamp));
                                            }

                                            setAndDatePicker(false);
                                        }
                                    }
                                    />
                               :  null }
                        <TouchableOpacity onPress={createPressHandle}

                        style={styles.button}>
                        <CustomButton>
                            입력
                        </CustomButton>
                    </TouchableOpacity>

                        </View>

                    }


                </View>
           
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView >

    )

}


const styles = StyleSheet.create({
    inputBox: {
        //backgroundColor:"red",
        flex: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#d0d0d0",
        flex:4,
    },
    date: {
        flex: 1,
        fontSize: 15,
        color: "#333",
        paddingVertical: 10
    },
    firstHeader: {
        //backgroundColor:"red",
        flex: 1,
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
        minWidth: "90%",
        fontFamily: "GamjaFlower",
        fontSize: 20,
        paddingLeft: 10,
        marginBottom: 30,
        minHeight: 180,
        textAlignVertical: 'top'

    },
    emoji: {
        fontSize: 40,
        textAlign: "center",
    },
   
    button: {
        flex: 2,
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: 10,

    },
    calender: {
       // flex: 1,
        //justifyContent: "center",
       // alignItems: "center",
        backgroundColor: "#d0d0d0",
        marginHorizontal: 3,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 6,
    },
    iosButtonGroup: {
        flex: 1,
        flexDirection: "row",
        borderRadius: 20,
        marginBottom: "2%",
        justifyContent: "center"
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

    loginX:{
        textAlign:"center",
        top:"50%",
        fontFamily: "GamjaFlower",
        fontSize:17
    },
    AndButtonGroup:{
        flex: 1,
        flexDirection: "row",
        //borderRadius: 20,
        //marginBottom: "2%",
        //justifyContent: "center"
    },
    AndIconButton:{
        //backgroundColor:"red",
        alignItems:"center",
        flexDirection: "row",
        justifyContent: "center",
       // justifyContent: "flex-start",
    },
    AndImgPick:{
        paddingVertical:6,
        justifyContent: "center",
    },
    AndCalender:{
        justifyContent: "center",

    }
});

export default DiaryWrite;