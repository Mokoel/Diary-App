import { View, Text, StyleSheet } from "react-native";



function CustomButton({ children }) {
    return (<View style={styles.buttonBox}><Text style={styles.button}>{children}</Text></View>);
}


const styles = StyleSheet.create({
buttonBox:{
    backgroundColor:"black",
    paddingVertical:8,
    paddingHorizontal:15,
    borderRadius:10,
    alignItems:"center",
    
},
button:{
    color:"white",
    fontWeight:"bold",

}
});


export default CustomButton;