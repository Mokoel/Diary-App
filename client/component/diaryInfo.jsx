// 로그인시 세팅창에 나올 페이지

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { AccountContext } from "../context/context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from "./customButton";
import { Ionicons } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 

function DiaryInfo() {

    const navigation = useNavigation();
    const ctx = useContext(AccountContext);
  
    const logoutHandle = ()=>{

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
      
      <View style={{flex:1}}>
        <View style={styles.container}>
        
        <Text style={styles.font} >e-mail <MaterialCommunityIcons name="email-outline" size={16} /> : {ctx.auth.email}</Text>
        <Text style={styles.font} >닉네임 <Octicons name="person" size={16} /> : {ctx.auth.nickname}</Text>


        <View style={{marginTop:30}}>
        <CustomButton onPress={logoutHandle}>로그아웃</CustomButton>
        </View>
        </View>
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
  fontSize:18,
  marginBottom:10,
  marginTop:10,
},
  });

export default DiaryInfo;