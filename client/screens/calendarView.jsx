import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { Alert, StyleSheet, Text, View, Modal, Pressable, SafeAreaView } from "react-native";
import { format, set } from "date-fns";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AccountContext, ContentContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";
import { checkToken } from "../util/accounts";
import { AntDesign } from '@expo/vector-icons';
import SimpleTodo from "../component/simpleTodo";
import CustomButton from "../component/customButton";
import { TodoDelReq } from "../util/todoAPI";


function CalendarView() {
  const navigation = useNavigation();
  const accountCtx = useContext(AccountContext);
  const isfocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);

  const [long, setlong] = useState(false)

  const [posts, setPosts] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy.MM.dd"));
  const [tokenRst, setTokenRst] = useState("");



  /**다이어리 데이터들 가져오는 함수 */
  async function data() {

    try {

      if (accountCtx.auth) {
        let dataRst = await listViewReq(accountCtx?.auth?.email);

        let data = dataRst.data.map((one) => {
          return {
            _id: one._id,
            nickname: one.nickname,
            email: one.email,
            imageURI: one.image,
            date: one.chooseDate,
            chooseDate: one.chooseDate,
            emoji: one.emoji,
            content: one.content,
            tag: one.tag
          };
        })

        setPosts(data);

      } else {
        return;
      }

    } catch (err) {
      console.log(err)
    }
  }



  async function tokenValid() {
    if (accountCtx.auth) {
      try {
        let tokenVal = await checkToken(accountCtx.auth.token);
        setTokenRst(tokenVal);
      } catch (err) {
        console.log(err)
        Alert.alert("Diary", "로그인 토큰에 문제가 생겼습니다. 다시 로그인해주세요.", [{
          text: "확인",
          onPress: () => {
            accountCtx.dispatch({ type: "logout" })
            navigation.navigate("set", "login")
          }
        }])
      }
    }
  }


  /**포커싱, 마운트, 이메일 로그인 될 때 데이터 파인드 해주기. */
  useEffect(() => {
    //토큰유효성검사
    tokenValid();
    data();
  }, [isfocused, accountCtx?.auth?.email])


  /**날짜 밑에 점 찍어주는 변수*/
  const markedSelectedDates = posts?.reduce((acc, current) => {
    let markDate = current.date.slice(0, 10);
    acc[markDate] = { marked: true };
    return acc;
  }, {});



  /**글작성 또는 디테일로 이동 */
  const daySelectHandle = (day) => {
    let sameDate = [];
    posts?.forEach(one => {
      if (one.date.slice(0, 10) === day.dateString) {
        return sameDate.push(one);
      }
      return;
    });

    //console.log(sameDate,"sameDate")
    if (sameDate.length == 0 || sameDate == undefined || sameDate == null) {
      navigation.navigate("diaryWrite", [day.dateString]);


    } else if (sameDate.length !== 0 || sameDate !== undefined || sameDate !== null) {

      navigation.navigate("diaryDetail", { item: sameDate[0] })
    }

    setSelectedDate(day.dateString)
  }

  const downPressHandle = () => {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={{flex:1 , backgroundColor:"#fff"}}>

    <View style={{ backgroundColor: "white", flex: 1 }}>

      <Calendar style={styles.calendar}

        markedDates={markedSelectedDates}
        onDayPress={daySelectHandle}
        onDayLongPress={(day) => { setlong(day.dateString); setModalVisible(true); }}
        maxDate={new Date().toISOString().slice(0, 10)}
        enableSwipeMonths={true}
        hideExtraDays={true}
        theme={{
          arrowColor: '#f1f3f5',
          dotColor: 'grey',
          todayTextColor: 'black',
          textDayFontFamily: "GamjaFlower",
          textMonthFontFamily: "GamjaFlower",
          todayBackgroundColor: "#f1f3f5",
          weekVerticalMargin: 15,
          textMonthFontSize: 25,
          monthTextColor: '#303030'
        }}/>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable onPress={() => { console.log("?"); setModalVisible(false) }} style={{ flex: 1, width: "100%" }}>
        </Pressable>
        <View style={styles.modalView}>
          {long ? <Text style={styles.modalText}>{long?.slice(0, 4)}년 {long?.slice(5, 7)}월 {long?.slice(8, 10)}일</Text> : <></>}

          <View style={{ flexDirection: "row"}}>
            <AntDesign name="checkcircleo" size={14} color="grey" />
            <Text style={{ fontSize: 13, color: "grey", fontWeight: "bold" }}> 오늘의 할 일을 적어보세요.</Text>
          </View>
          {long ? <SimpleTodo date={long} /> : <></>}

          <Pressable onPress={downPressHandle}>
            <CustomButton>내리기</CustomButton>
          </Pressable>

        </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  calendar: {
    height: "80%",
    marginTop:100
  },
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#dfdfdf'
  },
  modalView: {
    marginTop: 'auto',
    width: '100%',
    height: '40%',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderWidth:2,
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 3,
      height: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18

  }

});

export default CalendarView;