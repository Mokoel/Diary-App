
import { useRoute ,useNavigation} from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";

import { View, Text, StyleSheet, Image, Modal, Pressable, TouchableOpacity, ScrollView, Alert } from "react-native";

import { AccountContext } from "../context/context";
import { tagFind } from "../util/diaryAPI";
import CustomButton from "./customButton";
import { Entypo } from '@expo/vector-icons';
import { contentDelete } from "../util/diaryAPI";
function DiaryDetail({ route }) {
    let { data } = route.params;
    const [searchTag, setSearchTag] = useState("");
    const [tagGroup, setTagGroup] = useState(null);
    const [dotModalVisible, setDotModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const accountCtx = useContext(AccountContext);

    const navigation = useNavigation();
    
    async function findTag(one) {

        try {
            let findTagRst = await tagFind(accountCtx?.auth?.email, one);
            setTagGroup(findTagRst.data)
        } catch (err) {
            console.log(err)
        }
    }


    const tagPressHandle = (one) => {
        setSearchTag(one)
        setModalVisible(true);
        findTag(one);
      }
    
      const dotMenuPressHandle = () => {
        setDotModalVisible(true);
      }
    

  //수정하기 
  const modiPressHandle = () => {
    console.log(data, "수정하기 아이템")
    navigation.navigate("modifyDetail", data);
    setDotModalVisible(false);
  }

  //삭제하기
  const delPressHandle = () => {
    setDotModalVisible(false);

    Alert.alert("", "게시물을 삭제하시겠습니까?", [{
      text: "확인",
      onPress: async () => {
        try {
          let ItemDel = await contentDelete(data._id);
          console.log(ItemDel, "삭제데이터")
        } catch (err) {
          console.log(err)
        }
        //캘린더로 돌아가기
        navigation.goBack();
      }
    }, {
      text: "취소",
      onPress: () => { console.log("삭제취소") }
    }])
  }

  //올리기


    return (
        <View style={styles.outlineBox}>
  <View style={styles.miniHeader}>
      <View style={styles.miniHeaderInfo}>
        <View>
          {data?.emoji !== "" ? <Text style={styles.emoji}>{data?.emoji}</Text> : null}
        </View>
        <View style={styles.headerTextBox}>
          <Text  style={styles.todayDate}>{data?.chooseDate.slice(0, 10)}</Text>
          <Text style={styles.nickname}>{data?.nickname}</Text>
        </View>

      </View>

      <TouchableOpacity style={styles.dotmenu} onPress={dotMenuPressHandle}>
        <Entypo name="dots-three-vertical" size={14} color="#333" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={dotModalVisible}
        onRequestClose={() => {
          setDotModalVisible(!dotModalVisible);
        }}
      >

        <View style={styles.centeredView}>
          <Pressable onPress={() => { console.log("?"); setDotModalVisible(false) }} style={{ flex: 1, width: "100%" }}>
          </Pressable>
          <View style={styles.modalView}>
            <View style={styles.modalMenuTextBox}>
              <TouchableOpacity onPress={modiPressHandle}>
                <Text style={styles.modalMenuModiText}>수정하기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={delPressHandle}>
                <Text style={styles.modalMenuDelText}>삭제하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>




    </View>
            <ScrollView>
                <View style={styles.imgBox}>
                    {data.image !== "" ?
                        <Image
                            source={{ uri: data?.image }}
                            style={styles.img}
                        />
                        : null}
                </View>
                <View style={styles.contentBox}>
                    <Text style={styles.contentText}>{data.content}</Text>
                </View>
            </ScrollView>

            <View style={styles.tagBox}>
                {
                    data.tag.map((one, index) => {

                        return <TouchableOpacity key={index} onPress={() => { tagPressHandle(one); }}><Text key={index} style={styles.tagText} >#{one}</Text></TouchableOpacity>
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

                    {tagGroup !== null ? tagGroup.map((one, index) => {
                        return <View key={index} style={styles.tagModalBox}>

                            <Text style={styles.tagDate}>{one.chooseDate.slice(0, 10)}</Text>
                            <View style={{ flexDirection: "row", padding: 10, alignItems: "center" }}>
                                <Text style={styles.tagEmoji}>{one.emoji}</Text>
                                <Text style={styles.tagContent}>{one.content}</Text>
                            </View>
                        </View>
                    }) : null}



                    <Pressable
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <CustomButton>내리기</CustomButton>


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
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerTextBox: {
        justifyContent: "center",
        marginLeft: 10
    },
    imgBox: {
        flex: 1,
        alignItems: "center"
    },
    img: {
        height: 180,
        width: "95%",
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
        height:80,
        justifyContent: "center",
        alignItems: "center",
    },
    tagText: {
        padding: 5,
        borderRadius: 20,
        fontFamily: "GamjaFlower",
        fontSize:20,
    },
    contentText: {
        fontSize: 20,
        fontFamily: "GamjaFlower",
    },
    centeredView: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
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
        borderWidth: 2,
        borderColor: "#d0d0d0",
        borderRadius: 20,
        padding: 8,
        marginBottom: 10
    },
    tagDate: {
        fontWeight: "bold",
        fontStyle: "italic",
        marginLeft: 10

    },
    tagContent: {
        fontSize: 14,
        
    },
    tagEmoji: {
        fontSize: 20,
        marginRight: 8
    },
    todayDate:{
        fontSize: 18,
        fontFamily: "GamjaFlower",
    },
    nickname:{
        fontSize: 18,
        fontFamily: "GamjaFlower",
    },
    miniHeaderInfo: {
        flexDirection: "row"
    },
    modalMenuModiText: {
        marginBottom: 10,
        fontSize: 15,
        textAlign: "center",
        borderBottomColor: "grey",
        paddingBottom: 10,
        borderBottomWidth: 0.7,
        color: "#303030"
    },
    modalMenuDelText: {
        marginBottom: 10,
        fontSize: 15,
        textAlign: "center",
        color: "#303030"
    },
    modalMenuTextBox: {
        height: 80
    }

});

export default DiaryDetail;