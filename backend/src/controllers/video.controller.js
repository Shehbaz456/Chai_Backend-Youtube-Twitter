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


//TODO: get all videos based on query, sort, pagination
const getAllVideos = asyncHandler(async (req, res) => {
    const {
        page = 1,
        limit = 5,
        query = "",
        sortBy = "createdAt",
        sortType = "desc",
        userId,
    } = req.query;

    // Check if user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }


    const filters = {
        isPublished: true,
        title: { $regex: query, $options: "i" }, // case-insensitive search
    };

    if (userId && isValidObjectId(userId)) {
        filters.owner = userId;
    }


    const sortOptions = { [sortBy]: sortType === "asc" ? 1 : -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [videos, totalVideos] = await Promise.all([
        Video.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("owner", "username fullName avatar"),
        Video.countDocuments(filters)
    ]);

    const totalPages = Math.ceil(totalVideos / limit);

    return res.status(200).json(
        new ApiResponse(200, {
            videos,
            page: parseInt(page),
            totalPages,
            totalVideos,
        }, "Videos fetched successfully")
    );
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
    const { title, description } = req.body;

    // Validate videoId
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    // Check user exists
    const user = await User.findById(req.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Find video
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    // Check authorization
    if (String(video.owner) !== String(req.user._id)) {
        throw new ApiError(403, "You are not authorized to update this video");
    }

    // Prepare file paths
    const videoLocalPath = req.files?.videoFile?.[0]?.path;
    const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;

    let updatedThumbnailUrl = video.thumbnail;
    let updatedVideoUrl = video.videoFile;

    // Update thumbnail if new one is provided
    if (thumbnailLocalPath) {
        try {
            await deleteFromCloudinary(video.thumbnail);
            const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
            updatedThumbnailUrl = uploadedThumbnail.url;
        } catch (error) {
            console.error("Error updating thumbnail:", error);
            throw new ApiError(500, "Failed to update thumbnail");
        }
    }


    let durationInSeconds;
    // Update video if new one is provided
    if (videoLocalPath) {
        try {
            await deleteFromCloudinary(video.videoFile);
            const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
            updatedVideoUrl = uploadedVideo.url;
            durationInSeconds = parseFloat(uploadedVideo.duration);
            if (isNaN(durationInSeconds))
                throw new ApiError(500, "Invalid video duration");
        } catch (error) {
            console.error("Error updating video:", error);
            throw new ApiError(500, "Failed to update video file");
        }
    }

    // Prepare update payload
    const updatePayload = {
        title: title || video.title,
        description: description || video.description,
        thumbnail: updatedThumbnailUrl,
        videoFile: updatedVideoUrl,
        duration: video.duration, // default if not changed
    };

    // Only override duration if new video was uploaded
    if (durationInSeconds !== undefined) {
        updatePayload.duration = durationInSeconds;
    }

    // Update video document
    const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { $set: updatePayload },
        { new: true }
    );

    if (!updatedVideo) {
        throw new ApiError(500, "Failed to update video");
    }

    res.status(200).json(
        new ApiResponse(200, updatedVideo, "Video updated successfully")
    );
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
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    const video = await Video.findById(videoId);

    if (!video) {
        throw new ApiError(404, "Video not found");
    }

    video.isPublished = !video.isPublished; // toggle the boolean value
    await video.save();

    res.status(200).json(
        new ApiResponse(200, video, `Video is now ${video.isPublished ? "published" : "unpublished"}`)
    ); 
});

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus,
};
