import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

function CalendarView() {
  const navigation = useNavigation()

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
  const markedSelectedDates = {
    ...markedDates,
    [selectedDate]: {
      selected: true,
      marked: markedDates[selectedDate]?.marked,
    }
  }

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