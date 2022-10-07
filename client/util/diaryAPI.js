import axios from "axios";
import { Buffer } from "buffer";

/** 이미지등록 API 함수*/
let baseUrl = "http://192.168.4.25:8080"

export async function imgStorageRegi(fileURI, fileData) {
console.log(fileURI)

    const fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1);
    console.log(fileName);


    try {

        const storageURI = `${baseUrl}/api/diary/img/${fileName}`;


        const uploadRes = await axios({
            url: storageURI,
            headers: {
                "Content-type": "image/jpeg"
            },
            data: Buffer.from(fileData, "base64"),
            method: "post"
        });


        /**이미지 출력이 가능한 이미지url */
        const Item = { image: uploadRes.data.path };
  
    //console.log(Item,"<===Item")
    //console.log(uploadRes,"<===uploadRes")

        return uploadRes.data;

    } catch (e) {
        console.log(e.message);
    }

};

/** 리스트 목록 요청 */
export async function listViewReq(email){
    const response = await axios.post("http://192.168.4.93:8080/api/diary/find",
    {
        email:email,
    });
    return response.data
    //console.log(response.data)
}



/** 글등록 API 함수*/
export async function createDataRegi(email, content, nickname, image, emoji, chooseDate, createdAt, tag) {

       const uploadData = await axios.post(baseUrl+"/api/diary/create",{email: email,content: content, nickname: nickname, image: image, emoji: emoji,chooseDate: chooseDate,createdAt: createdAt,tag: tag})
       return uploadData.data;
}




