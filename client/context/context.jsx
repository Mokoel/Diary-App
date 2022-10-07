
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Context, createContext, useEffect, useReducer, useState } from "react";
import Loading from "../component/loading";


//컨텍스트 생성
export const AccountContext = createContext({});

const authReducer = (state=null, action)=>{
    switch (action.type){
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
    return null;
}

//1. 토큰 저장
export function AccountContextProvider({children}){
    // mainpage에서 마운트 될 때 Ayncstorage 확인하기.
    const [auth,dispatch] = useReducer(authReducer,null);
    const [done,setDone] = useState(false);
    console.log(auth,"???너니")
    useEffect(()=>{
        AsyncStorage.getItem("authLoginSave").then((data)=>{
            if(data){
                dispatch({type:"login", payload:JSON.parse(data)})
            }

            setDone(true);
        })
        },[]);
    
        if(!done){
            return <Loading/>
        }
    


    return(<AccountContext.Provider value={{auth, dispatch}}>
        {children}
    </AccountContext.Provider>)


}

