import { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
    const {content} = req.body;
    const userId = req.user?._id;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }
    const newTweet = await Tweet.create({content, owner:userId })
    
    res.status(201).json(new ApiResponse(201,newTweet,"Tweet created successfully"))
})

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    // Check if user exists
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
        throw new ApiError(404, "User not found");
    }

    // Fetch all tweets from the user
    const userTweets = await Tweet.find({ owner: userId })
        .sort({ createdAt: -1 })  // latest tweets first
        .select("-__v");       
    
    res.status(200).json(
        new ApiResponse(200, userTweets, "User tweets fetched successfully")
    );
});

const updateTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;
    const {content} = req.body;
    
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }

    const userId = req.user?._id

    // Update tweet (also ensures only tweet owner can update their tweet)
    const updatedTweet = await Tweet.findByIdAndUpdate(
        { _id: tweetId, owner: userId },
        { content},
        { new: true }
    )
    
    if (!updatedTweet) {
        throw new ApiError(404, "Tweet not found or you don't have permission to update this tweet");
    }

    res.status(200).json(
        new ApiResponse(200,updatedTweet, "Updated tweets successfully")
    );
})

const deleteTweet = asyncHandler(async (req, res) => {
    const {tweetId} = req.params;

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweet ID");
    }  
    const userId = req.user?._id;

    const deletedTweet = await Tweet.findOneAndDelete({_id:tweetId,owner:userId})

    if (!deletedTweet) {
        throw new ApiError(404, "Tweet not found or you're not authorized to delete it");
    }

    res.status(200).json(
        new ApiResponse(200, deletedTweet, "Tweet deleted successfully")
    );
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}