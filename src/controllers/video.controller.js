import { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js";
import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body

    const userId = req.user?._id
    const user = await User.findById(userId);
    if(!user) throw new ApiError(400, "User not found");
    
    //Get Local path
    const videoLocalpath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalpath = req.files?.thumbnail?.[0]?.path;

    console.log(videoLocalpath);
    console.log(req.files?.videoFile[0]);
    console.log(req.files);
    if (!videoLocalpath) throw new ApiError(400, "Video file is required");
    if (!thumbnailLocalpath) throw new ApiError(400, "Thumbnail image is required");

  
    //upload video on cloudnary
    const videoUpload = await uploadOnCloudinary(videoLocalpath);
    const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalpath);

    console.log("video Upload",videoUpload);
    console.log("thumbnail upload",thumbnailUpload);

    if (!videoUpload?.url || !videoUpload?.duration) {
        throw new ApiError(500, "Failed to upload video or retrieve duration.");
    }
    if (!thumbnailUpload?.url) {
        throw new ApiError(500, "Failed to upload thumbnail.");
    }
    const durationInSeconds = parseFloat(videoUpload.duration);
    if (isNaN(durationInSeconds)) throw new ApiError(500, "Invalid video duration");

    const newVideo = await Video.create({
        title,
        description,
        videoFile: videoUpload.url,
        thumbnail: thumbnailUpload.url,
        duration: durationInSeconds,
        owner: user._id
    });

    res.status(201).json(new ApiResponse(201, newVideo, "Video uploaded successfully"));
})


const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}