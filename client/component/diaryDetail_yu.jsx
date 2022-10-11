
import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AccountContext } from "../context/context";
import { tagFind } from "../util/diaryAPI";
function DiaryDetail_yu() {
  const [searchTag,setSearchTag] = useState("");
  const accountCtx = useContext(AccountContext);
  let route = useRoute();
  let item = route.params.item[0];


 
  /**태그검색 */
  async function findTag(){
    //태그리스트로 가서 태그들만 모아보는 리스트 띄워주기.
    try{
      let findTagRst = await tagFind(accountCtx?.auth?.email, searchTag);
      console.log(findTagRst.data)
    }catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    findTag();
  },[searchTag])
  
  return (<View style={styles.outlineBox}>

    <View style = {styles.miniHeader}>

    <View>
      <Text style={styles.emoji}>{item.emoji}</Text>
    </View>

    <View style={styles.headerTextBox}>
        <Text>{item.date.slice(0, 10)}</Text>
        <Text>{item.nickname}</Text>
    </View>
    </View>

    <View style={styles.imgBox}>
      {item.imageURI !== "" ? <Image
        source={{uri: item.imageURI}} 
        style={styles.img}
        /> : null}
    </View>

    <View style={styles.contentBox}>
      <Text style={styles.contentText}>{item.content}</Text>
    </View>


    <View style={styles.tagBox}>
      { 
        item.tag.map((one)=>{
          
          return  <Text style={styles.tagText} onPress={()=>{setSearchTag(one)}}>#{one}</Text>
      })
    }
    </View>

  </View>);
}

const styles = StyleSheet.create({
 outlineBox:{
   flex:1,
   margin:10
 },
 miniHeader:{
   flexDirection:"row",
   
 },
 headerTextBox:{
   //backgroundColor:"red",
   justifyContent:"center",
   marginLeft:10,
 },
 imgBox:{
   flex:1,
 },
 img:{
   flex:1,
   height:100,
   //width:100
   borderRadius:15,
   margin:10
 },
 contentBox:{
   flex:2,
   borderWidth:3,
   borderColor:"#d0d0d0",
   borderRadius:20,
   padding:20,
   margin:10,
   backgroundColor:"#d0d0d0"
 },
 emoji:{
   fontSize:40,
   marginLeft:10
 },
 tagBox:{
  flexDirection:"row",
  borderWidth:2,
  marginHorizontal:10,
  borderRadius:10,
  marginTop:10,
  flex:0.3,
  justifyContent:"center",
  alignItems:"center"

 },
 tagText:{
  //backgroundColor:"skyblue",
  //borderWidth:2,
  padding:5,
  borderRadius:20
  //marginHorizontal:8,
 },
 contentText:{
   fontSize:16,
 
 }
 

});

export default DiaryDetail_yu;