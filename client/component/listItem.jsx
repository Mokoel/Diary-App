import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { AccountContext } from "../context/context";
import { contentDelete } from "../util/diaryAPI";

function ListItem({ item, onPress }) {


    
    //console.log("item!!!!!",item)
  const ctx = useContext(AccountContext);
  const navigation = useNavigation();

  const modifyHandle = () => {
    navigation.navigate("modifyList");
  };

  const deleteHandle = () => {
    const _id = item._id;
    if (ctx.auth) {
      try {
        Alert.alert("Diary", "삭제 하시겠습니까?", [
          {
            text: "취소",
          },
          {
            text: "삭제",
            onPress: () => {
              const modify = contentDelete(_id);
              Alert.alert("Diary", "삭제성공.");
              navigation.navigate("list")
            },
          },
        ]);
      } catch (e) {
        Alert.alert("Diary", "실패.");
        console.log(e);
      }
    }
  };

  return (
    <View style={{ margin: 3, marginBottom: 5 }}>
      <View style={{ marginBottom: 6 }}>
        <Text>{item.chooseDate.substr(0, 10)}</Text>
        <Text
          onPress={()=>modifyHandle(item)}
          style={{
            position: "absolute",
            left: "80%",
            textAlign: "center",
            borderWidth: 3,
            borderColor: "red",
          }}
        >
          수정
        </Text>
        <Text
          onPress={deleteHandle}
          style={{
            position: "absolute",
            left: "90%",
            textAlign: "center",
            borderWidth: 3,
            borderColor: "red",
          }}
        >
          삭제
        </Text>
      </View>
      <Pressable onPress={onPress}>
        <View
          style={{
            backgroundColor: "green",
            borderRadius: 5,
            height: 70,
            borderWidth: 1,
            borderRadius: 5,
          }}
        >
          <View style={{ marginLeft: 10, marginTop: 5 }}>
            <Text>{item.emoji}</Text>
            <Text>{item.content}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default ListItem;
