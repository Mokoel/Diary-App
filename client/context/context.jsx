

import { Context, createContext } from "react";


//컨텍스트 생성
export const AccountContext = createContext({});

//1. 토큰 저장
export function AccountContextProvider({children}){
    // mainpage에서 마운트 될 때 Ayncstorage 확인하기.



    return(<AccountContext.Provider value={{}}>
        {children}
    </AccountContext.Provider>)


}

