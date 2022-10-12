import { View, Text, StyleSheet } from "react-native";



function CustomListButton({ children }) {
    return (<View style={styles.buttonBox}><Text style={styles.button}>{children}</Text></View>);
}


const styles = StyleSheet.create({
buttonBox:{
    backgroundColor:"#d0d0d0",
    paddingVertical:3,
    paddingHorizontal:5,
    borderRadius:6,
    alignItems:"center",
    marginHorizontal:2
},
button:{
    color:"#333",
   // fontWeight:"bold",
    fontSize:15,
    fontFamily:"GamjaFlower",

}
});


export default CustomListButton;