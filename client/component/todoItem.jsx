import BouncyCheckbox from "react-native-bouncy-checkbox";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, FlatList } from 'react-native'
import { useEffect, useState, useContext } from 'react';
import { TodoDelReq } from "../util/todoAPI";

function TodoItem({item}) {
    const [chk, setChk] = useState(false);

    return ( 
    <View style={{ flex:1, flexDirection:"row"}}>
              <BouncyCheckbox
                fillColor="black"
                iconStyle={{ borderColor: "black" }}
                size={20}
                isChecked={chk}
                textComponent=
                 { chk ? <Text style={styles.chkTodoText}>  {item?.todoContent}</Text> : <Text style={styles.unChktodoText}>  {item?.todoContent}</Text>}
                onPress={ async (isChecked)=>{
                  setChk(isChecked);
                  if(isChecked){
                    try {
                      let tododel = await TodoDelReq(item._id);
                      console.log(tododel)

                    } catch (err) {
                      console.log(err)
                    }

                  }
                 
                }}
              />
              </View>
     );
}


const styles = StyleSheet.create({
    todoOutline: {
      flex: 1
    },
    todoInput: {
      flex:1,
      paddingHorizontal:10,
      marginLeft:10,
      width: "70%",
      height: 30,
      borderBottomColor: "#333",
      borderBottomWidth: 1,
      marginVertical:5
  
    },
    chkTodoText: {
    textDecorationLine:"line-through",
    color:"grey",
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

export default TodoItem;