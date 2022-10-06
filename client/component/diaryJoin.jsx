import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
function DiaryJoin() {
    
    const [nickName,setnickName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [checkPassword,setCheckPassword] = useState()

    console.log(email)

    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    return ( 
        <>
        
        <View style={styles.container}>
        <Text style={{marginBottom:10}}>

        </Text>
        <Text style={styles.font}>닉네임</Text>
        <TextInput  autoCapitalize="none" onChangeText={(elm)=>setnickName(elm)} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:10}}></TextInput>
        <Text style={styles.font}>이메일</Text>
        <TextInput  autoCapitalize="none" keyboardType="email-address" onChangeText={(elm)=>setEmail(elm)} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:10}}></TextInput>
        <Text style={styles.font}>비밀번호</Text>
        <TextInput onChangeText={(elm)=>setPassword(elm)} secureTextEntry={true} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <Text style={styles.font}>비밀번호 확인</Text>
        <TextInput onChangeText={(elm)=>setCheckPassword(elm)} secureTextEntry={true} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <View style={{marginTop:20}}>
        <Button title={"가입하기"}/>
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
        fontSize:20,
        marginBottom:10,
        marginTop:10
    }
  });


export default DiaryJoin;