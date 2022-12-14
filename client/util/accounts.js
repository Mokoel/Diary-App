import axios from "axios";



let baseUrl = "http://192.168.4.25:8080"

/** 회원가입 api요청*/
export async function sendRegisterReq(nickname,email,password){

    const response = await axios.post(baseUrl+"/api/account/register",
    {
        nickname:nickname,
        email:email,
        password:password,
        
    });
    return response.data;
}



/** 로그인 api 요청 */
export async function checkRegisterReq(email,password){

    const response = await axios.post(baseUrl+"/api/account/auth",
    {
        email:email,
        password:password,
       
    });

    return response.data;
  
}


/**토큰검사 */
export async function checkToken(token){

    const response = await axios.post(baseUrl+"/api/account/valid",
    {
        token:token
       
    });

    return response.data;
  
}

