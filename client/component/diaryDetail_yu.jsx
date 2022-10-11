
import { useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Modal, Pressable, TouchableOpacity, ScrollView } from "react-native";
import { AccountContext } from "../context/context";
import { tagFind } from "../util/diaryAPI";


import CustomButton from "./customButton";

function DiaryDetail_yu() {
  const [searchTag, setSearchTag] = useState("");
  const [tagGroup, setTagGroup] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);




  const accountCtx = useContext(AccountContext);

  let route = useRoute();
  let item = route.params.item[0];
  console.log(item.imageURI, "!!!!!!!!!!!!!!")


  /**태그검색 */
  async function findTag() {
    //태그리스트로 가서 태그들만 모아보는 리스트 띄워주기.
    try {
      let findTagRst = await tagFind(accountCtx?.auth?.email, searchTag);
      setTagGroup(findTagRst.data)
      console.log(findTagRst.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    findTag();
  }, [searchTag])

  return (<View style={styles.outlineBox}>

    <View style={styles.miniHeader}>

      <View>
        {item.emoji !== "" ? <Text style={styles.emoji}>{item.emoji}</Text> : null}

      </View>

      <View style={styles.headerTextBox}>
        <Text>{item.date.slice(0, 10)}</Text>
        <Text>{item.nickname}</Text>
      </View>

    </View>

    <View style={styles.imgBox}>
      {item.imageURI !== "" ? <Image
        source={{ uri: item.imageURI }}
        style={styles.img}
        resizeMode={"cover"}
      /> : null}
    </View>

    <View style={styles.contentBox}>
      <Text style={styles.contentText}>{item.content}</Text>
    </View>


    <View style={styles.tagBox}>
      {
        item.tag.map((one, index) => {

          return <TouchableOpacity key={index} onPress={() => { setSearchTag(one); setModalVisible(true); }}><Text key={index} style={styles.tagText} >#{one}</Text></TouchableOpacity>
        })
      }
    </View>


    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}


    >
      <View style={styles.modalView}>
      <Text style={styles.modalText}>#{searchTag}</Text>
    
      {tagGroup !== null ? tagGroup.map((one,index) => {
          return <View key={index} style={styles.tagModalBox}>

            <Text style={styles.tagDate}>{one.chooseDate.slice(0, 10)}</Text>
            <View style={{flexDirection:"row", padding:10, alignItems:"center"}}>
            <Text style={styles.tagEmoji}>{one.emoji}</Text>
            <Text style={styles.tagContent}>{one.content}</Text>
            </View>
          </View>
        }) : null}

        <Pressable
          //style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(!modalVisible)}
        >
          
          <CustomButton> 내리기 </CustomButton>

        </Pressable>
      </View>

    </Modal>







  </View>);
}

const styles = StyleSheet.create({

  outlineBox: {
    flex: 1,
    margin: 10
  },
  miniHeader: {
    flexDirection: "row"
  },
  headerTextBox: {
    justifyContent: "center",
    marginLeft: 10,
  },
  imgBox: {
    flex: 1,
    alignItems:"center"
  },
  img: {
    // flex: 1,
    height: 200,
    width: 200,
    borderRadius: 15,
    margin: 10
  },
  contentBox: {
    flex: 2,
    borderWidth: 3,
    borderColor: "#d0d0d0",
    borderRadius: 20,
    padding: 20,
    margin: 10,
    backgroundColor: "#d0d0d0"
  },
  emoji: {
    fontSize: 40,
    marginLeft: 10
  },
  tagBox: {
    flexDirection: "row",
    borderWidth: 2,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center"

  },
  tagText: {
    //backgroundColor:"skyblue",
    //borderWidth:2,
    padding: 5,
    borderRadius: 20
    //marginHorizontal:8,
  },
  contentText: {
    fontSize: 16,

  },
  centeredView: {
    flex: 1,
    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: '#dfdfdf'
  },
  modalView: {
    marginTop: 'auto',
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#fff',
    overflow: 'hidden',
    padding: 40
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "bold"
  },
  tagModalBox: {
    //backgroundColor:"red",
    borderWidth:2,
    borderColor:"#d0d0d0",
    borderRadius:20,
    padding:8,
    marginBottom:10
  },
  tagDate:{
    fontWeight:"bold",
    fontStyle:"italic",
    marginLeft:10
  },
  tagContent:{
   fontSize:14
  },
  tagEmoji:{
    fontSize:20,
    marginRight:8
  }

});

export default DiaryDetail_yu;