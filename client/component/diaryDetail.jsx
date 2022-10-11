import { useContext } from "react";
import { Image, Text } from "react-native";
import { ContentContext } from "../context/context";

function DiaryDetail({route}) {
    const {index} = route.params
    const {datas} = route.params
    const data = datas[index]
    console.log("------------------------------")
    console.log(data)

    return ( 
    
    <>
    <Text>{data.chooseDate.substr(0, 10)}</Text>
    <Text>{data.emoji}</Text>
    <Text>{data.tag}</Text>
    <Text>{data.content}</Text>
    <Image source={{ uri: data.image }} style={{width:320,height:180}} resizeMode="stretch" />
    </> );
}

export default DiaryDetail;