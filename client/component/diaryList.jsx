import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";


function DiaryList() {
    return ( 
        <View style={styles.container}>

        <Text>😊😁😍😒🤩</Text>

        </View>

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
        fontSize:20,
        marginBottom:10,
        marginTop:10
    }
  });



export default DiaryList;