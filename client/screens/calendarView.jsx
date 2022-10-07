import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { format } from "date-fns";
import { useNavigation, useRoute } from "@react-navigation/native";

function CalendarView({route}) {
  const navigation = useNavigation()
  console.log("route!!!",route)
  
  const posts = [
    {
      id: 1,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-10-05",
    },
    {
      id: 2,
      title: "제목입니다.",
      contents: "내용입니다.",
      date: "2022-10-07",
    }
  ];

  
  const markedDates = posts.reduce((acc, current) => {
    const formattedDate = format(new Date(current.date), 'yyyy-MM-dd');
    acc[formattedDate] = {marked: true};
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy.MM.dd"),
  );
  /** 달력에 마크 표시 변수 */
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

  /** 달력의 날짜 클릭시 클릭한 날짜를 글쓰기쪽으로 넘겨주면서 글쓰기 페이지로 이동 */
  const daySelectHandle = (day)=>{
    setSelectedDate(day.dateString)
    console.log(day.dateString)
    navigation.navigate("diaryWrite",[day.dateString])
  }


  return (
    <Calendar style={styles.calendar} markedDates={markedSelectedDates} onDayPress={daySelectHandle} theme={{
      //selectedDayBackgroundColor: 'red',  
      arrowColor: 'blue',
      dotColor: 'red',
      todayTextColor: 'yellow',
      todayBackgroundColor:'green',
      
    }}/>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  }
});

export default CalendarView;