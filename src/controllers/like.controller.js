import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const {videoId} = req.params
    const userId = req.user._id;

    if (!isValidObjectId(userId)|| !isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid userId or videoId");
    }
    // Check if a like already exists
    const existingLike = await Like.findOne({
        video: videoId,
        likedBy: userId
    });

    if (existingLike) {
        // Unlike: remove existing like
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, {}, "Video unliked successfully"));
    } else {
        // Like: create a new like
        const newLike = await Like.create({
            video: videoId,
            likedBy: userId
        });
        return res.status(201).json(new ApiResponse(201, newLike, "Video liked successfully"));
    }

})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(userId) || !isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid user ID or comment ID");
    }

    // Check if a like already exists for this comment
    const existingLike = await Like.findOne({
        comment: commentId,
        likedBy: userId
    });

    if (existingLike) {
        // Unlike: remove existing like
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, {}, "Comment unliked successfully"));
    } else {
        // Like: create a new like
        const newLike = await Like.create({
            comment: commentId,
            likedBy: userId
        });
        return res.status(201).json(new ApiResponse(201, newLike, "Comment liked successfully"));
    }
});


const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(userId) || !isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid user ID or tweet ID");
    }

    // Check if a like already exists for this tweet
    const existingLike = await Like.findOne({
        tweet: tweetId,
        likedBy: userId
    });

    if (existingLike) {
        // Unlike: remove existing like
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, {}, "Tweet unliked successfully"));
    } else {
        // Like: create a new like
        const newLike = await Like.create({
            tweet: tweetId,
            likedBy: userId
        });
        return res.status(201).json(new ApiResponse(201, newLike, "Tweet liked successfully"));
    }
});


const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const likedVideos = await Like.find({
        likedBy:userId,
        video: { $exists: true }
    }).populate("video");

    return res.status(200).json(
        new ApiResponse(200, likedVideos, "Fetched liked videos successfully")
    );
})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos
}