import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Alert, Pressable, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { AccountContext, ContentContext } from "../context/context";
import { contentDelete } from "../util/diaryAPI";
import CustomListButton from "../component/customlistButton"

function ListItem({ item, navigation }) {
  // const route = useRoute();


  //console.log("item!!!!!",item)
  const ctx = useContext(AccountContext);

  const contentCtx = useContext(ContentContext)


  const modifyHandle = (elm) => {
    navigation.navigate("modifyList", elm);
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
              const deleteList = contentDelete(_id);
              contentCtx.setRefresh((current) => !current)
              Alert.alert("Diary", "삭제성공.");

            },
          },
        ]);

      } catch (e) {
        Alert.alert("Diary", "실패.");
        console.log(e);
      }
    }
  };

  const detailPressHandle = () => {
    if (item) {
      navigation.navigate("listDetail", { data: item })
    }


  }

  return (
    <View style={styles.outline}>
      <View style={styles.miniHeader}>
        <Text style={styles.date}>{item.chooseDate.substr(0, 10)}</Text>

        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={()=>modifyHandle(item)}>
            <CustomListButton style={styles.button}>
              수정
            </CustomListButton>
          </TouchableOpacity>

          <TouchableOpacity onPress={deleteHandle}>
            <CustomListButton style={styles.button}>
              삭제
            </CustomListButton>
          </TouchableOpacity>

        </View>
      </View>
      <Pressable onPress={detailPressHandle}>
        <View style={styles.contentBox} >

          <Text style={styles.emoji}>{item.emoji}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  button: {
    marginHorizontal: 10
  },
  miniHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5
  },
  date: {
    fontSize: 13,
    color: "#333",
    marginLeft: 3,
    fontWeight: "bold"
  },
  contentBox: {
    borderColor: "#d0d0d0",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center"

  },
  emoji: {
    fontSize: 30
  },
  content: {
    marginLeft: 10,
    fontSize: 12

  }

});
export default ListItem;
