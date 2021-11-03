import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {

    headers: {
        'content-type': 'application/json;multipart/form-data',
    }
    
}

const uploadImage = (imageFile: any, standId: number, challengeNumber: number) => {
    // if (imageFile.files && imageFile.files[0]) {
    //     console.log(imageFile.files[0]);

    console.log(imageFile, standId, challengeNumber);

        const formData = new FormData();

        formData.append('standId', standId.toString());
        formData.append('challengeNumber', challengeNumber.toString());
        formData.append('challengeImage', imageFile);
        console.log('Aqui esta el form data',formData);


        axios.post('/api/uploadChallenge', formData, config );

    // }
}

export { uploadImage };