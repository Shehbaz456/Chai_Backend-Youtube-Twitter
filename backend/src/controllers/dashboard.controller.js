import mongoose from "mongoose"
const { ObjectId } = mongoose.Types;
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

    const userId = req.user._id;

    const [totalVideos, totalLikes, totalSubscribers, totalViewsResult] = await Promise.all([
        Video.countDocuments({ owner: userId }),
        Like.countDocuments({ likedBy: userId }),
        Subscription.countDocuments({ channel: userId }),
        Video.aggregate([
            { $match: { owner: new ObjectId(userId) } },
            { $group: { _id: null, totalViews: { $sum: "$views" } } }
        ])
    ]);

    const totalViews = totalViewsResult[0]?.totalViews || 0;
     
    return res.status(200).json(
        new ApiResponse(200, {
            totalVideos,
            totalLikes,
            totalSubscribers,
            totalViews
        }, "Channel stats fetched successfully")
    );

})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const userId = req.user._id;

    const videos = await Video.find({ owner: userId })
        .sort({ createdAt: -1 }); // newest first

    if (!videos || videos.length === 0) {
        throw new ApiError(404, "No videos found for this channel");
    }

    return res.status(200).json(new ApiResponse(200, videos, "Videos fetched successfully"));
});

export {
    getChannelStats, 
    getChannelVideos
}