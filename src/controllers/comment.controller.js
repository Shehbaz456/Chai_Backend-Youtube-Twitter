import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { User } from "../models/user.model.js";

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const { videoId } = req.params;
    const { page = 1, limit = 10 } = req.query;
});

const addComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { videoId } = req.params;
    const userId = req.user?._id;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid video ID");
    }

    if (!content?.trim() || !videoId) {
        throw new ApiError(400, "Comment content and video ID are required");
    }

    // Validate video existence
    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(404, "Video not found");
    }
    const newComment = await Comment.create({
        content,
        video: video._id,
        owner: userId,
    });
    res.status(201).json(
        new ApiResponse(201, newComment, "Comment added successfully")
    );
});

const updateComment = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { commentId } = req.params;

    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    if (!content?.trim()) {
        throw new ApiError(400, "Comment content is required");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Authorization check
    if (String(comment.owner) !== String(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to update this comment"
        );
    }

    // Update content
    comment.content = content.trim();
    const updatedComment = await comment.save();

    res.status(200).json(
        new ApiResponse(200, updatedComment, "Comment updated successfully")
    );
});

const deleteComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user._id;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid comment ID");
    }

    const comment = await Comment.findById(commentId);
    if (!comment) {
        throw new ApiError(404, "Comment not found");
    }

    // Authorization: only the owner can delete their comment
    if (String(comment.owner) !== String(userId)) {
        throw new ApiError(
            403,
            "You are not authorized to delete this comment"
        );
    }

    await Comment.findByIdAndDelete(commentId);
    res.status(200).json(
        new ApiResponse(200, null, "Comment deleted successfully")
    );
});

export { getVideoComments, addComment, updateComment, deleteComment };
