import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet, Text } from "react-native";
import { format } from "date-fns";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AccountContext, ContentContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";

function CalendarView() {
  const navigation = useNavigation();
  const accountCtx = useContext(AccountContext);
  const isfocused = useIsFocused();

  const [posts, setPosts] = useState(null);
  const [selectedDate, setSelectedDate] = useState(format(new Date(), "yyyy.MM.dd"));



  /**다이어리 데이터들 가져오는 함수 */
  async function data() {

    try {

      if (accountCtx?.auth.email) {
        let dataRst = await listViewReq(accountCtx?.auth.email);

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



  /**포커싱, 마운트, 이메일 로그인 될 때 데이터 파인드 해주기. */
  useEffect(() => {
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
    let sameDate = posts?.map(one => {
      if (one.date.slice(0, 10) === day.dateString) {
        return one;
      }
      return;
    });


    let naviDate;
    if (sameDate !== undefined) {
      naviDate = sameDate[0];
    }

    if (sameDate.length >= 1) {

      if (naviDate !== undefined && naviDate !== null) {
        navigation.navigate("diaryDetail", { item: naviDate })
      } else {
        navigation.navigate("diaryWrite", [day.dateString]);
      }
    }
    setSelectedDate(day.dateString)
  }





  return (
    <>
      <Calendar style={styles.calendar}
        markedDates={markedSelectedDates}
        onDayPress={daySelectHandle}

        onDayLongPress={() => console.log("뭐해줄지고민")}

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
          monthTextColor: '#303030',
        }} />

    </>



  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: "80%"
  }
});

export default CalendarView;