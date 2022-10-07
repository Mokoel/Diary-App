import axios from "axios";
import { Buffer } from "buffer";

/* 각각 등록하는 종류에 따라 데이터 추가해주기 */
export async function imgStorageRegi(fileURI, fileData) {
console.log(fileURI)
    const fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1);
    let baseUrl = "http://192.168.4.25:8080"
    console.log(fileName);

    try {

        const storageURI = `${baseUrl}/api/diary/${fileName}`;

        const uploadRes = await axios({
            url: storageURI,
            headers: {
                "Content-type": "image/jpeg"
            },
            data: Buffer.from(fileData, "base64"),
            method: "post"
        });



        const Item = { image: uploadRes.data.path/* 마찬가지로 위에서 받아온 데이터 보내주기 */ };
        const realDB = `${baseUrl}/api/diary/create`;
        console.log(Item);

        const createRes = await axios.post(realDB, Item);
        console.log(createRes);

        return createRes.data;
        
    } catch (e) {

        console.log(e.message);
    }
}


//export async function () {