import cloudinary from "../config/cloudinaryConfig.js";
import {Readable } from "stream";
import { v4 as uuid } from 'uuid';
export const uploadToCloudinary = async (filebuffer, folder='ecommerce')=>{
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            folder, public_id: uuid()
        }, (err, result) => {
            if (err) {
             return reject(err);
            } 
                resolve(result);
           
        });
        const readableStream = Readable.from(filebuffer);
        readableStream.pipe(stream);
    });
};