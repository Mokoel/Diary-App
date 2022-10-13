import { View, Text, StyleSheet } from "react-native";



function CustomListButton({ children }) {
    return (<View style={styles.buttonBox}><Text style={styles.button}>{children}</Text></View>);
}


const styles = StyleSheet.create({
buttonBox:{
    backgroundColor:"#d0d0d0",
    paddingVertical:5,
    paddingHorizontal:7,
    borderRadius:6,
    alignItems:"center",
    marginHorizontal:3
},
button:{
    color:"#333",
    fontSize:14
}
});


export default CustomListButton;