import S3 from "aws-sdk/clients/s3";
import fs from "fs";

const bucketName = process.env.AWS_BUCKET_NAME || '';
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;



const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
});

const uploadFile = (file: any) => {

}

const getFileStream = (fileKey: string) => {
    const downloadParams: S3.GetObjectRequest = {
        Key: fileKey,
        Bucket: bucketName,
        

    }
    try {
        return s3.getObject(downloadParams).createReadStream();

    } catch (err) {
        return undefined;
    }
}



const uploadChallengeToS3 = (file: any, userId: string, stand: string, challengeNumber: string) => {

    console.log('ENV',process.env);

    if (!bucketName) {
        return Promise.reject({error: 'no existe bucket name'});
    }
    console.log('Subiendo imagen a bucket', bucketName);

    const fileStream = fs.createReadStream(file.path);


    const uploadParams: S3.PutObjectRequest = {
        Bucket: bucketName,
        Body: fileStream,
        Key: stand+'/'+challengeNumber+'/'+userId+'/'+file.filename,
        
    }

    const options: S3.ManagedUpload.ManagedUploadOptions = {

    };

    return s3.upload(uploadParams).promise();
}

export {
    uploadChallengeToS3,
    getFileStream
};