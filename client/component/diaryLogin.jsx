import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { checkRegisterReq } from "../util/accounts";

function DiaryLogin() {
    const navigation = useNavigation()
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    const [loading,setLoading] = useState(false);

    const joinHandle = ()=>{
        navigation.navigate("join")
    }

    const loginHandle = ()=>{
        
        
        setLoading(true);

        !async function(){
        try{
            if(regex.test(email)){
                const recv = await checkRegisterReq(email,password)
                // ctx.dispatch({type:"login",payload:recv})
                // AsyncStorage.setItem("authLoginSave", JSON.stringify(recv))
                Alert.alert("앱이름","로그인 성공")
                navigation.navigate("calendar")

            }else if(!regex.test(email)){
                Alert.alert("앱이름","이메일 형식이 맞지않습니다.")
            }
        }catch(e){
        Alert.alert("앱이름","이메일 또는 비밀번호가 맞지않습니다.")
        console.log(e)
        }
        setLoading(false);
        }();
}
if(loading){
    return (<View style={{flex:1,justifyContent:"center"}}>
        <ActivityIndicator size={36}/>
    </View>)
}

    return ( 
        <>
        <View style={styles.container}>
            <Text style={{marginBottom:10}}>

        </Text>
        <Text style={styles.font}>이메일</Text>
        <TextInput autoCapitalize="none" keyboardType="email-address" onChangeText={(elm)=>setEmail(elm)} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <Text style={styles.font}>비밀번호</Text>
        <TextInput  secureTextEntry={true} onChangeText={(elm)=>setPassword(elm)} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <View style={{marginTop:20}}>
        <Button onPress={loginHandle} title={"로그인"}/>
        </View>
        <View style={{marginTop:10}}>
        <Text style={styles.font} onPress={joinHandle}>가입하기</Text>
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
    },
    font :{
        fontFamily:"GamjaFlower",
        fontSize:18,
        marginBottom:10,
        marginTop:10,
    }
  });

export default DiaryLogin;