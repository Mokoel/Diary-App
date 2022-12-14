import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Alert, Pressable, Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AccountContext, ContentContext } from "../context/context";
import { contentDelete } from "../util/diaryAPI";
import CustomListButton from "../component/customlistButton"
import { Entypo } from '@expo/vector-icons'; 

function ListItem({ item, navigation }) {
  
  const ctx = useContext(AccountContext);
  const contentCtx = useContext(ContentContext);


  const modifyHandle = (elm) => {
    navigation.navigate("modifyList", elm);
  };


  const deleteHandle = () => {
    const _id = item._id;


    if (ctx.auth) {
      try {
        Alert.alert("DayGram", "삭제 하시겠습니까?", [
          {
            text: "취소",
          },
          {
            text: "삭제",
            onPress: () => {
              const deleteList = contentDelete(_id);
              contentCtx.setRefresh(true);
              Alert.alert("DayGram", "삭제성공.");

            },
          },
        ]);

      } catch (e) {
        Alert.alert("DayGram", "실패.");
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
        <Text style={styles.date}>{item?.chooseDate?.substr(0, 10)}</Text>

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
            {item.emoji ? <Text style={styles.emoji}>{item.emoji}</Text> : <Entypo name="emoji-happy" size={27} color="#d0d0d0" />}
          


          <Text numberOfLines={1} style={styles.content}>{item.content}</Text>
        <View style={styles.imgBox}>
                    {item.image !== "" ?
                        <Image
                            source={{ uri: item?.image }}
                            style={styles.img}
                        />
                        : null}
                </View>
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
    marginHorizontal: 10,
  },
  miniHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 5
  },
  date: {
    fontSize: 16,
    color: "#303030",
    marginLeft: 7,
    fontWeight: "bold"
  },
  contentBox: {
    borderColor: "#d0d0d0",
    borderWidth: 3,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    minHeight:63

  },
  emoji: {
    fontSize: 25,
  },
  content: {
    marginLeft: 10,
    fontSize: 16,
    color:"#333",
    width:"70%"
  },

  imgBox: {
    flex: 1,
    alignItems: "flex-end"
  },
  img: {
    height: 40,
    width: 60,
    borderRadius: 5,
    margin: 1
  },

});
export default ListItem;
