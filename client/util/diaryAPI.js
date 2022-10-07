import axios from "axios";
import { Buffer } from "buffer";

/** 이미지등록 API 함수*/
let baseUrl = "http://192.168.4.25:8080"

export async function imgStorageRegi(fileURI, fileData) {

    const fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1);

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
  
        return uploadRes.data;

    } catch (e) {
        console.log(e.message);
    }

};


/** 리스트 목록 요청 */
export async function listViewReq(email){
    const response = await axios.post(baseUrl+"/api/diary/find",
    {
        email:email,

    });

    return response.data;
   
}


/** 글등록 API */
export async function createDataRegi(email, content, nickname, image, emoji, chooseDate, createdAt, tag) {

       const uploadData = await axios.post(baseUrl+"/api/diary/create",{email: email,content: content, nickname: nickname, image: image, emoji: emoji,chooseDate: chooseDate,createdAt: createdAt,tag: tag});

       return uploadData.data;
}


/**글 수정 API */
export async function createUpdate(_id, email, content, nickname, image, emoji, chooseDate, createdAt, tag){

    const uploadData = await axios.post(baseUrl+"/api/diary/update",{email: email,content: content, nickname: nickname, image: image, emoji: emoji,chooseDate: chooseDate,createdAt: createdAt,tag: tag});

    return uploadData.data;
}


/**글 삭제 API */
export async function contentDelete(_id){
    const contentDelete = await axios.post(baseUrl+"/api/diary/update",{_id:_id});

    return contentDelete.data;
}


/**태그검색 API */
export async function tagFind(tag){
    const findTagRes = await axios.post(baseUrl+"/api/diary/tagFind",{tag:tag,email:email});

    return findTagRes.data;
}