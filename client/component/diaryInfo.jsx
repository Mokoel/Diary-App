// 로그인시 세팅창에 나올 페이지

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Button, Text } from "react-native";
import { AccountContext } from "../context/context";

function DiaryInfo() {
    const navigation = useNavigation()
    const ctx = useContext(AccountContext)
    const logoutHandle = ()=>{
      console.log("로그아웃")
      Alert.alert("앱이름","로그아웃 하시겠습니까?",[
        {
          text:"취소",
        },
        {
          text:"로그아웃",
          onPress:()=>{
            ctx.dispatch({type:"logout"});
            AsyncStorage.removeItem("authLoginSave")
            navigation.navigate("set")
          }
        }
      ])
    }

    return ( 
        <>
        <Text>내정보</Text>
        <Button onPress={logoutHandle} title="로그아웃"/>
        </>
     );
}

export default DiaryInfo;