import { ActivityIndicator, View } from "react-native";



function Loading(){
    return (<View style={{flex:1,justifyContent:"center"}}>
    <ActivityIndicator size={36}/>
</View>)
}

export default Loading;