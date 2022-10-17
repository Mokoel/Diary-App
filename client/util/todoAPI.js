import axios from "axios";

/** 이미지등록 API 함수*/

let baseUrl = "http://192.168.4.93:8080"


/**투두등록 */
export async function TodoCreateReq(email, 
todoContent, nickname, date, chk ){
    const response = await axios.post(baseUrl+"/api/todo/create",
    {
        email:email,
        todoContent:todoContent,
        nickname:nickname,
        date:date,
        chk: chk

    });

    return response.data;
   
}


/** 투두 find */
export async function TodoFindReq(email){
    const response = await axios.post(baseUrl+"/api/todo/find",
    {
        email:email,
    });

    return response.data;
   
}


/**날짜별 find */
export async function TodoDateReq(email,date){
    const response = await axios.post(baseUrl+"/api/todo/date",
    {
        email: email,
        date: date
    });

    return response.data;
   
}


/**삭제 */
export async function TodoDelReq(_id){
    const response = await axios.post(baseUrl+"/api/todo/delete",
    {
     _id:_id
    });

    return response.data;
   
}
