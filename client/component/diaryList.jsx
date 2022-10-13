// 다이어리 리스트 페이지

import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AccountContext, ContentContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";
import ListItem from "./listItem";
import { AntDesign } from '@expo/vector-icons';

function DiaryList() {
  const [refresh, setRefresh] = useState(false);
  const ctx = useContext(AccountContext);
  const contentCtx = useContext(ContentContext)
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [listData, setListData] = useState([]);

  const email = ctx?.auth?.email;

  // ctx.auth 가 없으면 빈화면 보여주기 로그인 안되어있을시 오류 뜨지않게
  if (!ctx?.auth) {
    return <>
      <Text style={styles.loginX}>로그인 후 사용해주세요!</Text></>;
  }


  // async function emailFind(){

  //       try {
  //         const datas = await listViewReq(email);
  //         setListData(datas.data);

  //       } catch (e) {
  //         console.log(e);
  //     }
  //   }


  // useEffect(() => {

  //   if(focused){
  //     emailFind()
  //   }

  // }, [focused]);

  /**리스트에서 글등록으로 */
  const writePressHandle = () => {
    navigation.navigate("writeList")
  }


  /** 일기 데이터 목록*/
  async function findDatas() {
    if (ctx.auth.email) {
      try {
        const datas = await listViewReq(ctx.auth.email);
        setListData(datas.data);

      } catch (e) {
        console.log(e);
      }

    }

  }

  useEffect(() => {
    findDatas();
  }, [focused, contentCtx?.refresh]);

  return (
    <View style={styles.container}>

      <FlatList
        data={listData}
        keyExtractor={(one) => one._id}
        style={{ width: "95%", height: 50, margin: 5, flex: 1 }}
        renderItem={({ index, item }) => {
          return <ListItem
            item={item}
            navigation={navigation}
          />
        }}
      />

      <TouchableOpacity onPress={writePressHandle}>
        <AntDesign name="pluscircle" size={45} color="#333" style={styles.plusIcon} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    //padding:10,
    marginBottom: 30,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 0.3,
    elevation: 2,
  },
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  font: {
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  }

});

export default DiaryList;
