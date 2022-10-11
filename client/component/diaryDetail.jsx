import { useRoute } from "@react-navigation/native";
import { useContext } from "react";
import { Image, Text } from "react-native";
import { ContentContext } from "../context/context";

function DiaryDetail({route}) {
    //const route = useRoute()
    let item=route.params.item;
console.log("???????????",route.params.item)
    // const {index} = route.params;
    // const {datas} = route.params;
    // const data = datas[index];
    // console.log(datas)
    // console.log(data)

    return ( 
    
    <>
    <Text>{item.chooseDate.substr(0, 10)}</Text>
    <Text>{item.emoji}</Text>
    <Text>{item.tag}</Text>
    <Text>{item.content}</Text>
    <Image source={{ uri: item.image }} style={{width:320,height:180}} resizeMode="stretch" />
 </>
     );
}

export default DiaryDetail;