import { isValidObjectId } from "mongoose";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    deleteFromCloudinary,
    uploadOnCloudinary,
} from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
    //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    const userId = req.user?._id;
    const user = await User.findById(userId);
    if (!user) throw new ApiError(400, "User not found");

    //Get Local path
    const videoLocalpath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalpath = req.files?.thumbnail?.[0]?.path;

    if (!videoLocalpath) throw new ApiError(400, "Video file is required");
    if (!thumbnailLocalpath)
        throw new ApiError(400, "Thumbnail image is required");

    //upload video on cloudnary
    const videoUpload = await uploadOnCloudinary(videoLocalpath);
    const thumbnailUpload = await uploadOnCloudinary(thumbnailLocalpath);

    if (!videoUpload?.url || !videoUpload?.duration) {
        throw new ApiError(500, "Failed to upload video or retrieve duration.");
    }
    if (!thumbnailUpload?.url) {
        throw new ApiError(500, "Failed to upload thumbnail.");
    }
    const durationInSeconds = parseFloat(videoUpload.duration);
    if (isNaN(durationInSeconds))
        throw new ApiError(500, "Invalid video duration");

    const newVideo = await Video.create({
        title,
        description,
        videoFile: videoUpload.url,
        thumbnail: thumbnailUpload.url,
        duration: durationInSeconds,
        owner: user._id,
    });

    res.status(201).json(
        new ApiResponse(201, newVideo, "Video uploaded successfully")
    );
});

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    // Validate videoId
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }
    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    // Increment view count
    video.views += 1;
    await video.save();

    await video.populate("owner", "username email");

    res.status(200).json(
        new ApiResponse(200, video, "Video fetched successfully")
    );
});

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Remove from Cloudinary
    try {
        await deleteFromCloudinary(video.videoFile);
        await deleteFromCloudinary(video.thumbnail);
        console.log("Deleted from Cloudinary");
    } catch (cloudErr) {
        console.error("Cloudinary deletion failed", cloudErr);
    }

    // Delete from DB
    await Video.findByIdAndDelete(videoId);

    res.status(200).json(
        new ApiResponse(200, null, "Video Deleted successfully")
    );
});

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};
