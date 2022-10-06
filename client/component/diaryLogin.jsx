import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

function DiaryLogin() {
    const navigation = useNavigation()
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const joinHandle = ()=>{
        navigation.navigate("join")
    }
    

    return ( 
        <>
        <View style={styles.container}>
            <Text style={{marginBottom:10}}>

        </Text>
        <Text style={styles.font}>이메일</Text>
        <TextInput autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <Text style={styles.font}>비밀번호</Text>
        <TextInput  secureTextEntry={true} onChangeText={setPassword} style={{borderWidth:1,width:"60%",fontFamily:"GamjaFlower",fontSize:20,borderWidth:1,borderRadius:5,paddingLeft:7}}></TextInput>
        <View style={{marginTop:20}}>
        <Button title={"로그인"}/>
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