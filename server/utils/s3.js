
import {
    DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { configDotenv } from "dotenv";
import {v4 as uuidv4} from 'uuid';
configDotenv();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


export const uploadToS3  = async (file) => {
    const key = `${uuidv4()}-${file.originalname}`;
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };
    try {
        const command = new PutObjectCommand(params);
        await s3Client.send(command);
        return {key, url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`};
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw new Error("Failed to upload file to S3");
    }
}






export const deleteFromS3 = async (key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };
    try {
        const command = new DeleteObjectCommand(params);
        await s3Client.send(command);
        console.log(`File deleted successfully from S3: ${key}`);
    } catch (error) {
        console.error("Error deleting file from S3:", error);
        throw new Error("Failed to delete file from S3");
    }
}




