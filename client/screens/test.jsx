import { View, Text, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker'
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
function Test() {

  const [datestate, setDateState] = useState(false)

  const pressHandle = () => {
    setDateState(true)
  }





  
  return (

    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={pressHandle}>
        <AntDesign name="calendar" size={24} color="black" />
      </TouchableOpacity>

      {datestate ?
        <DateTimePicker
          style={{ flex: 1 }}
          locale="ko"
          value={new Date()}
          mode="date"
          is24Hour={true}
          disabled={false}
          onChange={(val) => {
            if (val.type == "set") {
              console.log(val.type)
              console.log(new Date(val.nativeEvent.timestamp))
              setDateState(false)
            }

          }}
        />
        : null}
    </View>);
}

export default Test;