import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { fileURLToPath } from "url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log("File uploaded successfully URL:",response.url);

    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error in file upload :", error);
    // delete file form server
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const urlParts = imageUrl.split("/");
    const publicIdWithExtension = urlParts.slice(7).join("/"); // skip the domain parts
    const publicId = publicIdWithExtension.replace(/\.[^/.]+$/, ""); // remove extension

    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return null;
  }
};

export { uploadOnCloudinary,deleteFromCloudinary };
