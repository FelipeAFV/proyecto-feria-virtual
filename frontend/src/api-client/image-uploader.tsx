import axios, { AxiosRequestConfig } from "axios";
import swal from 'sweetalert';

const config: AxiosRequestConfig = {

    headers: {
        'content-type': 'application/json;multipart/form-data',
    }
    
}

const uploadImage = (imageFile: any, standId: number, challengeNumber: number) => {
    // if (imageFile.files && imageFile.files[0]) {
    //     console.log(imageFile.files[0]);

    console.log('Subiendo desafio stand ', standId);

    console.log(imageFile, standId, challengeNumber);

        const formData = new FormData();

        formData.append('standId', standId.toString());
        formData.append('challengeNumber', challengeNumber.toString());
        formData.append('challengeImage', imageFile);
        console.log('Aqui esta el form data',formData);
        swal({
            title:"Se ha subido con éxito",
            icon: "success",
            timer: 2000
        });

        axios.post('/api/uploadChallenge', formData, config );

    // }
}

export { uploadImage };