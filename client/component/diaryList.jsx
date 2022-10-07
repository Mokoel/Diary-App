// 다이어리 리스트 페이지

import { useIsFocused, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AccountContext } from "../context/context";
import { listViewReq } from "../util/diaryAPI";


function DiaryList() {
    const ctx = useContext(AccountContext)
    const focused = useIsFocused();
    const [listData,setListData] = useState([])
    const route = useRoute();
    
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


    return ( 
        <View style={styles.container}>

        <Text>😊😁😍😒🤩</Text>

        </View>

     );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"GamjaFlower",
    },
    font :{
        fontFamily:"GamjaFlower",
        fontSize:20,
        marginBottom:10,
        marginTop:10
    }
  });



export default DiaryList;