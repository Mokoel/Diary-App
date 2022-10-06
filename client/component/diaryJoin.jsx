import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { sendRegisterReq } from "../util/accounts";
function DiaryJoin() {
    const [loading,setLoading] = useState(false);
    const [nickname,setnickname] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [checkPassword,setCheckPassword] = useState()

    console.log(email)

    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    const registerHandle = ()=>{
        setLoading(true);

        !async function(){
        try{
            if(regex.test(email) &&password==checkPassword){
                const recv = await sendRegisterReq(nickname,email,password)
                Alert.alert("앱이름","회원가입이 완료되었습니다.")
                
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
        <>
        
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

        </>
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