// 로그인 페이지

import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View, TouchableWithoutFeedback, Keyboard, Pressable, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { checkRegisterReq } from "../util/accounts";
import { AccountContext } from "../context/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "./customButton";

function DiaryLogin() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const ctx = useContext(AccountContext);

    /** 가입하기 페이지로 이동 네비게이션 */
    const joinHandle = () => {
        navigation.navigate("join")
    }

    async function login() {
        try {
            if (email) {
                const recv = await checkRegisterReq(email, password);
                // util폴더 - account.js / 이메일,비밀번호 확인 후 로그인 실행

                AsyncStorage.setItem("authLoginSave", JSON.stringify(recv))
                ctx.dispatch({ type: "login", payload: recv })
                Alert.alert("DayGram", "로그인 성공")
                
           return navigation.navigate("calendar", { screen: "calendarView", params: { email: email } }) // 로그인 성공하면 캘린더 창으로 이동
             
            } else {
                Alert.alert("DayGram", "이메일 형식이 맞지않습니다.")
            }

        } catch (e) {
            Alert.alert("DayGram", "이메일 또는 비밀번호가 맞지않습니다.");
            console.log(e);
        }
    }

    const loginHandle = () => {
        login();
    }

    // 로딩이 있으면 로딩바 출력!
    if (loading) {
        return (<View style={{ flex: 1, justifyContent: "center" }}>
            <ActivityIndicator size={36} />
        </View>)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={{ marginBottom: 10 }}>

                </Text>
                <Text style={styles.font}>이메일</Text>
                <TextInput autoCapitalize="none" keyboardType="email-address" onChangeText={(elm) => setEmail(elm)} style={{ borderWidth: 1, width: "60%", fontFamily: "GamjaFlower", fontSize: 20, borderWidth: 1, borderRadius: 5, paddingLeft: 7 }}></TextInput>

                <Text style={styles.font}>비밀번호</Text>
                <TextInput secureTextEntry={true} onChangeText={(elm) => setPassword(elm)} style={{ borderWidth: 1, width: "60%", fontFamily: "GamjaFlower", fontSize: 20, borderWidth: 1, borderRadius: 5, paddingLeft: 7 }}></TextInput>
                <View style={{ marginTop: 20 }}>

                    <TouchableOpacity onPress={loginHandle}>
                        <CustomButton>로그인</CustomButton>
                    </TouchableOpacity>
                </View>



                <View style={{ marginTop: 10 }}>
                    <Text style={styles.font} onPress={joinHandle}>가입하기</Text>
                </View>
            </View >

        </TouchableWithoutFeedback>
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
        fontSize: 18,
        marginBottom: 10,
        marginTop: 10,
    }
});

export default DiaryLogin;