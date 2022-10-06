import axios from "axios";
import {Buffer} from "buffer";


export async function imgStorageRegi(fileURI, fileData /* 각각 등록하는 종류에 따라 데이터 추가해주기 */) {
    console.log(fileData.slice(0,10))
    const fileName = fileURI.substring(fileURI.lastIndexOf("/")+ 1);
    let baseUrl = "http://192.168.4.25:8080"
    console.log(fileName);

    try{
        const storageURI = `${baseUrl/*dog, memories 등등*/}/api/diary/${fileName}`;

        const uploadRes = await axios({
            url: storageURI,
            headers: {
                "Content-type": "image/jpeg"
            },
            data: Buffer.from(fileData, "base64"),
            method: "post"
        });
        
        

        const Item = {image: uploadRes.data.path/* 마찬가지로 위에서 받아온 데이터 보내주기 */};
        const realDB = `${baseUrl}/api/diary/create`; 
        
        const createRes = await axios.post(realDB, Item);
        
        return createRes.data;

    } catch (e) {

        console.log(e.message);
    }
};