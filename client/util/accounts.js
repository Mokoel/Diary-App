import axios from "axios";

//const idToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxZTZjMGM2YjRlMzA5NTI0N2MwNjgwMDAwZTFiNDMxODIzODZkNTAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vd2l0aC0xZDdkYyIsImF1ZCI6IndpdGgtMWQ3ZGMiLCJhdXRoX3RpbWUiOjE2NjM5MDUyMTYsInVzZXJfaWQiOiJ0ZnRlOXhncjdmZ3NqT0pTSmlJOTZTYTNKNUYzIiwic3ViIjoidGZ0ZTl4Z3I3Zmdzak9KU0ppSTk2U2EzSjVGMyIsImlhdCI6MTY2MzkwNTIxNiwiZXhwIjoxNjYzOTA4ODE2LCJlbWFpbCI6InRlc3QxM0BuYXZlci5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdDEzQG5hdmVyLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Ehkq-sSip-t7BIy2T8donrdqsLGqVWb0p7xhXxRgZe12jzW1UUb-3lkZ0FCxZt2OVxcUZOvuYCRVmu_CvsuM01RrCeGbAsZQh35-EbFVcbBgD13lR4j9s_K0wWy1TS31WXR4yB_xqre8m0r4DlW7nD63BmH9LJtG3aaMrBePc8--xUB5w0pMcM7i1VlYdgIhCV_i70vp0zZvN_kmLQHE6i-TqMWz5Sx9DYyI2pr0L_IYNTzKo-0__r_jk8d1rxpOvDzHjOnzbspeUhDt3ztFczVmH2ZxhlkrSOAd7_ixhWkl0nr6EBY6o6WDjtZnGrT76g2xaLoKEP6C9DcigDZF3g"
/** 회원가입 api요청*/
export async function sendRegisterReq(nickname,email,password){
    const response = await axios.post("http://192.168.4.93:8080/api/account/register",
    {
        nickname:nickname,
        email:email,
        password:password,
        
    });
    return response.data
    //console.log(response.data)
}

/** 로그인 api 요청 */
export async function checkRegisterReq(email,password){
    const response = await axios.post("http://192.168.4.93:8080/api/account/auth",
    {
        email:email,
        password:password,
       
    });
    return response.data
    //console.log(response.data)
}

