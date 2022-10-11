import React, { useContext, useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { format } from "date-fns";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { AccountContext, ContentContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";

function CalendarView() {

  const navigation = useNavigation();
  const accountCtx = useContext(AccountContext);
  const isfocused = useIsFocused();

  const [diarydata, setDiarydata] = useState(null);
  const [posts, setPosts] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy.MM.dd"),
  );

  //content를 이메일로 찾고, 날짜 뽑아서 마크해주기.
  //조건 : 이미 날짜가 있는 애는 선택하면 데이터 보여주기.
  //해당 날짜에 데이터가 없으면 글 작성으로 가기.



  /**다이어리 데이터 가져오는 함수 */
  async function data() {

    try {
      if (accountCtx?.auth.email) {
        let dataRst = await listViewReq(accountCtx?.auth.email);
        setDiarydata(dataRst.data)
      } else {
        return;
      }

    } catch (err) {
      console.log(err)
    }
  }


  /**포커싱될 때 데이터 파인드 해주기. */
  useEffect(() => {
    data();

    if (diarydata !== null) {

      let data = diarydata.map((one) => {
        
        return {
          id: one._id,
          nickname: one.nickname,
          email: one.email,
          imageURI: one.image,
          date: one.chooseDate,
          emoji: one.emoji,
          content: one.content,
          tag: one.tag
        };
      })
      setPosts(data);
    } else {
      return;
    }

  }, [isfocused, accountCtx.auth?.email])


  /**날짜 밑에 점 찍어주는 변수*/
  const markedDates = posts?.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = { marked: true };
    return acc;
  }, {});



  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      //marked: markedDates[selectedDate]?.marked,
    }
  }


  /**날짜찍으면 이동 (1.디테일 2.글작성)*/
  const daySelectHandle = (day) => {
    setSelectedDate(day.dateString)
    // console.log(day.dateString)
    


  }



  useEffect(()=>{

    let dateItem = [];
  
    posts?.forEach(elm => {
      if (elm.date.slice(0, 10) == selectedDate) {
        return dateItem.push(elm);
      }
    });

    if(dateItem.length == 0){
      navigation.navigate("diaryWrite", [selectedDate]);
    }else if(dateItem.length >= 1 ){

      console.log("dateItem!!!!!!!!!!!!!!!",dateItem)
      navigation.navigate(
      "calendar", { screen: "diaryWrite-yu", params: {item:dateItem} })

    }

  },[selectedDate])

  return (
    <>
      <Calendar style={styles.calendar}
        markedDates={markedSelectedDates}
        onDayPress={daySelectHandle}
        maxDate={new Date().toISOString().slice(0, 10)}
        theme={{
          //selectedDayBackgroundColor: 'red',  
          arrowColor: 'blue',
          dotColor: 'grey',
          todayTextColor: 'yellow',
          todayBackgroundColor: 'green',
        }} />
    </>



  );
}

const styles = StyleSheet.create({
  calendar: {
    // flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    height: "80%"
  }
});

export default CalendarView;