import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList, SafeAreaView } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { AccountContext, ContentContext } from '../context/context';
import { TodoCreateReq, TodoDateReq } from '../util/todoAPI';
import TodoItem from './todoItem';
import { AntDesign } from '@expo/vector-icons';
//2022.10.10
//심플투두 기능 있으면 좋을 듯
//태그 검색 후 리스트 컴포넌트 띄워주기
//날짜 마크 찍는거 한국 시간으로 띄워주기(다음날로 넘어감...)
//bottom Tab 스와이프 설정해주기.


function SimpleTodo({ date }) {
  const [checkboxState, setIsChecked] = useState(false);
  const [todo, setTodo] = useState(false);
  const [done, setDone] = useState(false);
  const [chk, setChk] = useState(false);
  const [findTodo, setFindTodo] = useState(null);
  const [todoRefresh, setTodoRefresh] = useState(false);
  const accountCtx = useContext(AccountContext);
  const isFocused = useIsFocused();
  console.log(isFocused);

  async function todoCreate() {
    try {
      let create = await TodoCreateReq(accountCtx.auth.email, todo, accountCtx.auth.nickname, date, checkboxState);
      console.log(create.data)
    } catch (err) {
      console.log(err)
    }
  }


  async function todoFind() {
    try {
      let find = await TodoDateReq(accountCtx.auth.email, date);
      setFindTodo(find.data)
      console.log(find.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if(date || todoRefresh){
      todoFind();
      setTodoRefresh(false);
    }
  }, [done, todoRefresh, isFocused])

  const textHandle = (one) => {
    setTodo(one);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} >
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={"padding"}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.todoOutline}>
      <View style={styles.todoInputBox}>


    <AntDesign name="checkcircle" size={19} color="black" style={{marginRight:5}} />
      <TextInput style={styles.todoInput}
      placeholder={"입력"} 
      onChangeText={textHandle}
      value={todo}
        returnKeyType={"done"}
        enablesReturnKeyAutomatically={true}
        onEndEditing={(one) => {
          setDone(true);
          setTodoRefresh(true);
          todoCreate();
          setTodo("");
        }}
      />
</View>




<View style={styles.todoFind}>
      <FlatList
        data={findTodo}
        keyExtractor={(one) => one._id}

        renderItem={({ index, item }) => {
          return (
            <TodoItem item={item}/>
          )
        }
        }
      />
</View>



    </View>

    </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
        </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  todoOutline: {
    flex: 1,
    padding:10,
  },
  todoInput: {
    flex:1,
    paddingHorizontal:10,
    width: "70%",
    height: 30,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginVertical:5

  },
  chkTodoText: {
    textDecorationLine:"solid",
    textDecorationColor:"grey",
    color:"red",
    width: "80%",
    marginVertical:7
  },
  unChktodoText:{
    width: "80%",
    marginVertical:7
  },
  todoFind:{
    flex:1,
    flexDirection:"row"
  },
  todoInputBox:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default SimpleTodo;