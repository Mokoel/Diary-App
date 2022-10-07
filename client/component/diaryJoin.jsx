// 회원가입 페이지

import { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View ,TouchableWithoutFeedback,Keyboard} from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { checkRegisterReq, sendRegisterReq } from "../util/accounts";
import { useNavigation } from "@react-navigation/native";
import { AccountContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
function DiaryJoin() {

    const ctx = useContext(AccountContext);
    const navigation = useNavigation()
    const [loading,setLoading] = useState(false);
    const [nickname,setnickname] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [checkPassword,setCheckPassword] = useState()

    
    
    /** 이메일 정규식 변수  */
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    /** 가입하기 버튼 클릭시 작동 function */
    const registerHandle = ()=>{
        setLoading(true);

        !async function(){
        try{
            if(regex.test(email) &&password==checkPassword){  // 이메일 형식이 맞고 비밀번호와 재확인 비밀번호가 같으면 
                // 이메일 중복 체크 넣어야할듯
                const recv = await sendRegisterReq(nickname,email,password)
                Alert.alert("앱이름","회원가입이 완료되었습니다.")
                const recv2 = await checkRegisterReq(email,password)  // 회원가입하면서 동시에 로그인 실행
                ctx.dispatch({type:"login",payload:recv2})
                AsyncStorage.setItem("authLoginSave", JSON.stringify(recv2))
                navigation.navigate("calendar")
                
            }else if(!nickname){
                Alert.alert("앱이름","닉네임을 입력해주세요.")
            }else if(!regex.test(email)){
                Alert.alert("앱이름","이메일 형식이 맞지않습니다.")
            }else{
                Alert.alert("앱이름","비밀번호가 같지 않습니다.")
            }

        }catch(e){
        Alert.alert("앱이름","회원가입이 처리되지 않았습니다.")
        console.log(e)
        }
        setLoading(false);
        }();
}

    return ( 

         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
        <Text style={{marginBottom:10}}>

        </Text>
        <Text style={styles.font}>닉네임</Text>
        <TextInput  autoCapitalize="none" onChangeText={(elm)=>setnickname(elm)} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:10}}></TextInput>
        <Text style={styles.font}>이메일</Text>
        <TextInput  autoCapitalize="none" keyboardType="email-address" onChangeText={(elm)=>setEmail(elm)} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:10}}></TextInput>
        <Text style={styles.font}>비밀번호</Text>
        <TextInput onChangeText={(elm)=>setPassword(elm)} secureTextEntry={true} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <Text style={styles.font}>비밀번호 확인</Text>
        <TextInput onChangeText={(elm)=>setCheckPassword(elm)} secureTextEntry={true} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <View style={{marginTop:20}}>
        <Button onPress={registerHandle} title={"가입하기"}/>
        </View>
        
        </View >

        </TouchableWithoutFeedback>
     );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        textAlign:"center",
        justifyContent:"center",
        alignItems:"center",
        fontFamily:"GamjaFlower",
        marginBottom:20
    },
    font :{
        fontFamily:"GamjaFlower",
        fontSize:20,
        marginBottom:10,
        marginTop:10
    }
  });


export default DiaryJoin;