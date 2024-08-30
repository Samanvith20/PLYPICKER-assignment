import { v2 as cloudinary } from "cloudinary";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

export const uploadToCloudinary = async (fileBuffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" }, // You can specify options here, like resource_type
            (error, result) => {
                if (error) {
                    console.error("Error uploading to Cloudinary:", error);
                    reject(error);
                } else {
                    console.log("Upload successful:", result);
                    resolve(result);
                }
            }
        );
        
        // Send the buffer to the upload stream
        uploadStream.end(fileBuffer);
    });
};
