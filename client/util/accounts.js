import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../context/app-context";



const APP_KEY = "AIzaSyDg-nnL6QzodsEzMUUdZluSCrml-QiH3zY"

//const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2l0aC0xZDdkYyIsImF1ZCI6IndpdGgtMWQ3ZGMiLCJhdXRoX3RpbWUiOjE2NjM5MDUyMTYsInVzZXJfaWQiOiJ0ZnRlOXhncjdmZ3NqT0pTSmlJOTZTYTNKNUYzIiwic3ViIjoidGZ0ZTl4Z3I3Zmdzak9KU0ppSTk2U2EzSjVGMyIsImlhdCI6MTY2MzkwNTIxNiwiZXhwIjoxNjYzOTA4ODE2LCJlbWFpbCI6InRlc3QxM0BuYXZlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDEzQG5hdmVyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Ehkq-sSip-t7BIy2T8donrdqsLGqVWb0p7xhXxRgZe12jzW1UUb-3lkZ0FCxZt2OVxcUZOvuYCRVmu_CvsuM01RrCeGbAsZQh35-EbFVcbBgD13lR4j9s_K0wWy1TS31WXR4yB_xqre8m0r4DlW7nD63BmH9LJtG3aaMrBePc8--xUB5w0pMcM7i1VlYdgIhCV_i70vp0zZvN_kmLQHE6i-TqMWz5Sx9DYyI2pr0L_IYNTzKo-0__r_jk8d1rxpOvDzHjOnzbspeUhDt3ztFczVmH2ZxhlkrSOAd7_ixhWkl0nr6EBY6o6WDjtZnGrT76g2xaLoKEP6C9DcigDZF3g"
export async function sendRegisterReq(email,password){
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+APP_KEY,
    {
        email:email,
        password:password,
        returnSecureToken:true,
    });
    return response.data
    //console.log(response.data)
}


export async function checkRegisterReq(email,password){
    const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+APP_KEY,
    {
        email:email,
        password:password,
        returnSecureToken:true,
    });
    return response.data
    //console.log(response.data)
}


export async function readRegisterReq(){
    const response = await axios.get("https://with-1d7dc-default-rtdb.asia-southeast1.firebasedatabase.app/message.json",
);
    return response.data
    //console.log(response.data)
}



export async function writeRegisterReq(showBlah,showContent,idToken){
    
    
    console.log(showContent)
    const response = await axios.post("https://with-1d7dc-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth="+idToken,
    {
        text:showBlah,
        content :showContent,
        createdAt:Date.now(),
        
    });
    //console.log(response.data)
    //return response.data
}


export async function DeleteReq(idToken,key){
    
    
    //console.log("아이디토큰-------",idToken)
    //console.log("키값-------",key)
    const response = await axios.delete("https://with-1d7dc-default-rtdb.asia-southeast1.firebasedatabase.app/message/"+key+".json?auth="+idToken,
    {

        
    });
    return response.data
    //console.log(response.data)
}


export async function modifyRegisterReq(modifyTitle,modifyContent,idToken,modifyKey){
    
    
    //console.log(showContent)
    const response = await axios.put("https://with-1d7dc-default-rtdb.asia-southeast1.firebasedatabase.app/message/"+modifyKey+".json?auth="+idToken,
    {
        text:modifyTitle,
        content :modifyContent,
        createdAt:Date.now(),
        key:modifyKey,
    });
    //console.log(response.data)
    //return response.data
}