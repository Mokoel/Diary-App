// 다이어리 리스트 페이지

import { useIsFocused, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AccountContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";

function DiaryList() {

 
  const [refresh, setRefresh] = useState(false);

    const ctx = useContext(AccountContext)
    const focused = useIsFocused();
    const [listData,setListData] = useState([])
    const route = useRoute();
    const email = ctx.auth.email;
    // ctx.auth 가 없으면 빈화면 보여주기 로그인 안되어있을시 오류 뜨지않게
    if(!ctx.auth){  
    return <>
    </>
}
    console.log("email!!!!!!!",email)

    useEffect(() => {
        try{

            if (focused) {
                // updateItems();
                ( async () => {
                    //const newArr = [];
                    const datas = await listViewReq(email);
                    
                    //newArr.push(datas);
                    setListData([...datas]);
                    console.log("!~~~~~~~~~~~~~~~~~~~~~~~:",listData)
                })      
            }
        }catch(e){console.log(e)}
        }, [focused]);
        
        console.log(listData)



  // ctx.auth 가 없으면 빈화면 보여주기 로그인 안되어있을시 오류 뜨지않게
  if (!ctx.auth) {
    return <></>;
  }

  console.log("email!!!!!!!", email);
  async function findDatas() {
    try {
      const datas = await listViewReq(email);
      setListData(datas.data);
      console.log("ddddddddddddddddd", listData.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    findDatas();
  }, [focused]);

  console.log(listData);
  return (
    <View style={styles.container}>
      <Text>😊😁😍😒🤩</Text>
      <FlatList
        data={listData}
        keyExtractor={(one) => one._id}
        style={{ width: "95%", height: 50, margin: 5 }}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          const result = await listViewReq(email);
          setListData(result);
          setRefresh(false);
        }}
        renderItem={({ index, item }) => {
          return (
            // component로 수정예정
            <View>
                <Text>{item.chooseDate}</Text>
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
            </View>
          );
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
});

export default DiaryList;
