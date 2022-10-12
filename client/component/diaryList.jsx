// 다이어리 리스트 페이지

import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AccountContext, ContentContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";
import ListItem from "./listItem";

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
    <Text style={styles.loginX}>로그인 후 사용해주세요!</Text></>;;
  }

  async function emailFind(){
    
        try {
        // updateItems();
        
          //const newArr = [];
          const datas = await listViewReq(email);

          //newArr.push(datas);
          setListData([...datas]);

        } catch (e) {
          console.log(e);

      }
    }
  

  useEffect(() => {
    if(focused){

      emailFind()
    }
  }, [focused]);


  // ctx.auth 가 없으면 빈화면 보여주기 로그인 안되어있을시 오류 뜨지않게
  if (!ctx.auth) {
    return <></>;
  }


  //console.log("email!!!!!!!", email);
  /** 일기 데이터 목록*/
  async function findDatas() {
    try {
      const datas = await listViewReq(ctx?.auth?.email);
      setListData(datas.data);
      
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    findDatas();
  }, [focused,contentCtx?.refresh]);
  
  /** 리스트 목록 누르면 디테일창으로 이동 */
  // const listDetailHandle =(elm)=>{ 
  //   navigation.navigate("listDetail",{datas:listData,index:elm})
  // }

  return (
    <View style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={(one) => one._id}
        style={{ width: "95%", height: 50, margin: 5 }}
        renderItem={({ index, item }) => {
          return <ListItem 
          item={item} 
          navigation={navigation}
          />
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "GamjaFlower",
  },
  font: {
    fontFamily: "GamjaFlower",
    fontSize: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  loginX:{
    textAlign:"center",
    top:"50%",
    fontFamily: "GamjaFlower",
    fontSize:17
}
});

export default DiaryList;
